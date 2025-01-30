import { Request, Response, NextFunction } from "express";
import prisma from "../data/prismaClient";

export async function verifyExistingAccount(req: Request, res: Response, next: NextFunction) {
    const cnpj = req.headers.cnpj as string;

    const petShop = await prisma.petShop.findUnique({ where: { cnpj } });

    if (!petShop) {
        return res.status(400).json({ error: "Esse petshop não existe" });
    }

    req.petshop = petShop;
    next();
}
