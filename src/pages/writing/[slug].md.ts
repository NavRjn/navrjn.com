import type { APIRoute } from "astro";
import { getPosts, postMarkdown, text } from "../../lib/md";

export async function getStaticPaths() {
  return (await getPosts()).map((p) => ({ params: { slug: p.id }, props: { p } }));
}
export const GET: APIRoute = ({ props }) => text(postMarkdown(props.p), "text/markdown");
