import { Request, Response, NextFunction } from "express";

export async function verifyCNPJ(req: Request, res: Response, next: NextFunction) {
    const CNPJ = /^\d{2}\.\d{3}\.\d{3}\/0001-\d{2}$/;
    const info = req.body.cnpj;
    if (!CNPJ.test(info)) {
        res.status(400).json({error: "Formato do CNPJ incorreto"});
        return;
    }
    next();
}