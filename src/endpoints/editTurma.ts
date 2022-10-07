import { Request, Response } from "express";
import { TurmaDatabase } from "../dataBase/TurmaDatabase";

export const editTurma = async (req: Request, res: Response):Promise<void> => {
  try {
    const id = req.query.id as string
    const modulo = req.body.modulo as number

    if (!id || !modulo) {
      res.status(422)
      throw new Error("O 'id' da turma e o novo 'modulo' devem ser informados!");
    }

    if (isNaN(modulo)) {
      res.status(422)
      throw new Error("O 'modulo' deve ser do tipo NUMBER!");
    }

    const turmaDatabase = new TurmaDatabase()
    await turmaDatabase.editTurma(id, modulo)

    res.status(201).send({message: "Módulo da turma editado com sucesso!"})
  } catch (error) {
    res.send(error.message || error.sqlMessage)
  }
}
