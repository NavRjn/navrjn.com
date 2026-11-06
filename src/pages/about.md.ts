import type { APIRoute } from "astro";
import { profileMarkdown, text } from "../lib/md";

export const GET: APIRoute = () => text(profileMarkdown(), "text/markdown");
