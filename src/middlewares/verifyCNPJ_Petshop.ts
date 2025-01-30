import { Request, Response, NextFunction } from "express";
import prisma from "../data/prismaClient";

export async function verifyCNPJ_Petshop(req: Request, res: Response, next: NextFunction) {
    const { cnpj } = req.body;

    try {
        const existingPetshop = await prisma.petShop.findUnique({ where: { cnpj } });

        if (existingPetshop) {
            return res.status(400).json({ error: "Petshop já cadastrado com esse CNPJ" });
        }

        next();
    } catch (error) {
        console.error("Erro ao verificar CNPJ do Petshop:", error);
        return res.status(500).json({ error: "Erro interno ao verificar CNPJ" });
    }
}
