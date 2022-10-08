import { BaseDatabase } from "./BaseDatabase"
import { Estudantes } from "../models/Estudante"

export class EstudantesDataBase extends BaseDatabase {
    public static TABLE_ESTUDANTES = "Estudantes"
  
    public async getEstudante(nome: string){
      const result = await BaseDatabase.connection(EstudantesDataBase.TABLE_ESTUDANTES)
      .select('*')
      .where({nome})
    }
  
    public async createEstudante(estudante: Estudantes) {
      const result = await BaseDatabase
      .connection(EstudantesDataBase.TABLE_ESTUDANTES)
      .insert({
        id: estudante.getId(),
        nome: estudante.getNome(),
        email: estudante.getEmail(),
        data_nasc: estudante.getDataNasc(),
        turma_id: estudante.getIdTurma()
      })
  
      return result
    }
  
    public async editTurmaEstudante(id: string, turma_id: string) {
      const result = await BaseDatabase
      .connection(EstudantesDataBase.TABLE_ESTUDANTES)
      .update({turma_id})
      .where({id})
  
      return result
    }
  
  
  }
  