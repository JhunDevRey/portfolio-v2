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
  `w-full rounded-2xl border bg-white/[0.03] px-4 py-3 text-white outline-none transition-all duration-300 placeholder:text-zinc-600 focus:border-red-500/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-red-500/10 ${
    hasError ? "border-red-500/60" : "border-white/10 hover:border-white/20"
  }`;

const labelClass = "mb-2 block text-sm font-medium text-zinc-300";

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
    <section id="contact" className="relative isolate scroll-mt-24 overflow-hidden px-6 py-28">
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -z-10 h-[28rem] w-[56rem] -translate-x-1/2 translate-y-1/2 rounded-full bg-red-600/15 blur-[140px]"
      />
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading
          align="center"
          eyebrow="Contact"
          title={<>Let&apos;s build something great</>}
          description="Have a project in mind or just want to say hi? My inbox is always open — I try to reply within a day or two."
        />

        <Reveal delay={200}>
          <form
            noValidate
            onSubmit={handleSubmit}
            className="glass mx-auto mt-14 max-w-xl space-y-5 rounded-3xl p-6 text-left sm:p-8"
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
                placeholder="Jane Doe"
                className={inputClass(Boolean(errors.name))}
              />
              {errors.name && (
                <p id="name-error" className="mt-1.5 text-sm text-red-400">
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
                placeholder="jane@example.com"
                className={inputClass(Boolean(errors.email))}
              />
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-sm text-red-400">
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
                placeholder="Tell me a bit about your project..."
                className={`resize-none ${inputClass(Boolean(errors.message))}`}
              />
              {errors.message && (
                <p id="message-error" className="mt-1.5 text-sm text-red-400">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="ease-smooth flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-red-500 to-red-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgb(239_68_68/0.7),inset_0_1px_0_rgb(255_255_255/0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:from-red-400 hover:to-red-600 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
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
                <p className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-center text-sm font-medium text-emerald-300">
                  Thanks for reaching out! I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm font-medium text-red-300">
                  Something went wrong sending your message. Please try emailing me directly at{" "}
                  <a href={`mailto:${profile.email}`} className="underline underline-offset-2">
                    {profile.email}
                  </a>
                  .
                </p>
              )}
            </div>
          </form>
        </Reveal>

        <Reveal delay={250}>
          <p className="mt-10 text-sm text-zinc-500">
            Prefer email? Reach me directly at{" "}
            <a
              href={`mailto:${profile.email}`}
              className="font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-red-400"
            >
              {profile.email}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
