import { Request, Response } from "express";
import connection from "../dataBase/connection";

export const getTurma = async (req: Request, res: Response):Promise<void> => {
  try {
    const result = await connection()
      .select("*")
      .from("Turma")
      .where("modulo", ">", 0);
    
    
      res.status(200).send(result);
    res.status(201).send({message: "Erro na busca por Turmas."})
  } catch (error) {
    res.send(error.message || error.sqlMessage)
  }
}
