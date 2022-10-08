import express from 'express'
import cors from 'cors'
import { AddressInfo } from "net";
import { createTurma } from '../endpoints/createTurma';
import { editTurma } from "../endpoints/editTurma"
import { getTurma } from '../endpoints/GetTurmasActivates';
import { createEstudante } from '../endpoints/createEstudante';

const app = express()
app.use(express.json())
app.use(cors())

app.post("/turma", createTurma)
app.put("/turma", editTurma)
app.post("/estudante", createEstudante)
app.get("/getTurmaActives", getTurma )

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
     const address = server.address() as AddressInfo;
     console.log(`Server is running in http://localhost: ${address.port}`);
  } else {
     console.error(`Failure upon starting server.`);
  }
});

export default app;
