export type TDocente = {
  ID: string,
  NOME: string,
  EMAIL: string,
  NASCIMENTO: string,
  TURMA: string,
  MODULO: number,
  ESPECIALIDADE: string 
}

export class Docente {
  constructor(
    private id: string,
    private nome: string,
    private email: string,
    private data_nasc: string,
    private turma_id: string
  ){
    this.id = id
    this.nome = nome
    this.email = email
    this.data_nasc = data_nasc
    this.turma_id = turma_id
  }

    //GETTERS
  
    public getId(){
      return this.id
    }
  
    public getNome(){
      return this.nome
    }
  
    public getEmail(){
      return this.email
    }

    public getDataNasc(){
        return this.data_nasc
      }

    public getIdTurma(){
        return this.turma_id
    }


    //SETTERS
  
    public setId(newId: string){
      this.id = newId
    }
  
    public setNome(newNome: string){
      this.nome = newNome
    }
  
    public setEmail(newEmail: string){
      this.email = newEmail
    }

    public setDataNasc(newDate: string){
        this.data_nasc = newDate
      }

    public setIdTurma(newGang: string){
        this.turma_id = newGang
    }
  }