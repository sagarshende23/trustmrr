export interface Startup {
  rank: number;
  medal: string | null;
  name: string;
  description: string;
  logo: string | null;
  founder: string;
  founderHandle: string;
  revenue: string;
  mrr: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface Founder {
  handle: string;
  name: string;
  avatar: string | null;
  bio: string;
  twitter?: string;
  website?: string;
  startups: Startup[];
}

