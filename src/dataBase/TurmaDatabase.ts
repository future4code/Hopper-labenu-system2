import { Turma } from "../models/Turma";
import { BaseDatabase } from "./BaseDatabase";


export class TurmaDatabase extends BaseDatabase {
  public static TABLE_TURMA = "Turma"

  public async getTurmas(id: string, nome: string, modulo: string) {
    const result = await BaseDatabase
    .connection(TurmaDatabase.TABLE_TURMA)
    .select(id, nome, modulo)
    .where(modulo !== '0')

    return result
  }
    

  public async createTurma(turma: Turma) {
    const result = await BaseDatabase
    .connection(TurmaDatabase.TABLE_TURMA)
    .insert({
      id: turma.getId(),
      nome: turma.getNome(),
      modulo: turma.getModulo()
    })

    return result
  }

  public async editTurma(id: string, modulo: number) {
    const result = await BaseDatabase
    .connection(TurmaDatabase.TABLE_TURMA)
    .update({modulo})
    .where({id})

    return result
  }
}


