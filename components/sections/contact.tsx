"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Linkedin,
  Instagram,
  Mail,
  Copy,
  Check,
  MapPin,
  Clock,
  Download,
  Send,
  Loader2,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { contact, personal, resume } from "@/content/portfolio";
import { links, openExternal, openResume } from "@/lib/actions";

function SocialCard({
  icon: Icon,
  title,
  description,
  onClick,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center gap-4 border-2 border-foreground/15 bg-card p-5 text-left transition-all hover:border-foreground hover:shadow-hard"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-foreground/25 bg-secondary text-accent">
        <Icon className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1 font-display text-base font-bold">
          {title}
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </button>
  );
}

export function Contact() {
  const [copied, setCopied] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const copyEmail = async () => {
    await navigator.clipboard.writeText(personal.email);
    setCopied(true);
    toast.success("Email copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    // validation
    const next: Record<string, string> = {};
    if (!data.name?.trim()) next.name = "Name is required";
    if (!data.email?.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      next.email = "Enter a valid email";
    if (!data.subject?.trim()) next.subject = "Subject is required";
    if (!data.message?.trim() || data.message.trim().length < 10)
      next.message = "Message should be at least 10 characters";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed");
      toast.success("Message sent! I'll get back to you soon.");
      form.reset();
    } catch (err) {
      toast.error(
        "Couldn't send via the form. Opening your email app instead…"
      );
      openExternal(
        `${links.mailto}?subject=${encodeURIComponent(
          data.subject || ""
        )}&body=${encodeURIComponent(data.message || "")}`
      );
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full rounded-[2px] border-2 border-foreground/20 bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/30";

  return (
    <section id="contact" className="container scroll-mt-20 py-24">
      <SectionHeading
        index="11"
        eyebrow="Contact"
        title="Open to internships across business, strategy & beyond"
        description={contact.openTo}
      />

      <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-2">
        {/* Left: socials + info */}
        <div className="space-y-4">
          <Reveal>
            <SocialCard
              icon={Linkedin}
              title="Connect on LinkedIn"
              description="Let's build professional connections"
              onClick={() => openExternal(links.linkedin)}
            />
          </Reveal>
          <Reveal delay={0.05}>
            <SocialCard
              icon={Instagram}
              title="Follow on Instagram"
              description="Behind the scenes of my journey"
              onClick={() => openExternal(links.instagram)}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-foreground/25 bg-secondary text-accent">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-base font-bold">Email</p>
                    <p className="truncate font-mono text-xs text-muted-foreground">
                      {personal.email}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="icon" onClick={copyEmail} aria-label="Copy email">
                  {copied ? (
                    <Check className="h-4 w-4 text-accent" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-wrap gap-4 px-1 font-mono text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-accent" />
                {personal.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-accent" />
                {personal.timezone}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            {resume.available && (
              <Button variant="default" className="w-full" onClick={openResume}>
                <Download className="h-4 w-4" />
                Download Latest Resume
              </Button>
            )}
          </Reveal>
        </div>

        {/* Right: form */}
        <Reveal delay={0.1}>
          <Card className="p-6">
            <form onSubmit={onSubmit} noValidate className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block font-mono text-xs font-semibold uppercase tracking-wider">
                    Name
                  </label>
                  <input id="name" name="name" className={inputCls} placeholder="Your name" />
                  {errors.name && (
                    <p className="mt-1 text-xs text-destructive">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block font-mono text-xs font-semibold uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={inputCls}
                    placeholder="you@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-destructive">{errors.email}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="mb-1.5 block font-mono text-xs font-semibold uppercase tracking-wider">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  className={inputCls}
                  placeholder="Internship opportunity / Collaboration"
                />
                {errors.subject && (
                  <p className="mt-1 text-xs text-destructive">{errors.subject}</p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block font-mono text-xs font-semibold uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className={inputCls}
                  placeholder="Tell me about the role or opportunity…"
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-destructive">{errors.message}</p>
                )}
              </div>
              <Button
                type="submit"
                variant="default"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {loading ? "Sending…" : "Send Message"}
              </Button>
            </form>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
