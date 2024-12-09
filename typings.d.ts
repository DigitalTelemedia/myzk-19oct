interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  salePrice: number;
  rating: number;
  description: string;
  mainImage: string;
  alternateImage1:string,
  alternateImage2:string,
  alternateImage3:string,
  alternateImage4:string,
  manufacturer: string;
  categoryId: string;
  category: {name: string}?;
  inStock: number;
}

interface SingleProductPageProps {
  params: {
    productSlug: string;
  };
}

type ProductInWishlist = {
  id: string;
  title: string;
  price: number;
  salePrice: number;
  image: string;
  slug: string;
  stockAvailabillity: number;
};

interface OtherImages {
  imageID: number;
  productID: number;
  image: string;
}

interface Category {
  id: string;
  name: string;
  displayName: string;
  href: string;
  image: string;
}

interface User {
  id: string;
  email: string;
  password: string | null;
  role: string;
}

interface Order {
  productId: ReactNode;
  issuedAt(issuedAt: any): string | number | Date;
  expiresAt(expiresAt: any): string | number | Date;
  id: string;
  adress: string;
  apartment: string;
  company: string;
  dateTime: string;
  email: string;
  lastname: string;
  name: string;
  phone: string;
  postalCode: string;
  status: "processing" | "canceled" | "delivered";
  city: string;
  country: string;
  orderNotice: string?;
  total: number;
}

interface SingleProductBtnProps {
  product: Product;
  quantityCount: number;
}




interface WishListItem {
  id: string;
  userId: string;
  productId: string;
  product: Product;
}