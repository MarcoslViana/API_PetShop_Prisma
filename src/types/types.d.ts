import { PetShop } from "@prisma/client";

declare global {
  namespace Express {
    export interface Request {
      petshop?: PetShop;
    }
  }
}
