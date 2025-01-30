import { Router } from "express";
import { verifyExistingAccount } from "../middlewares/verifyExistingAccount";
import prisma from "../data/prismaClient";
import { v4 as CreateID } from "uuid";

const routesPet = Router();

routesPet.get('/pets', verifyExistingAccount, async (req, res) => {
    if (!req.petshop) {
        return res.status(400).json({ error: "Petshop não encontrado" });
    }
    const pets = await prisma.pet.findMany({ where: { petShopId: req.petshop.id } });
    res.status(200).json(pets);
});

routesPet.post('/pets', verifyExistingAccount, async (req, res) => {
    if (!req.petshop) {
        return res.status(400).json({ error: "Petshop não encontrado" });
    }

    const infos = req.body;

    const newPet = await prisma.pet.create({
        data: {
            id: CreateID(),
            name: infos.name,
            type: infos.type,
            description: infos.description,
            vaccinated: false,
            deadline_vaccination: new Date(infos.deadline_vaccination),
            created_at: new Date(),
            petShopId: req.petshop.id
        }
    });

    res.status(201).json({ message: "O Pet foi cadastrado", newPet });
});

routesPet.put('/pets/:id', verifyExistingAccount, async (req, res) => {
    if (!req.petshop) {
        return res.status(400).json({ error: "Petshop não encontrado" });
    }

    const petID = req.params.id;
    const { name, type, description, deadline_vaccination } = req.body;

    const updatedPet = await prisma.pet.updateMany({
        where: {
            id: petID,
            petShopId: req.petshop.id,
        },
        data: {
            name,
            type,
            description,
            deadline_vaccination: deadline_vaccination ? new Date(deadline_vaccination) : undefined
        }
    });

    if (updatedPet.count === 0) {
        return res.status(404).json({ error: "Pet não encontrado" });
    }

    res.status(200).json({ message: "Informações do pet atualizadas" });
});

routesPet.patch('/pets/:id/vaccinated', verifyExistingAccount, async (req, res) => {
    if (!req.petshop) {
        return res.status(400).json({ error: "Petshop não encontrado" });
    }

    const petID = req.params.id;

    const updatedPet = await prisma.pet.updateMany({
        where: {
            id: petID,
            petShopId: req.petshop.id,
        },
        data: {
            vaccinated: true,
        }
    });

    if (updatedPet.count === 0) {
        return res.status(404).json({ error: "Pet não encontrado" });
    }

    res.status(200).json({ message: "Pet vacinado" });
});

routesPet.delete('/pets/:id', verifyExistingAccount, async (req, res) => {
    if (!req.petshop) {
        return res.status(400).json({ error: "Petshop não encontrado" });
    }

    const petID = req.params.id;

    const deletedPet = await prisma.pet.deleteMany({
        where: {
            id: petID,
            petShopId: req.petshop.id,
        }
    });

    if (deletedPet.count === 0) {
        return res.status(404).json({ error: "Pet não encontrado" });
    }

    res.status(200).json({ message: "Pet deletado do sistema" });
});

export default routesPet;
