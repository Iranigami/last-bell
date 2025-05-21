export interface VariantData {
  id: number;
  image: string;
  title: string;
  description: string;
  tags: [
    Tag
  ]
}

export interface Tag {
  id: number;
  text: string;
}