import { Request, Response} from "express";
import { EstudantesDataBase} from "../dataBase/EstudanteDataBase";
import { Estudantes } from "../models/Estudante";


export const createEstudante = async (req: Request, res: Response):Promise<void> => {
  try {
    const {nome, email, data_nasc, turma_id} = req.body
    

    if(!nome || !email || !data_nasc || !turma_id){
      res.status(422)
      throw new Error("'(NOME', 'EMAIL', 'DATA DE NASCIMENTO', 'ID TURMA') devem ser passados corretamente.");
    }

    if(typeof nome !== "string" || typeof email !== "string" || typeof data_nasc !== "string" || typeof turma_id !== "string" ){
        res.status(422)
      throw new Error("'(NOME', 'EMAIL', 'DATA DE NASCIMENTO', 'ID TURMA') devem ser do tipo string.");
    }

    const Estudante = new Estudantes(
      Date.now().toString(),
      nome,
      email,
      data_nasc,
      turma_id
    )

    const EstudanteDatabase = new EstudantesDataBase()
    await EstudanteDatabase.createEstudante(Estudante)

    res.status(201).send({message: "Estudante criado com sucesso.", estudante: Estudante})
  } catch (error: any) {
    res.send(error.message || error.sqlMessage)
  }
}