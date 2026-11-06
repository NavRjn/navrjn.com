import type { APIRoute } from "astro";
import { profile } from "../data/profile";

// JSON Resume schema: https://jsonresume.org/schema
export const GET: APIRoute = () => {
  const p = profile;
  const body = {
    basics: {
      name: p.name,
      label: p.title,
      email: p.email,
      url: p.site,
      summary: p.summary,
      location: { city: "Vienna", countryCode: "AT" },
      profiles: [
        { network: "GitHub", username: p.handle, url: p.links.github },
        { network: "LinkedIn", username: "navrjn", url: p.links.linkedin },
      ],
    },
    work: p.experience.map((e) => ({
      name: e.org,
      position: e.title,
      location: e.place,
      summary: e.summary,
      highlights: [...e.bullets],
    })),
    education: p.education.map((e) => ({
      institution: e.org,
      area: "Artificial Intelligence",
      studyType: "Bachelor of Science",
      startDate: "2023-10",
      summary: e.summary,
    })),
    awards: p.awards.map((title) => ({ title })),
    skills: p.skills.map((s) => ({ name: s.group, keywords: [...s.items] })),
    languages: p.languages.map((l) => ({ language: l.name, fluency: l.level })),
    meta: { canonical: `${p.site}/resume.json`, availability: p.availability },
  };
  return new Response(JSON.stringify(body, null, 2), { headers: { "Content-Type": "application/json; charset=utf-8" } });
};
