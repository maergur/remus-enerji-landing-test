import { createClient, Entry, ContentfulClientApi } from 'contentful';

// Check if Contentful is configured
const hasContentfulConfig = !!(
  import.meta.env.VITE_CONTENTFUL_SPACE_ID &&
  import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
);

// Contentful client - only create if credentials exist
const client: ContentfulClientApi<undefined> | null = hasContentfulConfig
  ? createClient({
      space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
      accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
    })
  : null;

// Types for blog post fields from Contentful
export interface BlogPostFields {
  title: string;
  slug: string;
  excerpt: string;
  body: any; // Rich text document
  coverImage?: any; // Can be Asset or unresolved link
  publishedAt: string;
  author?: string;
  tags?: string[];
}

// Parsed blog post for use in components
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: any;
  coverImageUrl?: string;
  publishedAt: string;
  author?: string;
  tags?: string[];
}

// Helper to extract image URL from Contentful asset
const getImageUrl = (asset: any): string | undefined => {
  if (!asset) return undefined;
  // Resolved asset has fields.file.url
  const url = asset?.fields?.file?.url;
  if (url) {
    return url.startsWith('//') ? `https:${url}` : url;
  }
  return undefined;
};

// Transform Contentful entry to BlogPost
const transformEntry = (entry: Entry<BlogPostFields>): BlogPost => {
  const fields = entry.fields;
  return {
    id: entry.sys.id,
    title: fields.title as string,
    slug: fields.slug as string,
    excerpt: fields.excerpt as string,
    body: fields.body,
    coverImageUrl: getImageUrl(fields.coverImage),
    publishedAt: fields.publishedAt as string,
    author: fields.author as string | undefined,
    tags: fields.tags as string[] | undefined,
  };
};

// Fetch all blog posts
export const fetchBlogPosts = async (locale: string = 'tr'): Promise<BlogPost[]> => {
  if (!client) {
    console.warn('Contentful is not configured. Skipping blog fetch.');
    return [];
  }
  try {
    const response = await client.getEntries<BlogPostFields>({
      content_type: 'blogPage',
      order: ['-fields.publishedAt'],
      include: 2, // Include linked assets
    });
    return response.items.map(transformEntry);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

// Fetch single blog post by slug
export const fetchBlogPostBySlug = async (
  slug: string,
  locale: string = 'tr'
): Promise<BlogPost | null> => {
  if (!client) {
    console.warn('Contentful is not configured. Skipping blog fetch.');
    return null;
  }
  try {
    const response = await client.getEntries<BlogPostFields>({
      content_type: 'blogPage',
      'fields.slug': slug,
      include: 2, // Include linked assets
      limit: 1,
    });
    if (response.items.length === 0) return null;
    return transformEntry(response.items[0]);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

// Check if Contentful is configured
export const isContentfulConfigured = (): boolean => {
  return hasContentfulConfig;
};

export default client;

