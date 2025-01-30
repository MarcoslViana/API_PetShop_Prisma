import { Router } from "express";
import { verifyCNPJ } from "../middlewares/verifyCNPJ";
import { verifyCNPJ_Petshop } from "../middlewares/verifyCNPJ_Petshop";
import prisma from "../data/prismaClient"; // Prisma client importado
import { v4 as CreateID } from "uuid";

const routesPetShop = Router();

routesPetShop.post('/petshops', verifyCNPJ, verifyCNPJ_Petshop, async (req, res) => {
    const { name, cnpj } = req.body;

    try {
        const newPetshop = await prisma.petShop.create({
            data: {
                id: CreateID(),
                name,
                cnpj
            }
        });

        res.status(201).json({ message: "Petshop cadastrado", newPetshop });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao cadastrar Petshop" });
    }
});

export default routesPetShop;
