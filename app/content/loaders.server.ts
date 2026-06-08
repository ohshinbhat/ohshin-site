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
  const [navigationItems, projects, socialLinks, workExperience] = await Promise.all([
    getNavigationItems(),
    getProjectsSection(),
    getSocialLinks(),
    getWorkExperienceSection(),
  ]);

  return {
    navigationItems,
    projects,
    socialLinks,
    workExperience,
  };
}
