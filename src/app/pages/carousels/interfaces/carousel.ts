import { Image } from "src/app/pages/products/interfaces/product";

export interface Carousel {
  id?:number;
  name:string;
  platform:string;
  status:boolean;
  images?: Image[]
}
