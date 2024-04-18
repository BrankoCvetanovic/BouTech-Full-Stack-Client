export interface LoaderItem {
  _id: string;
  category: string;
  createdAt: string;
  image: string;
  description: string;
  name: string;
  price: number;
  __v: number;
  discount: number;
}

export interface loadedData {
  items: LoaderItem[];
  count: number;
}
