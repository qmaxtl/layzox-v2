import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { leadSchema, type LeadInput } from "./lead-schema";
import { industries } from "./data";
export default function LeadForm() {
  const location = useLocation();
  const kind =
    location.pathname === "/contact"
      ? "contact"
      : location.pathname === "/consultation"
        ? "consultation"
        : "audit";
  const preset = location.state as {
    industry?: string;
    message?: string;
  } | null;
  const [status, setStatus] = useState(""),
    [success, setSuccess] = useState(false);
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      source: kind,
      industry: preset?.industry || industries[0],
      message: preset?.message || "",
      website: "",
    },
  });
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/leads", { method: "HEAD", signal: controller.signal })
      .then(response => { if (!controller.signal.aborted) setUnavailable(response.status === 503); })
      .catch(() => {});
    return () => controller.abort();
  }, []);
  function downloadBrief() {
    const data = getValues();
    const brief = ["LAYZOX enquiry draft", "Prepared locally. Not submitted.", "",
      data.company, data.name, data.email, data.industry, "", data.message].join("\n");
    const url = URL.createObjectURL(new Blob([brief], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "layzox-enquiry.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const pending = useRef<{ body: string; key: string } | null>(null);
  const submit = async (data: LeadInput) => {
    setStatus("");
    try {
      const body = JSON.stringify(data);
      if (pending.current?.body !== body) pending.current = { body, key: crypto.randomUUID() };
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": pending.current.key },
        body,
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok)
        throw new Error(
          result.error ||
            "We could not submit your request. Please try again later.",
        );
      if (result.accepted !== true)
        throw new Error(
          "The service is temporarily unavailable. Your request has not been submitted.",
        );
      setSuccess(true);
    } catch (e) {
      setStatus(
        e instanceof Error ? e.message : "Unable to submit. Please try again.",
      );
    }
  };
  return (
    <div className="page-wrap lead-page">
      <div className="page-heading">
        <span className="eyebrow">
          {kind === "contact" ? "Contact Layzox" : "Free automation audit"}
        </span>
        <h1>
          Let’s make work <br />
          <em>work better.</em>
        </h1>
        <p>
          Tell us what your team repeats every day. We’ll use your enquiry to
          discuss the process, the tools involved and an achievable first step.
        </p>
        <div className="contact-points">
          <p>
            <CheckCircle2 /> Map the process and bottlenecks
          </p>
          <p>
            <CheckCircle2 /> Identify suitable automation opportunities
          </p>
          <p>
            <CheckCircle2 /> Plan implementation and human oversight
          </p>
        </div>
        <p className="privacy-note">
          <ShieldCheck size={19} /> Please don’t include passwords, payment
          details or sensitive customer records.
        </p>
      </div>
      <section className="panel">
        {success ? (
          <div className="success" role="status">
            <CheckCircle2 size={46} />
            <h2>Request received.</h2>
            <p>
              Your enquiry has been saved. The Layzox team can follow up using
              the details you provided.
            </p>
            <Link className="button" to="/lab">
              Explore the automation lab
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(submit)} noValidate>
            <h2>Tell us about your business</h2>
            {unavailable && <p role="status" className="error-banner">Online submission is temporarily unavailable. You can prepare your enquiry below and download a copy.</p>}
            <div className="form-grid">
              {(["name", "email", "company"] as const).map((key) => (
                <label key={key}>
                  {key === "name"
                    ? "Your name"
                    : key === "email"
                      ? "Work email"
                      : "Company"}
                  <input
                    {...register(key)}
                    type={key === "email" ? "email" : "text"}
                    autoComplete={
                      key === "name"
                        ? "name"
                        : key === "email"
                          ? "email"
                          : "organization"
                    }
                    aria-invalid={!!errors[key]}
                    aria-describedby={errors[key] ? `${key}-error` : undefined}
                  />
                  {errors[key] && (
                    <span className="field-error" id={`${key}-error`}>
                      {errors[key]?.message}
                    </span>
                  )}
                </label>
              ))}
              <label>
                Industry
                <select {...register("industry")}>
                  {industries.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              What would you like to automate?
              <textarea
                {...register("message")}
                rows={5}
                maxLength={3000}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                placeholder="Describe a repetitive process, the tools you use, and where your team gets stuck."
              />
              {errors.message && (
                <span id="message-error" className="field-error">
                  {errors.message.message}
                </span>
              )}
            </label>
            <div className="honeypot" aria-hidden="true">
              <label>
                Website
                <input
                  {...register("website")}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>
            <label className="consent">
              <input
                type="checkbox"
                {...register("consent")}
                aria-invalid={!!errors.consent}
              />{" "}
              <span>
                I agree to be contacted about this request and have read the{" "}
                <Link to="/legal/privacy-policy">privacy notice</Link>.
              </span>
            </label>
            {errors.consent && (
              <p className="field-error">{errors.consent.message}</p>
            )}
            {status && (
              <p role="alert" className="error-banner">
                {status}
              </p>
            )}
            <button className="button" disabled={isSubmitting || unavailable} type="submit">
              {isSubmitting
                ? "Submitting…"
                : kind === "contact"
                  ? "Send enquiry"
                  : "Request my free audit"}
              <ArrowRight size={18} />
            </button>
            {(unavailable || status) && <button type="button" className="button secondary" onClick={downloadBrief}>Download my enquiry</button>}
            <p className="form-note">
              No obligation. We’ll assess your needs before proposing a scope.
            </p>
          </form>
        )}
      </section>
    </div>
  );
}
