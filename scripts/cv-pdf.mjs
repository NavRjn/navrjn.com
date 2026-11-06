// Renders /cv to public/cv.pdf with headless Edge or Chrome. Run: npm run build && npm run cv:pdf
import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const browsers = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
];
const exe = browsers.find(existsSync);
if (!exe) throw new Error("No Edge/Chrome found");

const server = spawn("npx", ["astro", "preview", "--port", "4399"], { shell: true, stdio: "ignore" });
for (let i = 0; i < 60; i++) {
  try { if ((await fetch("http://localhost:4399/cv")).ok) break; } catch {}
  await new Promise((r) => setTimeout(r, 500));
}
const res = spawnSync(exe, ["--headless", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${resolve("public/cv.pdf")}`, "http://localhost:4399/cv"], { stdio: "inherit" });
server.kill();
spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"], { shell: true, stdio: "ignore" });
process.exit(res.status ?? 0);
