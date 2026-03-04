import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const cssContent = readFileSync(
  resolve(__dirname, "../src/styles/index.css"),
  "utf-8"
);

describe("Design Tokens", () => {
  it("imports tailwindcss", () => {
    expect(cssContent).toContain('@import "tailwindcss"');
  });

  it("defines @theme block", () => {
    expect(cssContent).toContain("@theme");
  });

  it("defines dark custom variant", () => {
    expect(cssContent).toContain("@custom-variant dark");
  });

  const requiredTokens = [
    "--color-bg",
    "--color-surface",
    "--color-surface-alt",
    "--color-border",
    "--color-text",
    "--color-text-muted",
    "--color-accent",
    "--color-accent-hover",
    "--font-sans",
  ];

  requiredTokens.forEach((token) => {
    it(`defines ${token}`, () => {
      expect(cssContent).toContain(token);
    });
  });

  it("uses near-black background (#111111), not pure black", () => {
    expect(cssContent).toMatch(/--color-bg:\s*#111111/);
  });
});
