export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tech: string[];
  imageUrl: string;
}

export interface Experience {
  id: number;
  date: string;
  title: string;
  company: string;
  description: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: 'Github' | 'Twitter' | 'Linkedin' | 'Instagram';
  shownInPill: boolean;
} 