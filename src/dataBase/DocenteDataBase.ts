import { BaseDatabase } from "./BaseDatabase"
import { Docente } from "../models/Docente"

export class DocentesDataBase extends BaseDatabase {
    public static TABLE_DOCENTES = "Docente"
  
    public async getDocente(){
      const result = await BaseDatabase.connection(DocentesDataBase.TABLE_DOCENTES)
      .select('*')
      .from('Docente')
    }
  
    public async createDocente(docente: Docente) {
      const result = await BaseDatabase
      .connection(DocentesDataBase.TABLE_DOCENTES)
      .insert({
        id: docente.getId(),
        nome: docente.getNome(),
        email: docente.getEmail(),
        data_nasc: docente.getDataNasc(),
        turma_id: docente.getIdTurma()
      })
  
      return result
    }
  
    public async editTurmaDocente(id: string, turma_id: number) {
      const result = await BaseDatabase
      .connection(DocentesDataBase.TABLE_DOCENTES)
      .update({turma_id})
      .where({id})
  
      return result
    }
  
  
  }