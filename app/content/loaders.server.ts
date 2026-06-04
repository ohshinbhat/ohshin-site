import { getBlogPostBySlug, getBlogPostMetas } from "./blogs.server";
import {
  getHomeContent,
  getNavigationItems,
  getProjectsSection,
  getSocialLinks,
  getWorkExperienceSection,
} from "./site-content.server";

export async function getHomePageContent() {
  const [home, navigationItems, socialLinks] =
    await Promise.all([
      getHomeContent(),
      getNavigationItems(),
      getSocialLinks(),
    ]);

  return {
    home,
    navigationItems,
    socialLinks,
  };
}

export async function getWorkPageContent() {
  const [navigationItems, projects, workExperience] = await Promise.all([
    getNavigationItems(),
    getProjectsSection(),
    getWorkExperienceSection(),
  ]);

  return {
    navigationItems,
    projects,
    workExperience,
  };
}

export async function getBlogsPageContent() {
  const [navigationItems, posts] = await Promise.all([
    getNavigationItems(),
    getBlogPostMetas(),
  ]);

  return {
    navigationItems,
    posts,
  };
}

export async function getBlogPostPageContent(slug: string) {
  const [navigationItems, post] = await Promise.all([
    getNavigationItems(),
    getBlogPostBySlug(slug),
  ]);

  return {
    navigationItems,
    post,
  };
}
