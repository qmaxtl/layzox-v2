import { Link, useParams, useLocation } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { solutions, industries, demos } from "./data";
import { AuditBanner, ButtonLink } from "./Shell";
export function Solutions() {
  const { slug } = useParams();
  const s = solutions.find((x) => x.slug === slug);
  if (slug && !s) return <NotFound />;
  return (
    <div className="page-wrap">
      <div className="page-heading">
        <span className="eyebrow">Implemented for your business</span>
        <h1>
          {s ? (
            s.name
          ) : (
            <>
              Less repetitive work. <br />
              <em>More room to grow.</em>
            </>
          )}
        </h1>
        <p>
          {s
            ? s.description
            : "From the first enquiry to the final report, connect your people, processes and tools with automation designed around the way you work."}
        </p>
      </div>
      {s ? (
        <>
          <section className="detail-grid">
            <div className="panel">
              <s.icon size={38} />
              <h2>Where we can help</h2>
              <ul className="feature-list">
                {s.tasks.map((t) => (
                  <li key={t}>
                    <CheckCircle2 size={20} />
                    {t}
                  </li>
                ))}
              </ul>
              <ButtonLink to="/audit">Discuss this process</ButtonLink>
            </div>
            <div className="panel">
              <h2>Built with oversight</h2>
              <p>
                We start by mapping your current process, the data it uses and
                the people responsible. Then we define the triggers, decision
                rules, approvals and exception paths.
              </p>
              <p>
                Implementation scope depends on your tools, permissions, data
                quality and available APIs. Sensitive or uncertain decisions
                stay with your team.
              </p>
              <Link className="text-link" to="/lab">
                Explore a simulated workflow <ArrowRight size={16} />
              </Link>
            </div>
          </section>
          <section className="panel">
            <h2>From discovery to dependable operations</h2>
            <div className="process-grid">
              {[
                "Discover the process",
                "Design and validate",
                "Implement and test",
                "Monitor and improve",
              ].map((t, i) => (
                <div key={t}>
                  <span className="eyebrow">0{i + 1}</span>
                  <h3>{t}</h3>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <div className="content-grid">
          {solutions.map((x) => (
            <Link
              className="panel content-card"
              to={`/solutions/${x.slug}`}
              key={x.slug}
            >
              <x.icon size={32} />
              <h2>{x.name}</h2>
              <p>{x.description}</p>
              <span className="text-link">
                Explore solution <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      )}
      <AuditBanner />
    </div>
  );
}
export function Industries() {
  return (
    <div className="page-wrap">
      <div className="page-heading">
        <span className="eyebrow">Industry solutions</span>
        <h1>
          Different businesses. <br />
          <em>Shared opportunities.</em>
        </h1>
        <p>
          Explore operational workflows. Each implementation is scoped around
          your team, systems and industry requirements.
        </p>
      </div>
      <div className="content-grid">
        {industries.map((x, i) => (
          <section className="panel content-card" key={x}>
            <span className="eyebrow">0{i + 1}</span>
            <h2>{x}</h2>
            <p>
              {
                [
                  "Order updates, customer enquiries and fulfilment handoffs.",
                  "Enquiry qualification, project onboarding and invoice approvals.",
                  "Administrative scheduling and enquiries, with human review and appropriate data safeguards.",
                  "Admissions enquiries, document collection and student support routing.",
                  "Travel enquiries, itinerary approval and booking coordination.",
                  "Purchase requests, quality records and operations reporting.",
                  "Property enquiries, visit scheduling and agent follow-up.",
                  "Document checks, approval routing and reconciliation exceptions.",
                ][i]
              }
            </p>
            <Link
              className="text-link"
              to="/audit"
              state={{
                industry: x,
                message: `I would like to explore automation for ${x}. `,
              }}
            >
              Discuss your workflow <ArrowRight size={16} />
            </Link>
          </section>
        ))}
      </div>
    </div>
  );
}
export function UseCases() {
  return (
    <div className="page-wrap">
      <div className="page-heading">
        <span className="eyebrow">Use cases</span>
        <h1>
          Small handoffs. <br />
          <em>Big possibilities.</em>
        </h1>
        <p>
          Illustrative scenarios to help you explore. These are not verified
          customer case studies or claims of achieved results.
        </p>
      </div>
      <div className="content-grid">
        {demos.map((d) => (
          <article className="panel" key={d.name}>
            <span className="eyebrow">Illustrative scenario</span>
            <h2>{d.name}</h2>
            <p>{d.sample}</p>
            <ol>
              {d.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <ButtonLink to="/lab">Try the simulation</ButtonLink>
          </article>
        ))}
      </div>
      <section className="panel">
        <h2>Verified case studies</h2>
        <p>
          Customer case studies will be published when outcomes, permissions and
          supporting evidence are available. Until then, explore the demos and
          estimate your own business case.
        </p>
      </section>
    </div>
  );
}
export function About() {
  return (
    <div className="page-wrap">
      <div className="page-heading">
        <span className="eyebrow">About Layzox</span>
        <h1>
          Technology for a <br />
          <em>brighter tomorrow.</em>
        </h1>
        <p>
          Layzox India Private Limited designs and implements business automation systems: practical
          workflows that connect the tools you already use, reduce repeated work
          and keep your team in control.
        </p>
      </div>
      <div className="content-grid">
        {[
          [
            "Built around your process",
            "Start with the work and the people doing it. Identify friction before selecting technology.",
          ],
          [
            "People stay in control",
            "Make approvals, exceptions and accountability part of the design from the beginning.",
          ],
          [
            "Measure what matters",
            "Agree on a baseline, track the change and improve the workflow with evidence.",
          ],
        ].map(([h, p]) => (
          <section className="panel" key={h}>
            <h2>{h}</h2>
            <p>{p}</p>
          </section>
        ))}
      </div>
      <AuditBanner />
    </div>
  );
}
export function Resources() {
  return (
    <div className="page-wrap">
      <div className="page-heading">
        <span className="eyebrow">Practical resources</span>
        <h1>
          Start with clarity. <br />
          <em>Build with confidence.</em>
        </h1>
      </div>
      <div className="content-grid">
        {[
          [
            "Discovery studio",
            "Map repetitive tasks and explore a high-level workflow.",
            "/discovery",
          ],
          [
            "ROI calculator",
            "Model the potential capacity released and estimated payback.",
            "/roi",
          ],
          [
            "Automation lab",
            "Follow sample records through four interactive workflows.",
            "/lab",
          ],
        ].map(([h, p, to]) => (
          <Link className="panel content-card" to={to} key={to}>
            <h2>{h}</h2>
            <p>{p}</p>
            <span className="text-link">
              Explore <ArrowRight size={16} />
            </span>
          </Link>
        ))}
      </div>
      <section className="panel">
        <h2>Before your process audit</h2>
        <ol>
          <li>Pick one repeatable workflow with a clear owner.</li>
          <li>List your current tools, inputs and approval steps.</li>
          <li>Estimate monthly volume and time spent per task.</li>
          <li>
            Identify exceptions and information that requires careful handling.
          </li>
          <li>Decide what a successful pilot should improve.</li>
        </ol>
      </section>
    </div>
  );
}
export function Legal() {
  const privacy = useLocation().pathname.includes("privacy");
  return (
    <div className="page-wrap legal">
      <div className="page-heading">
        <span className="eyebrow">Website information</span>
        <h1>{privacy ? "Privacy notice" : "Website terms"}</h1>
        <p>
          Last updated: 18 November 2026. This notice covers this automation
          website and its enquiry experience.
        </p>
      </div>
      <section className="panel">
        {privacy ? (
          <>
            <h2>Information you choose to share</h2>
            <p>
              The enquiry form asks for your name, work email, company, industry
              and a description of your process. These details are used to
              respond to your request and assess potential services. Do not
              submit sensitive customer records or credentials.
            </p>
            <h2>Interactive tools</h2>
            <p>
              The calculator, discovery studio and demonstrations work with
              browser-side inputs. The enquiry form sends information to the
              server only when you submit it. No advertising trackers are
              included in this version.
            </p>
            <h2>Processing and service providers</h2>
            <p>
              When enquiry processing is enabled, hosting, database and
              notification providers may process the request on behalf of
              Layzox. Submission is not confirmed unless storage succeeds.
            </p>
            <h2>Questions and requests</h2>
            <p>
              Use the contact form for privacy questions or requests concerning
              your enquiry. Include the email address you used to submit your request so we can identify the relevant record.
            </p>
          </>
        ) : (
          <>
            <h2>Information and estimates</h2>
            <p>
              The website describes potential automation services. Examples are
              illustrative. ROI outputs depend on your inputs and do not promise
              financial savings. Demos do not connect to your accounts or send
              messages.
            </p>
            <h2>Service scope</h2>
            <p>
              Implementation work requires a separately agreed scope, pricing,
              responsibilities and acceptance criteria. Submitting an enquiry
              does not create a service agreement.
            </p>
            <h2>Responsible use</h2>
            <p>
              Use the website for legitimate business enquiries. Do not submit
              credentials, confidential customer records or content you are not
              authorised to share.
            </p>
            <h2>Business terms</h2>
            <p>
              Review the contracting parties, deliverables, fees and terms in your written proposal before agreeing to a project.
            </p>
          </>
        )}
        <Link className="text-link" to="/contact">
          Contact Layzox <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
export function NotFound() {
  return (
    <div className="page-wrap">
      <div className="page-heading">
        <span className="eyebrow">404</span>
        <h1>This page isn’t here.</h1>
        <p>Explore the automation solutions or return to the homepage.</p>
        <ButtonLink to="/">Back to home</ButtonLink>
      </div>
    </div>
  );
}
