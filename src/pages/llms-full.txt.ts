import type { APIRoute } from "astro";
import { getProjects, getPosts, profileMarkdown, projectMarkdown, postMarkdown, text } from "../lib/md";

export const GET: APIRoute = async () => {
  const parts = [profileMarkdown(), "## Projects\n", ...(await getProjects()).map(projectMarkdown), "## Writing\n", ...(await getPosts()).map(postMarkdown)];
  return text(parts.join("\n---\n\n"));
};
