import { getCollection } from "astro:content";
import { profile } from "../data/profile";

const SITE = profile.site;

/** Convert an MDX body to plain markdown: drop imports/comments, turn <Figure> into images. */
export function mdxToMarkdown(body: string): string {
  return body
    .replace(/^import .*$/gm, "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/<Figure\s+src="([^"]+)"\s+alt="([^"]*)"(?:\s+caption="([^"]*)")?\s*\/>/g, (_, src, alt, cap) =>
      `![${alt}](${SITE}${src})${cap ? `\n*${cap}*` : ""}`
    )
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function getProjects() {
  return (await getCollection("projects"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => a.data.order - b.data.order);
}

export async function getPosts() {
  return (await getCollection("writing"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function profileMarkdown(): string {
  const p = profile;
  const lines = [
    `# ${p.name}`,
    "",
    `${p.title} in ${p.location}. Also known as: ${p.aliases.join(", ")}.`,
    "",
    p.summary,
    "",
    `**Status:** ${p.availability}. ${p.lookingFor}`,
    "",
    `**Contact:** ${p.email} · [GitHub](${p.links.github}) · [LinkedIn](${p.links.linkedin})`,
    "",
    "## Experience",
    "",
  ];
  for (const e of p.experience) {
    lines.push(`### ${e.title}, ${e.org} (${e.period})`, "", e.summary, "");
    for (const s of e.steps) lines.push(`- ${s.period}: ${s.text}`);
    for (const b of e.bullets) lines.push(`- ${b}`);
    lines.push("");
  }
  lines.push("## Education", "");
  for (const e of p.education) lines.push(`### ${e.title}, ${e.org} (${e.period})`, "", e.summary, "");
  lines.push("## Skills", "");
  for (const s of p.skills) lines.push(`- **${s.group}:** ${s.items.join(", ")}`);
  lines.push("", "## How I work", "", p.workingStyle, "", "## Recognition and press", "");
  for (const a of p.awards) lines.push(`- ${a}`);
  for (const x of p.press) lines.push(`- [${x.outlet}: ${x.title}](${x.url})`);
  return lines.join("\n") + "\n";
}

export function projectMarkdown(p: Awaited<ReturnType<typeof getProjects>>[number]): string {
  const d = p.data;
  const head = [
    `# ${d.title}`,
    "",
    d.summary,
    "",
    `- Role: ${d.role}`,
    `- Period: ${d.period}`,
    d.stack.length ? `- Stack: ${d.stack.join(", ")}` : "",
    d.metric ? `- Outcome: ${d.metric.value} ${d.metric.label}` : "",
    d.links.repo ? `- Repository: ${d.links.repo}` : "",
    `- Canonical: ${SITE}/projects/${p.id}`,
    "",
  ].filter((l, i, a) => l !== "" || a[i - 1] !== "").join("\n");
  return `${head}\n${mdxToMarkdown(p.body ?? "")}\n`;
}

export function postMarkdown(p: Awaited<ReturnType<typeof getPosts>>[number]): string {
  const d = p.data;
  return `# ${d.title}\n\n${d.summary}\n\n- Author: ${profile.name}\n- Date: ${d.date.toISOString().slice(0, 10)}\n- Canonical: ${SITE}/writing/${p.id}\n\n${mdxToMarkdown(p.body ?? "")}\n`;
}

export const text = (body: string, type = "text/plain") =>
  new Response(body, { headers: { "Content-Type": `${type}; charset=utf-8` } });
