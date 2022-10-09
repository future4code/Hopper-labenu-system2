import express from 'express'
import cors from 'cors'
import { AddressInfo } from "net";
import { createTurma } from '../endpoints/createTurma';
import { editTurma } from "../endpoints/editTurma"
import { getTurma } from '../endpoints/getTurmasActivates';
import { createEstudante } from '../endpoints/createEstudante';
import { pegarEstudantes } from '../endpoints/getEstudanteNome';
import { editTurmaEstudante } from '../endpoints/editTurmaEstudante';
import { createDocente } from '../endpoints/createDocente';
import { editTurmaDocente } from '../endpoints/editTurmaDocente';
import { getDocente } from '../endpoints/getDocente';

const app = express()
app.use(express.json())
app.use(cors())

app.post("/turma", createTurma)
app.put("/turma", editTurma)
app.get("/docente", getDocente)

app.post("/estudante", createEstudante)
app.get("/getTurmaActives", getTurma )
app.get("/getEstudanteByName", pegarEstudantes)
app.put("/editTurmaEstudante", editTurmaEstudante)
app.post("/createDocente", createDocente)
app.put("/editTurmaDocente", editTurmaDocente)

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
     const address = server.address() as AddressInfo;
     console.log(`Server is running in http://localhost: ${address.port}`);
  } else {
     console.error(`Failure upon starting server.`);
  }
});

export default app;
