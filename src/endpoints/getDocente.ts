import { Request, Response } from "express";
import { DocenteDatabase } from "../dataBase/DocenteDatabase";

export const getDocente = async ( req: Request, res: Response ):Promise<void> => {
  try {
    const docenteDatabase = new DocenteDatabase;
    const result = await docenteDatabase.getDocente();

     res.status(200).send(result);
  } catch (error:any) {
    res.send(error.message || error.sqlMessage);
  };

};
