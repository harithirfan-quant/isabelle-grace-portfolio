import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  index,
  className,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  index?: string;
  className?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p className="eyebrow flex items-center gap-3 text-foreground/60">
          {index && <span className="text-accent">{index}</span>}
          <span className="h-px w-8 bg-foreground/40" aria-hidden />
          {eyebrow}
        </p>
      )}
      <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
