"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/app/lib/data";
import { Section } from "./Section";

type Values = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Your name, please.";
  if (!values.email.trim()) errors.email = "An email I can reply to.";
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "That email doesn't look right.";
  if (values.message.trim().length < 10) errors.message = "A sentence or two is enough.";
  return errors;
}

const field =
  "mt-1.5 w-full rounded-md border border-line bg-field px-3 py-2 text-[15px] outline-none focus:border-fg";

export function Contact() {
  const [values, setValues] = useState<Values>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const update =
    (key: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      setErrors((err) => ({ ...err, [key]: undefined }));
    };

  async function submit(e: FormEvent) {
    e.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          subject: `Message from ${values.name} via jhundaverey.vercel.app`,
          from_name: values.name,
          name: values.name,
          email: values.email,
          message: values.message,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error();
      setStatus("sent");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("failed");
    }
  }

  return (
    <Section id="contact" title="Contact">
      <p className="leading-7">
        Email is the fastest way to reach me:{" "}
        <a href={`mailto:${profile.email}`} className="underline decoration-line hover:decoration-fg">
          {profile.email}
        </a>
        . The form below lands in the same inbox.
      </p>

      <form noValidate onSubmit={submit} className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm">
            Name
            <input
              type="text"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={update("name")}
              aria-invalid={Boolean(errors.name)}
              className={field}
            />
            {errors.name && <span className="mt-1 block text-muted">{errors.name}</span>}
          </label>
          <label className="block text-sm">
            Email
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={values.email}
              onChange={update("email")}
              aria-invalid={Boolean(errors.email)}
              className={field}
            />
            {errors.email && <span className="mt-1 block text-muted">{errors.email}</span>}
          </label>
        </div>
        <label className="block text-sm">
          Message
          <textarea
            name="message"
            rows={5}
            value={values.message}
            onChange={update("message")}
            aria-invalid={Boolean(errors.message)}
            className={`${field} resize-y`}
          />
          {errors.message && <span className="mt-1 block text-muted">{errors.message}</span>}
        </label>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-md bg-fg px-4 py-2 text-sm font-medium text-bg disabled:opacity-60"
          >
            {status === "sending" ? "Sending" : "Send"}
          </button>
          <p aria-live="polite" className="text-sm text-muted">
            {status === "sent" && "Got it. I'll reply soon."}
            {status === "failed" && (
              <>
                That didn&apos;t go through. Please email me at{" "}
                <a href={`mailto:${profile.email}`} className="underline">
                  {profile.email}
                </a>
                .
              </>
            )}
          </p>
        </div>
      </form>
    </Section>
  );
}
