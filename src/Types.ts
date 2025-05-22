export interface VariantData {
  id: number;
  image: string;
  title: string;
  description: string;
  tags: [
    Tag
  ]
  enableSwap: boolean;
}

export interface Tag {
  id: number;
  text: string;
}