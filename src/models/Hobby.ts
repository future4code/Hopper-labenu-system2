export class Hobby {
  constructor(
    private id: string,
    private nome: string
  ){
    this.id = id,
    this.nome = nome
  }

  public getID(){
    return this.id
  }

  public getNome(){
    return this.nome
  }

  public setID(newID: string){
    this.id = newID
  }

  public setNome(newNome: string){
    this.nome = newNome
  }
}
