import { BaseDatabase } from "./BaseDatabase"
import { Estudante } from "../models/Estudante"
import { Hobby } from "../models/Hobby"
import { EstudanteHobby } from "../models/EstudanteHobby"

export class EstudantesDataBase extends BaseDatabase {
  public static TABLE_ESTUDANTES = "Estudantes"
  public static TABLE_HOBBY = "Hobbies"
  public static TABLE_ESTUDANTE_HOBBY = "Estudante_hobbies"

  public async getEstudante(nome: string){
    const result = await BaseDatabase.connection(EstudantesDataBase.TABLE_ESTUDANTES)
    .select('*')
    .where({nome})
  }

  public async createEstudante(estudante: Estudante) {
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
  
  public async getHobby(hobby: string){
    const result = await BaseDatabase
    .connection(EstudantesDataBase.TABLE_HOBBY)
    .select()
    .where("nome", "like", `%${hobby}%`)

    return result
  }

  public async createHobby(hobby: Hobby){
    const result = await BaseDatabase
    .connection(EstudantesDataBase.TABLE_HOBBY)
    .insert({
      id: hobby.getID(),
      nome: hobby.getNome()
    })

    return result
  }

  public async createEstudanteHobby (estudanteHobby: EstudanteHobby) {
    const result = await BaseDatabase
    .connection(EstudantesDataBase.TABLE_ESTUDANTE_HOBBY)
    .insert({
      id: estudanteHobby.getID(),
      estudante_id: estudanteHobby.getEstudanteID(),
      hobby_id: estudanteHobby.getHobbyID()
    })
    
    return result
  }

  public async editTurmaEstudante(id: string, turma_id: number) {
    const result = await BaseDatabase
    .connection(EstudantesDataBase.TABLE_ESTUDANTES)
    .update({turma_id})
    .where({id})

    return result
  }
  
}
  