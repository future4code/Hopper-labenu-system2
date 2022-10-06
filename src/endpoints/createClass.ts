import { Request, Response} from "express";
import connection from "../dataBase/connection";

export const createClass = async (req: Request, res: Response):Promise<void> => {
  try {
  } catch (error: any) {
    res.send(error.message || error.sqlMessage)
  }
}