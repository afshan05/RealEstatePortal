import type { Property } from "./property";

export type Favorite = {
    favoriteId: string,
     userId?: string,
    favoriteItems: FavoriteItem[]
  }
  
  export class FavoriteItem {
    constructor(property: Property) {
      this.propertyId = property.id;
      this.title = property.title;
      this.price = property.price;
      this.imageUrl = property.imageUrl;
      this.city = property.city;
      this.listingType = property.listingType;

    }

    propertyId: number
    title: string
    price: number
    imageUrl: string
    city: string
    listingType: string
    
  }