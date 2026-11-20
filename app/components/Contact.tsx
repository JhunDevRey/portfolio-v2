"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/app/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Please add a short message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }

  return errors;
}

const inputClass = (hasError: boolean) =>
  `w-full rounded-lg border bg-transparent px-4 py-3 text-fg outline-none transition-colors placeholder:text-muted/70 focus:border-fg ${
    hasError ? "border-accent" : "border-line hover:border-muted"
  }`;

const labelClass = "mb-2 block font-mono text-xs text-muted";

export function Contact() {
  const [values, setValues] = useState<FormValues>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange =
    (field: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          subject: `New message from ${values.name} via portfolio site`,
          from_name: values.name,
          name: values.name,
          email: values.email,
          message: values.message,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message ?? "Submission failed");
      }

      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl scroll-mt-16 px-6 py-28">
      <SectionHeading
        eyebrow="Contact"
        title="Hiring, or have a project?"
        description="Send a message and I'll reply within a couple of days."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <dl className="space-y-6">
            <div>
              <dt className="font-mono text-xs text-muted">Email</dt>
              <dd className="mt-2">
                <a href={`mailto:${profile.email}`} className="link-underline text-lg text-fg">
                  {profile.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-muted">Phone</dt>
              <dd className="mt-2 text-lg text-fg">{profile.phone}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-muted">Elsewhere</dt>
              <dd className="mt-2 flex gap-6 text-lg">
                <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="link-underline text-fg">GitHub</a>
                <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline text-fg">LinkedIn</a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={100}>
          <form noValidate onSubmit={handleSubmit} className="space-y-5"
          >
            <div>
              <label
                htmlFor="name"
                className={labelClass}
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={values.name}
                onChange={handleChange("name")}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                placeholder="Your name"
                className={inputClass(Boolean(errors.name))}
              />
              {errors.name && (
                <p id="name-error" className="mt-1.5 text-sm text-accent">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className={labelClass}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={values.email}
                onChange={handleChange("email")}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                placeholder="you@company.com"
                className={inputClass(Boolean(errors.email))}
              />
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-sm text-accent">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className={labelClass}
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={values.message}
                onChange={handleChange("message")}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                placeholder="What are you working on?"
                className={`resize-none ${inputClass(Boolean(errors.message))}`}
              />
              {errors.message && (
                <p id="message-error" className="mt-1.5 text-sm text-accent">
                  {errors.message}
                </p>
              )}
            </div>

            <button type="submit" disabled={status === "submitting"} className="inline-flex items-center justify-center gap-2 rounded-lg bg-fg px-6 py-3 text-sm font-medium text-on-fg transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Sending...
                </>
              ) : (
                "Send message"
              )}
            </button>

            <div aria-live="polite">
              {status === "success" && (
                <p className="rounded-lg border border-line px-4 py-3 text-sm text-fg">
                  Message sent. I&apos;ll reply within a couple of days.
                </p>
              )}
              {status === "error" && (
                <p className="rounded-lg border border-accent px-4 py-3 text-sm text-fg">
                  The message did not send. Email me directly at{" "}
                  <a href={`mailto:${profile.email}`} className="underline underline-offset-2">
                    {profile.email}
                  </a>
                  .
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
