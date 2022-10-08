import { Request, Response} from "express";
import { DocentesDataBase } from "../dataBase/DocenteDataBase";
import { Docente } from "../models/Docente";


export const createDocente = async (req: Request, res: Response):Promise<void> => {
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

    const Instrutor = new Docente(
      Date.now().toString(),
      nome,
      email,
      data_nasc,
      turma_id
    )

        const DocenteDataBase = new DocentesDataBase()
        await DocenteDataBase.createDocente(Instrutor)

        res.status(201).send({message: "Estudante criado com sucesso.", docente: Instrutor})
  } catch (error: any) {
    res.send(error.message || error.sqlMessage)
  }
}