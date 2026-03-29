export interface LinkItem {
  id: string;
  title: string;
  ogImage: string;
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
