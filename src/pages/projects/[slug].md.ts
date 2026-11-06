import type { APIRoute } from "astro";
import { getProjects, projectMarkdown, text } from "../../lib/md";

export async function getStaticPaths() {
  return (await getProjects()).map((p) => ({ params: { slug: p.id }, props: { p } }));
}
export const GET: APIRoute = ({ props }) => text(projectMarkdown(props.p), "text/markdown");
