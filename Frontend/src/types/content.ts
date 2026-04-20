export type ContentType = 'tweet' | 'video' | 'document' | 'link';

export interface ContentItem {
  _id: string;
  type: ContentType;
  title: string;
  link?: string;
  content?: string;
  tags?: string[];
}
