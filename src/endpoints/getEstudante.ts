import { Request, Response } from "express";
import connection from "../dataBase/connection";

export const getEstudante = async (req:Request, res:Response) => {
    try{
      const nome = req.params.nome
      
      const result = await connection()
      .select("*")
      .from("Estudantes")
      .whereLike(nome);

     res.status(200).send(result)
    }catch(error){
     res.statusCode = 500;
      res.send({message: error.message})

    }
 }