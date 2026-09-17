export interface CreateEventItem {
  name: string;
  image: string;
  probability: number;
}

export interface CreateEventBox {
  name: string;
  items: CreateEventItem[];
}

export interface CreateEventInput {
  name: string;
  year: number;
  boxes: CreateEventBox[];
  image: string;
  month: number;
}