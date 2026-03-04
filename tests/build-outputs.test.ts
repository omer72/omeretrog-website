import { describe, it, expect, beforeAll } from "vitest";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { execSync } from "child_process";

const distDir = resolve(__dirname, "../dist");

// Build once before all tests in this file
beforeAll(() => {
  execSync("npm run build", { cwd: resolve(__dirname, ".."), stdio: "pipe" });
}, 60000);

describe("Build outputs — SEO-04", () => {
  it("generates sitemap.xml in dist/", () => {
    expect(existsSync(resolve(distDir, "sitemap.xml"))).toBe(true);
  });

  it("sitemap.xml contains all 4 routes", () => {
    const sitemap = readFileSync(resolve(distDir, "sitemap.xml"), "utf-8");
    expect(sitemap).toContain("https://omeretrog.com/");
    expect(sitemap).toContain("https://omeretrog.com/work");
    expect(sitemap).toContain("https://omeretrog.com/about");
    expect(sitemap).toContain("https://omeretrog.com/contact");
  });

  it("generates robots.txt in dist/", () => {
    expect(existsSync(resolve(distDir, "robots.txt"))).toBe(true);
  });

  it("robots.txt references the sitemap", () => {
    const robots = readFileSync(resolve(distDir, "robots.txt"), "utf-8");
    expect(robots.toLowerCase()).toContain("sitemap");
  });

  it("_redirects file is copied to dist/", () => {
    expect(existsSync(resolve(distDir, "_redirects"))).toBe(true);
  });
});
