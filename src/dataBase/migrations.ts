import connection from "./connection";

const createTable = async () => {
  try {
    await connection.raw(`
      CREATE TABLE IF NOT EXISTS Turma(
        id VARCHAR(255) PRIMARY KEY,
        nome VARCHAR(255),
        modulo VARCHAR(255) DEFAULT 0
      );
      
      CREATE TABLE IF NOT EXISTS Estudantes(
        id VARCHAR(255) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        data_nasc DATE NOT NULL,
        turma_id VARCHAR(255) NOT NULL,
        FOREIGN KEY (turma_id) REFERENCES Turma(id)
      );
      
      CREATE TABLE IF NOT EXISTS Hobbies(
        id VARCHAR(255) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL UNIQUE
      );
      
      CREATE TABLE IF NOT EXISTS Estudante_hobbies(
        id VARCHAR(255) PRIMARY KEY,
        estudante_id VARCHAR(255) NOT NULL,
        hobby_id VARCHAR(255) NOT NULL,
        FOREIGN KEY (estudante_id) REFERENCES Estudantes(id),
        FOREIGN KEY (hobby_id) REFERENCES Hobbies(id)
      );
      
      CREATE TABLE IF NOT EXISTS Docente(
        id VARCHAR(255) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        data_nasc DATE NOT NULL,
        turma_id VARCHAR(255) NOT NULL,
        FOREIGN KEY (turma_id) REFERENCES Turma(id)
      );
      
      CREATE TABLE IF NOT EXISTS Especialidades(
        id VARCHAR(255) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL UNIQUE
      );
      
      CREATE TABLE IF NOT EXISTS Docente_especialidades(
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
    INSERT INTO Hobby (id,name)
     VALUE(1, 'Coding'),
          (2, 'Read books'),
          (3, 'watch tv show'),
          (4, 'listen to music');

    INSERT INTO Especialidades (id,name)
    VALUE(1, 'Javascript'),
         (2, 'CSS'),
         (3, 'React'),
         (4, 'Typescript'),
         (5, 'Python');
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
