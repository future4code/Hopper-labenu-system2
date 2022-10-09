import { Request, Response} from "express";
import { DocenteDatabase } from "../dataBase/DocenteDatabase";
import { Docente } from "../models/Docente";


export const createDocente = async (req: Request, res: Response):Promise<void> => {
  try {
    const {nome, email, data_nasc, turma_id, especialidade} = req.body
    

    if(!nome || !email || !data_nasc || !turma_id || !especialidade){
      res.status(422)
      throw new Error("'(NOME', 'EMAIL', 'DATA DE NASCIMENTO', 'ID TURMA', 'ESPECIALIDADE') devem ser passados corretamente.");
    }

    if(typeof nome !== "string" || typeof email !== "string" || typeof data_nasc !== "string" || typeof turma_id !== "string" ){
        res.status(422)
      throw new Error("'(NOME', 'EMAIL', 'DATA DE NASCIMENTO', 'ID TURMA') devem ser do tipo string.");
    }

    const DOCENTEID = Date.now().toString()
    let teste
    if(especialidade.includes(",")){
      const arrEspecialidade = especialidade.split(",")
      const docenteDataBase = new DocenteDatabase()
      
      teste = arrEspecialidade.forEach(async (especialidade: string) => {
        const response = await docenteDataBase.getEspecialidade(especialidade)
        // if(response.length){
        //   const newEspecialidade = {
        //     id: Date.now().toString(),
        //     docente_id: DOCENTEID,
        //     especialidades_id: response.map(async (esp: string) => { esp['id'] })
        //   }
        // }
        return response
      });
    }

    const Instrutor = new Docente(
      DOCENTEID,
      nome,
      email,
      data_nasc,
      turma_id
    )

        // const DocenteDataBase = new DocenteDatabase()
        // await DocenteDataBase.createDocente(Instrutor)

        res.status(201).send({message: "Docente criado com sucesso.", docente: Instrutor, teste})
  } catch (error: any) {
    res.send(error.message || error.sqlMessage)
  }
}