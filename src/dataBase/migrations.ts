import connection from "./connection";

const createTable = async () => {
  try {
    await connection.raw(`
      DROP TABLE IF EXISTS Turma, Hobbies, Especialidades, Estudantes, Estudante_hobbies, Docente, Docente_especialidades;

      CREATE TABLE Turma(
        id VARCHAR(255) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        modulo VARCHAR(255) DEFAULT 0
      );
      
      CREATE TABLE Estudantes(
        id VARCHAR(255) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        data_nasc DATE NOT NULL,
        turma_id VARCHAR(255) NOT NULL,
        FOREIGN KEY (turma_id) REFERENCES Turma(id)
      );
      
      CREATE TABLE Hobbies(
        id VARCHAR(255) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL UNIQUE
      );
      
      CREATE TABLE Estudante_hobbies(
        id VARCHAR(255) PRIMARY KEY,
        estudante_id VARCHAR(255) NOT NULL,
        hobby_id VARCHAR(255) NOT NULL,
        FOREIGN KEY (estudante_id) REFERENCES Estudantes(id),
        FOREIGN KEY (hobby_id) REFERENCES Hobbies(id)
      );
      
      CREATE TABLE Docente(
        id VARCHAR(255) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        data_nasc DATE NOT NULL,
        turma_id VARCHAR(255) NOT NULL,
        FOREIGN KEY (turma_id) REFERENCES Turma(id)
      );
      
      CREATE TABLE Especialidades(
        id VARCHAR(255) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL UNIQUE
      );
      
      CREATE TABLE Docente_especialidades(
        id VARCHAR(255) PRIMARY KEY,
        docente_id VARCHAR(255) NOT NULL,
        especialidades_id VARCHAR(255) NOT NULL,
        FOREIGN KEY (docente_id) REFERENCES Docente(id),
        FOREIGN KEY (especialidades_id) REFERENCES Especialidades(id)
      );
    `)
    .then(() => {
      console.log("Tabela criada com sucesso!")
      insertData()
    })
    
  } catch (error: any) {
    console.log("Ocorreu um erro ao tentar criar tabela")
    console.log(error.sqlMessage)
  };
};



const insertData = async () => {
  try {
    await connection.raw(`
    
    INSERT INTO Turma (id, nome, modulo)
    VALUE ('1', 'Turma Hopper', '4'),
          ('2', 'Turma Hooks', '4'),
          ('3', 'Turma Lamar', '3'),
          ('4', 'Turma Gebru', '6');
    
    
    INSERT INTO Estudantes (id, nome, email, data_nasc, turma_id)
    VALUE ('1', 'Gabriel Oliveira', 'gabrielo@gmail.com', '1999/09/27', '1'),
          ('2', 'Gabriel Cândido', 'gabrielc@gmail.com', '1998/05/13', '1'),
          ('3', 'Giovana Martinho', 'giovana@gmail.com', '1999/07/11', '1'),
          ('4', 'Maurício Gonçalves', 'mauricio@gmail.com', '1989/03/15', '3'),
          ('5', 'Wictor Cardoso', 'wictor@gmail.com', '1993/07/19', '2'),
          ('6', 'Helaine Ribeiro', 'helaine@gmail.com', '1995/10/22', '4');
    

    INSERT INTO Hobbies (id,nome)
    VALUE('1', 'Coding'),
          ('2', 'Read books'),
          ('3', 'watch tv show'),
          ('4', 'listen to music');


    INSERT INTO Estudante_hobbies (id, estudante_id, hobby_id)
    VALUE('1', '1', '1'),
          ('2', '2', '1'),
          ('3', '1', '4'),
          ('4', '3', '2'),
          ('5', '3', '1'),
          ('6', '4', '1'),
          ('7', '5', '3'),
          ('8', '6', '2');


    INSERT INTO Docente (id, nome, email, data_nasc, turma_id)
    VALUE ('1', 'Luan Mello', 'luan@gmail.com', '1995/05/22', '1'),
          ('2', 'Pedro Saldanha', 'peu@gmail.com', '1996/05/19', '1'),
          ('3', 'Rodrigo', 'rodrigo@gmail.com', '1994/01/04', '2');


    INSERT INTO Especialidades (id,nome)
    VALUE(1, 'Javascript'),
         (2, 'CSS'),
         (3, 'React'),
         (4, 'Typescript'),
         (5, 'POO');

    
     INSERT INTO Docente_especialidades (id, docente_id, especialidades_id)
      VALUE('1', '1', '1'),
            ('2', '1', '3'),
            ('3', '2', '4'),
            ('4', '3', '4'),
            ('5', '2', '3');

    `)

  } catch (error: any) {
    console.log("error when entering data in the table")
    console.log(error.sqlMessage)
  } finally {
    console.log("ending connection!")
    return connection.destroy()
  };
};

createTable()

