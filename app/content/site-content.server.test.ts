import { describe, expect, it } from "vitest";
import {
  getHomeContent,
  getNavigationItems,
  getProjectsSection,
  getWorkExperienceSection,
} from "./site-content.server";

describe("site content loaders", () => {
  it("loads validated home content", async () => {
    const home = await getHomeContent();

    expect(home.hero.title).toBeTruthy();
    expect(home.about.facts.length).toBeGreaterThan(0);
  });

  it("filters and sorts published projects", async () => {
    const projects = await getProjectsSection();

    expect(projects.items.length).toBeGreaterThan(0);
    expect(projects.items.every((item) => item.published)).toBe(true);
    expect(projects.items[0].featured).toBe(true);
  });

  it("loads visible navigation items only", async () => {
    const items = await getNavigationItems();

    expect(items.every((item) => item.visible)).toBe(true);
  });

  it("loads sorted work experience entries", async () => {
    const workExperience = await getWorkExperienceSection();

    expect(workExperience.items.length).toBeGreaterThan(0);
    expect(workExperience.items[0].sortOrder).toBeLessThanOrEqual(
      workExperience.items[workExperience.items.length - 1].sortOrder,
    );
  });
});
