import express from 'express'
import cors from 'cors'
import { AddressInfo } from "net";
import { createTurma } from '../endpoints/createTurma';
import { editTurma } from "../endpoints/editTurma"
import { editTurmaEstudante } from '../endpoints/editTurmaEstudante';
import { editTurmaDocente } from '../endpoints/editTurmaDocente';

import { getTurma } from '../endpoints/getTurmasActivates';
import { getEstudante } from '../endpoints/getEstudante';
import { getDocente } from '../endpoints/getDocente';
import { createEstudante } from '../endpoints/createEstudante';

const app = express()
app.use(express.json())
app.use(cors())

app.post("/turma", createTurma)
app.put("/turma", editTurma)
app.put("/editTurmaDocente", editTurmaDocente)
app.put("/editTurmaEstudante", editTurmaEstudante)

app.get("/docente", getDocente)

app.post("/estudante", createEstudante)
// app.post("/createDocente", createDocente)
app.get("/getTurmaActives", getTurma )
app.get("/getEstudanteByName", getEstudante)

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
     const address = server.address() as AddressInfo;
     console.log(`Server is running in http://localhost: ${address.port}`);
  } else {
     console.error(`Failure upon starting server.`);
  }
});

export default app;
