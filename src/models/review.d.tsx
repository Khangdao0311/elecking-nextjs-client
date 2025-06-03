interface IReview {
  id: string;
  content: string;
  images: string[];
  rating: number;
  created_at: string;
  updated_at: string;
  order_id: string;
  product_id: string;
  like: string[];
  user: {
    id: string;
    avatar: string;
    fullname: string;
  };
}
