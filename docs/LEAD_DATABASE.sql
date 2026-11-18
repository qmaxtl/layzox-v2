-- Run using an authorised database administrator. Do not expose service-role keys.
create table if not exists public.automation_leads (
 id uuid primary key, created_at timestamptz not null default now(),
 payload jsonb not null, notification_status text not null default 'pending'
);
create table if not exists public.automation_rate_limits (
 bucket text primary key, window_start timestamptz not null, requests integer not null
);
alter table public.automation_leads enable row level security;
alter table public.automation_rate_limits enable row level security;
revoke all on public.automation_leads, public.automation_rate_limits from anon, authenticated;
create or replace function public.submit_automation_lead(p_bucket text,p_request_id uuid,p_payload jsonb)
returns jsonb language plpgsql security definer set search_path=public as $$
declare count_now integer;
begin
 insert into automation_rate_limits(bucket,window_start,requests) values(p_bucket,now(),1)
 on conflict(bucket) do update set
 requests=case when automation_rate_limits.window_start < now()-interval '1 hour' then 1 else automation_rate_limits.requests+1 end,
 window_start=case when automation_rate_limits.window_start < now()-interval '1 hour' then now() else automation_rate_limits.window_start end
 returning requests into count_now;
 if count_now > 5 then return jsonb_build_object('limited',true); end if;
 insert into automation_leads(id,payload) values(p_request_id,p_payload);
 return jsonb_build_object('accepted',true);
end $$;
revoke all on function public.submit_automation_lead(text,uuid,jsonb) from public,anon,authenticated;
grant execute on function public.submit_automation_lead(text,uuid,jsonb) to service_role;
-- Schedule deletion of old rate-limit buckets after 48h. Lead retention requires owner approval.
-- notification_status is an outbox marker. Configure a server-side worker to deliver
-- notifications and mark delivered only after provider acknowledgement. Do not send
-- real notifications before the owner authorises recipient and integration.

alter table public.automation_leads add column if not exists notification_claimed_at timestamptz;
create or replace function public.claim_automation_notifications()
returns table(id uuid) language sql security definer set search_path=public as $$
 with candidates as (
  select l.id from automation_leads l
  where l.notification_status='pending'
     or (l.notification_status='processing' and l.notification_claimed_at<now()-interval '10 minutes')
  order by l.created_at limit 5 for update skip locked
 )
 update automation_leads l set notification_status='processing',notification_claimed_at=now()
 from candidates c where l.id=c.id returning l.id;
$$;
revoke all on function public.claim_automation_notifications() from public,anon,authenticated;
grant execute on function public.claim_automation_notifications() to service_role;
grant select, update on public.automation_leads to service_role;
