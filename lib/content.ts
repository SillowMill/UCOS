import { compileMDX } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import { promises as fs } from "fs";
import path from "path";
import { Locale, defaultLocale } from "./i18n";

export type NavItem = { label: string; href: string };

export type CardItem = {
  icon: string;
  title: string;
  text: string;
};

export type StatItem = {
  label: string;
  value: number;
  suffix?: string;
};

export type ProgramItem = {
  title: string;
  description: string;
  image: string;
};

export type ShowcaseItem = {
  slug: string;
  title: string;
  summary: string;
  sourceUrl: string;
  image: string;
};

export type StoryPreview = {
  slug: string;
  category: string;
  title: string;
  date: string;
  excerpt: string;
  locale: Locale;
};

export type HomeContent = {
  meta: {
    title: string;
    description: string;
  };
  accessibility: {
    skipToContent: string;
  };
  branding: {
    name: string;
    tagline: string;
  };
  nav: {
    ariaLabel: string;
    items: NavItem[];
    cta: string;
    openMenuLabel: string;
    closeMenuLabel: string;
    languageLabel: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    cardStatOneLabel: string;
    cardStatOneValue: string;
    cardStatTwoLabel: string;
    cardStatTwoValue: string;
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    cards: CardItem[];
  };
  whatWeDo: {
    eyebrow: string;
    title: string;
    description: string;
    items: CardItem[];
  };
  ecosystem: {
    eyebrow: string;
    title: string;
    description: string;
    items: ShowcaseItem[];
  };
  impact: {
    eyebrow: string;
    title: string;
    description: string;
    stats: StatItem[];
    quote: string;
    quoteAuthor: string;
  };
  programs: {
    eyebrow: string;
    title: string;
    description: string;
    items: ProgramItem[];
  };
  involved: {
    eyebrow: string;
    title: string;
    description: string;
    learnMoreLabel: string;
    items: CardItem[];
  };
  stories: {
    eyebrow: string;
    title: string;
    description: string;
    readLabel: string;
    allStoriesLabel: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    primary: string;
    secondary: string;
  };
  footer: {
    description: string;
    contactTitle: string;
    contactLines: string[];
    newsletterTitle: string;
    newsletterLabel: string;
    newsletterPlaceholder: string;
    newsletterButton: string;
    socialTitle: string;
    socialLinks: NavItem[];
    legal: string;
  };
};

type StoryFrontmatter = {
  title: string;
  category: string;
  date: string;
  excerpt: string;
};

export type UcosPageFrontmatter = {
  title: string;
  eyebrow: string;
  summary: string;
  sourceUrl: string;
  heroImage: string;
  quickLinks: NavItem[];
  gallery: string[];
  sections: Array<{
    heading: string;
    text: string;
  }>;
};

function getHomePath(locale: Locale) {
  return path.join(process.cwd(), "content", "home", `${locale}.mdx`);
}

function getStoriesDir(locale: Locale) {
  return path.join(process.cwd(), "content", "stories", locale);
}

function getUcosPagesDir(locale: Locale) {
  return path.join(process.cwd(), "content", "ecosystem-pages", locale);
}

async function readFileWithFallback(filePath: string, fallbackPath: string) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return fs.readFile(fallbackPath, "utf8");
  }
}

export async function getHomeContent(locale: Locale): Promise<HomeContent> {
  const source = await readFileWithFallback(getHomePath(locale), getHomePath(defaultLocale));
  const { frontmatter } = await compileMDX<HomeContent>({
    source,
    options: { parseFrontmatter: true }
  });
  return frontmatter;
}

export async function getStoryPreviews(locale: Locale): Promise<StoryPreview[]> {
  const localeDir = getStoriesDir(locale);
  const fallbackDir = getStoriesDir(defaultLocale);
  const dirToRead = await fs
    .access(localeDir)
    .then(() => localeDir)
    .catch(() => fallbackDir);

  const entries = await fs.readdir(dirToRead);
  const mdxFiles = entries.filter((entry) => entry.endsWith(".mdx"));

  const stories = await Promise.all(
    mdxFiles.map(async (fileName) => {
      const filePath = path.join(dirToRead, fileName);
      const source = await fs.readFile(filePath, "utf8");
      const parsed = matter(source);
      const data = parsed.data as StoryFrontmatter;
      return {
        slug: fileName.replace(/\.mdx$/, ""),
        category: data.category,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        locale
      } satisfies StoryPreview;
    })
  );

  return stories.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getStoryBySlug(locale: Locale, slug: string) {
  const primaryPath = path.join(getStoriesDir(locale), `${slug}.mdx`);
  const fallbackPath = path.join(getStoriesDir(defaultLocale), `${slug}.mdx`);
  const source = await readFileWithFallback(primaryPath, fallbackPath);
  const compiled = await compileMDX<StoryFrontmatter>({
    source,
    options: { parseFrontmatter: true }
  });
  return compiled;
}

export async function getUcosPageSlugs(locale: Locale): Promise<string[]> {
  const localeDir = getUcosPagesDir(locale);
  const fallbackDir = getUcosPagesDir(defaultLocale);
  const dirToRead = await fs
    .access(localeDir)
    .then(() => localeDir)
    .catch(() => fallbackDir);

  const entries = await fs.readdir(dirToRead);
  return entries.filter((entry) => entry.endsWith(".mdx")).map((entry) => entry.replace(/\.mdx$/, ""));
}

export async function getUcosPageBySlug(locale: Locale, slug: string) {
  const primaryPath = path.join(getUcosPagesDir(locale), `${slug}.mdx`);
  const fallbackPath = path.join(getUcosPagesDir(defaultLocale), `${slug}.mdx`);
  const source = await readFileWithFallback(primaryPath, fallbackPath);
  return compileMDX<UcosPageFrontmatter>({
    source,
    options: { parseFrontmatter: true }
  });
}
