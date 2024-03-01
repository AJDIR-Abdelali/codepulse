import { Category } from "../../category/models/category.model";

export interface BlogPost{
  id: string,
  title: string ,
  shortDescription: string ,
  content: string ,
  featuredImageUrl: string ,
  urlHandle: string ,
  author: string ,
  isVisible: boolean ,
  publishedDate: Date,
  categories: Category[],
}
