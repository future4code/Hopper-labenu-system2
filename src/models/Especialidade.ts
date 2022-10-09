export class Especialidade {
  constructor(
    private id: string,
    private docente_id: string,
    private especialidades_id: string
  ){
    this.id = id,
    this.docente_id = docente_id,
    this.especialidades_id = especialidades_id
  }

  public getID(){
    return this.id
  }

  public getDocenteID(){
    return this.docente_id
  }

  public getEspecialidadesID(){
    return this.especialidades_id
  }

  public setID(newID: string){
    this.id = newID
  }

  public setDocenteID(newDocenteID: string){
    this.docente_id = newDocenteID
  }

  public setEspecialidadesID(newEspecialidadesID: string){
    this.especialidades_id = newEspecialidadesID
  }
}
