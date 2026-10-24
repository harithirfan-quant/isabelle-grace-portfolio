import { NextResponse } from "next/server";
import { projects, site } from "@/content/portfolio";

export const dynamic = "force-dynamic";

/**
 * Can a project's live site be shown inside a desktop window (an iframe)?
 *
 * A browser cannot read another site's headers, so the window asks here.
 * Only URLs from the projects list are checked, by title, so this can never
 * be used to fetch arbitrary addresses.
 *
 * Returns { embeddable: true | false | null }. null means the check itself
 * failed, and the window just tries the iframe.
 */
export async function GET(req: Request) {
  const title = new URL(req.url).searchParams.get("title");
  const project = projects.find((p) => p.title === title && p.url);
  if (!project) {
    return NextResponse.json({ error: "Unknown project." }, { status: 404 });
  }

  let embeddable: boolean | null = null;
  try {
    const res = await fetch(project.url, {
      redirect: "follow",
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    embeddable = allowsFraming(res.headers);
  } catch {
    embeddable = null;
  }

  return NextResponse.json(
    { embeddable },
    {
      headers: {
        // A site's framing rules rarely change; let the CDN keep the answer.
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400",
      },
    },
  );
}

function allowsFraming(headers: Headers): boolean {
  const xfo = headers.get("x-frame-options")?.toLowerCase() ?? "";
  if (xfo.includes("deny") || xfo.includes("sameorigin")) return false;

  const csp = headers.get("content-security-policy") ?? "";
  const directive = csp
    .split(";")
    .map((d) => d.trim())
    .find((d) => d.toLowerCase().startsWith("frame-ancestors"));
  if (!directive) return true;

  const sources = directive.split(/\s+/).slice(1);
  const ours = new URL(site.url).host;
  return sources.some(
    (s) =>
      s === "*" ||
      s.includes(ours) ||
      // a wildcard covering our domain, e.g. *.hietech.my
      (s.includes("*.") && ours.endsWith(s.slice(s.indexOf("*.") + 1))),
  );
}
