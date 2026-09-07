"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/app/lib/data";
import { Reveal } from "./Reveal";

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
    <section id="contact" className="border-t border-black/5 px-6 py-28 dark:border-white/5">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-widest text-red-600 dark:text-red-400">
            Contact
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Let&apos;s build something great
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Have a project in mind or just want to say hi? My inbox is always
            open — I try to reply within a day or two.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <form
            noValidate
            onSubmit={handleSubmit}
            className="mx-auto mt-12 max-w-xl space-y-5 text-left"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
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
                className={`w-full rounded-xl border bg-white px-4 py-3 text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:bg-zinc-900 dark:text-white ${
                  errors.name
                    ? "border-red-400 dark:border-red-500/60"
                    : "border-black/10 dark:border-white/10"
                }`}
              />
              {errors.name && (
                <p id="name-error" className="mt-1.5 text-sm text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
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
                className={`w-full rounded-xl border bg-white px-4 py-3 text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:bg-zinc-900 dark:text-white ${
                  errors.email
                    ? "border-red-400 dark:border-red-500/60"
                    : "border-black/10 dark:border-white/10"
                }`}
              />
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-sm text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
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
                className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:bg-zinc-900 dark:text-white ${
                  errors.message
                    ? "border-red-400 dark:border-red-500/60"
                    : "border-black/10 dark:border-white/10"
                }`}
              />
              {errors.message && (
                <p id="message-error" className="mt-1.5 text-sm text-red-500">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition-all hover:scale-[1.02] hover:bg-red-700 hover:shadow-xl hover:shadow-red-500/40 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
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
                <p className="rounded-xl bg-emerald-50 px-4 py-3 text-center text-sm font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                  Thanks for reaching out! I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-700 dark:bg-red-500/10 dark:text-red-400">
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
          <p className="mt-10 text-sm text-zinc-500 dark:text-zinc-400">
            Prefer email? Reach me directly at{" "}
            <a
              href={`mailto:${profile.email}`}
              className="font-medium text-zinc-900 underline underline-offset-4 dark:text-white"
            >
              {profile.email}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
