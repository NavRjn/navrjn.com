import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { profile } from "../data/profile";
import { getPosts } from "../lib/md";

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: `${profile.name} — Writing`,
    description: "Engineering notes on real-time systems, observability and testing.",
    site: context.site!,
    items: posts.map((p) => ({ title: p.data.title, description: p.data.summary, pubDate: p.data.date, link: `/writing/${p.id}` })),
  });
}
