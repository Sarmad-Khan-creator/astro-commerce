import { IUser } from "@/models/user.model";

export interface CreateUserProps {
  clerkId: string;
  name: string;
  email: string;
  picture: string;
  username: string;
}

export interface UpdateUserProps {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface DeletUserProps {
    clerkId: string
}