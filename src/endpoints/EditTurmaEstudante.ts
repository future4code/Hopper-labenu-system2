import { Request, Response } from "express";
import { EstudantesDataBase } from "../dataBase/EstudanteDataBase";


export const editTurmaEstudante = async (req: Request, res: Response):Promise<void> => {
  try {
    const id = req.query.id as string
    const turma_id = req.body.turma_id as number

    if (!id || !turma_id) {
      res.status(422)
      throw new Error("O 'id' do estudante e a nova turma 'turma_id' devem ser informados!");
    }

    if (isNaN(turma_id)) {
      res.status(422)
      throw new Error("A 'turma_id' deve ser do tipo NUMBER!");
    }

    const EstudanteDataBase = new EstudantesDataBase()
    await EstudanteDataBase.editTurmaEstudante(id, turma_id)

    res.status(201).send({message: "O estudante foi alterado de turma com sucesso!"})
  } catch (error) {
    res.send(error.message || error.sqlMessage)
  }
}