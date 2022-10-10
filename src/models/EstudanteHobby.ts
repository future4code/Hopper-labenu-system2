export class EstudanteHobby {
  constructor(
    private id: string,
    private estudante_id: string,
    private hobby_id: string
  ){
    this.id = id,
    this.estudante_id = estudante_id,
    this.hobby_id = hobby_id
  }

  public getID(){
    return this.id
  }

  public getEstudanteID(){
    return this.estudante_id
  }

  public getHobbyID(){
    return this.hobby_id
  }

  public setID(newID: string){
    this.id = newID
  }

  public setEstudanteID(newEstudanteID: string){
    this.estudante_id = newEstudanteID
  }

  public setHobbyID(newHobbyID: string){
    this.hobby_id = newHobbyID
  }
}