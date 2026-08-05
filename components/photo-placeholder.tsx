/**
 * Swiss-style placeholder used wherever a photo does not exist yet.
 * Renders a soft pink block with the person's initials instead of a
 * hardcoded avatar. Swap in a real <Image> once Isabelle sends her photo.
 */
export function PhotoPlaceholder({
  initials = "IG",
  label = "Photo coming soon",
}: {
  initials?: string;
  label?: string;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-accent">
      <span
        aria-hidden
        className="font-display text-8xl font-bold leading-none tracking-tight text-accent-foreground"
      >
        {initials}
        <span className="opacity-60">.</span>
      </span>
      <span className="px-4 text-center font-mono text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-accent-foreground/90">
        {label}
      </span>
    </div>
  );
}
