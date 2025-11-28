const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Services
export interface Service {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export async function getServices(): Promise<Service[]> {
  try {
    const res = await fetch(`${API_URL}/services`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

// Portfolio
export interface PortfolioItem {
  _id: string;
  type: string;
  src: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export async function getPortfolio(): Promise<PortfolioItem[]> {
  try {
    const res = await fetch(`${API_URL}/portfolio`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return [];
  }
}

// Care Articles
export interface CareArticle {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  sidebarTips: string[];
  sidebarTimeText: string;
  createdAt: string;
  updatedAt: string;
}

export async function getCareArticles(): Promise<CareArticle[]> {
  try {
    const res = await fetch(`${API_URL}/care`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching care articles:', error);
    return [];
  }
}

export async function getCareArticleBySlug(slug: string): Promise<CareArticle | null> {
  try {
    const res = await fetch(`${API_URL}/care/slug/${slug}`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching care article:', error);
    return null;
  }
}

// Blog Posts
export interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${API_URL}/blog`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${API_URL}/blog/slug/${slug}`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}
