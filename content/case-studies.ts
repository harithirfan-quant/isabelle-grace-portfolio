/**
 * ============================================================================
 *  CASE STUDIES CONTENT
 * ============================================================================
 *  Add new case studies by appending to the `caseStudies` array.
 *  Each case study maps to a project in content/portfolio.ts by slug.
 *
 *  NOTE: The fork originally carried case studies written for a different
 *  person. Those were removed. Isabelle's case studies will live here once
 *  there is a documented project worth writing up (the Personal Branding
 *  session or a Bintulu Port initiative are the natural first candidates).
 *  The Projects section renders correctly with an empty array.
 * ============================================================================
 */

export type CaseStudyMetric = {
  label: string;
  value: string;
  description: string;
};

export type CaseStudySection = {
  title: string;
  content: string[];
};

export type CaseStudy = {
  slug: string;
  projectSlug: string; // matches a project title (used to link back)
  title: string;
  subtitle: string;
  category: string;
  timeline: string;
  role: string;
  tags: string[];
  overview: string;
  challenge: CaseStudySection;
  approach: CaseStudySection;
  metrics: CaseStudyMetric[];
  lessons: string[];
  tools: string[];
  relatedSlugs: string[];
};

export const caseStudies: CaseStudy[] = [];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getRelatedCaseStudies(slug: string): CaseStudy[] {
  const current = getCaseStudy(slug);
  if (!current) return [];
  return current.relatedSlugs
    .map((s) => getCaseStudy(s))
    .filter((cs): cs is CaseStudy => cs !== undefined);
}
