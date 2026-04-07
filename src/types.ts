export interface Tool {
  id: string;
  category: 'image' | 'pdf' | 'photo' | 'file';
  title: string;
  description: string;
  icon: string;
  colorClass: string;
  badge?: {
    type: 'new' | 'free';
    text: string;
  };
}
