import { IUser } from "@/models/user.model";

export interface CreateUserProps {
  clerkId: string;
  name: string;
  email: string;
  picture: string;
  username: string;
  role: string
}

export interface UpdateUserProps {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface DeletUserProps {
  clerkId: string;
}

export interface GetWishlistedProductProps {
  userId: string;
  productId: string | undefined;
}

export interface WishlistedProductProps extends GetWishlistedProductProps {
  path?: string;
}

export interface GetProductProps {
  category?: string;
  designer?: string;
  material?: string;
  size?: string;
  page?: number;
  pageSize?: number;
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export interface GetAllCartProductsProps {
  userId: string;
}

export interface CartProps extends GetAllCartProductsProps {
  productId: string;
}

export interface addToCartProps extends CartProps {
  path: string;
}
