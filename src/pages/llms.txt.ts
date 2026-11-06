import type { APIRoute } from "astro";
import { profile } from "../data/profile";
import { getProjects, getPosts, text } from "../lib/md";

export const GET: APIRoute = async () => {
  const projects = await getProjects();
  const posts = await getPosts();
  const S = profile.site;
  const out = [
    `# ${profile.name}`,
    "",
    `> ${profile.title} in ${profile.location} (also: ${profile.aliases.join(", ")}). Computer vision, autonomous systems (drone navigation), edge ML, LLM document intelligence and physics-informed neural networks. BSc Artificial Intelligence at JKU Linz. ${profile.availability}; ${profile.lookingFor}`,
    "",
    `Contact: ${profile.email}. GitHub: ${profile.links.github}. LinkedIn: ${profile.links.linkedin}.`,
    "",
    "## Profile",
    `- [About](${S}/about.md): experience, education, skills, press`,
    `- [Home](${S}/index.md): summary`,
    `- [Résumé (JSON Resume)](${S}/resume.json): structured CV`,
    `- [Résumé (PDF)](${S}/cv.pdf)`,
    `- [Now](${S}/now): current status`,
    "",
    "## Projects",
    ...projects.map((p) => `- [${p.data.title}](${S}/projects/${p.id}.md): ${p.data.summary}`),
    "",
    "## Writing",
    ...posts.map((p) => `- [${p.data.title}](${S}/writing/${p.id}.md): ${p.data.summary}`),
    "",
    "## Optional",
    `- [Full content in one file](${S}/llms-full.txt)`,
    `- [Sitemap](${S}/sitemap-index.xml)`,
    `- [RSS](${S}/rss.xml)`,
    "",
  ].join("\n");
  return text(out);
};
