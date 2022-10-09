import { BaseDatabase } from "./BaseDatabase"
import { Docente } from "../models/Docente"
import { Especialidade } from "../models/Especialidade"

export class DocenteDatabase extends BaseDatabase {
    public static TABLE_DOCENTES = "Docente"
    public static TABLE_DOCENTE_ESPECIALIDADES = "Docente_especialidades"
    public static TABLE_ESPECIALIDADES = "Especialidades"
    public static TABLE_TURMA = "Turma"
  
    public async getDocente(){
      const result = await BaseDatabase.connection
      .raw(`
        SELECT d.id as ID, d.nome as NOME, d.email as EMAIL, d.data_nasc as NASCIMENTO, t.nome as TURMA, t.modulo as MODULO, e.nome as ESPECIALIDADE
        FROM ${DocenteDatabase.TABLE_DOCENTES} as d
        JOIN ${DocenteDatabase.TABLE_TURMA} as t ON d.turma_id = t.id
        JOIN ${DocenteDatabase.TABLE_DOCENTE_ESPECIALIDADES} as d_e ON d_e.docente_id = d.id
        JOIN ${DocenteDatabase.TABLE_ESPECIALIDADES} as e ON e.id = d_e.Especialidades_id;
      `)
        
      return result[0]
    }
  
    public async getEspecialidade(especialidade: string) {
      const result = await BaseDatabase.connection(DocenteDatabase.TABLE_ESPECIALIDADES)
      .select()
      .where("nome", "LIKE", `%${especialidade}%`)

      return result
    }

    public async createEspecialidade(especialidade: Especialidade){
      const result = BaseDatabase.connection(DocenteDatabase.TABLE_DOCENTE_ESPECIALIDADES)
      .insert({
        id: especialidade.getID(),
        docente_id: especialidade.getDocenteID(),
        especialidades_id: especialidade.getEspecialidadesID()
      })

      return result
    }

    public async createDocente(docente: Docente) {
      const result = await BaseDatabase
      .connection(DocenteDatabase.TABLE_DOCENTES)
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
      .connection(DocenteDatabase.TABLE_DOCENTES)
      .update({turma_id})
      .where({id})
  
      return result
    }
  
  
  }