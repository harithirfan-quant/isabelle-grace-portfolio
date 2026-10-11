import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Logo tile: renders the real logo when `image` is provided, otherwise a
 * monogram placeholder from the name. Drop real logos in /public/logos/ and
 * pass the path to get the tile.
 */
export function LogoBadge({
  name,
  image,
  className,
  variant = "square",
}: {
  name: string;
  image?: string;
  className?: string;
  /**
   * "wide" gives wordmark logos room to stay legible. A 4:1 or 6:1 wordmark
   * crushed into a 48px square is unreadable; the wide chip is 92px.
   */
  variant?: "square" | "wide";
}) {
  const initials = name
    .replace(/\(.*?\)/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-[2px] border-2 border-foreground/20",
        variant === "wide" ? "h-[72px] w-[132px]" : "h-12 w-12",
        image ? "bg-white p-1.5" : "bg-secondary",
        className
      )}
      aria-hidden
    >
      {image ? (
        <Image
          src={image}
          alt=""
          width={variant === "wide" ? 264 : 96}
          height={96}
          sizes={variant === "wide" ? "132px" : "48px"}
          className="h-full w-full object-contain"
        />
      ) : (
        <span className="font-mono text-sm font-bold text-foreground/70">
          {initials}
        </span>
      )}
    </div>
  );
}
