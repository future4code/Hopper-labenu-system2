import { Request, Response} from "express";
import { TurmaDatabase } from "../dataBase/TurmaDatabase";
import { Turma } from "../models/Turma";

export const createTurma = async (req: Request, res: Response):Promise<void> => {
  try {
    const {nome} = req.body

    if(!nome){
      res.status(422)
      throw new Error("Nome da turma obrigatório!");
    }

    const turma = new Turma(
      Date.now().toString(),
      nome,
      0
    )

    const turmaDatabase = new TurmaDatabase()
    await turmaDatabase.createTurma(turma)

    res.status(201).send({message: "Turma criada com sucesso", class: turma})
  } catch (error: any) {
    res.send(error.message || error.sqlMessage)
  }
}
