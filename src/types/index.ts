export interface LinkItem {
  id: string;
  title: string;
  ogImage: string;
  thumbnail?: string;
  url: string;
  customTags: string[];
  notes: string;
}

export interface VideoItem {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  youtubeUrl: string;
  tags: string[];
}

export interface SkillItem {
  id: string;
  title: string;
  url: string;
  customTags: string[];
  notes: string;
}
