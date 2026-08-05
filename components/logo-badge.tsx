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
}: {
  name: string;
  image?: string;
  className?: string;
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
        "flex h-12 w-12 shrink-0 items-center justify-center rounded-[2px] border-2 border-foreground/20",
        image ? "bg-white p-1.5" : "bg-secondary",
        className
      )}
      aria-hidden
    >
      {image ? (
        <Image
          src={image}
          alt=""
          width={40}
          height={40}
          sizes="48px"
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
