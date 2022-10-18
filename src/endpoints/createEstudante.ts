import { Request, Response } from "express";
import { EstudantesDataBase } from "../dataBase/EstudanteDataBase";
import { Estudante } from "../models/Estudante";
import { EstudanteHobby } from "../models/EstudanteHobby";
import { Hobby } from "../models/Hobby";

export const createEstudante = async (req: Request, res: Response) => {
  try {
    let {nome, email, data_nasc, hobbies} = req.body

    if(!nome || !email || !data_nasc || !hobbies) {
      res.status(422)
      throw new Error("Parâmetros obrigatórios incompletos!");
    }

    const dataRgx: any = /(\d{2})[-.\/](\d{2})[-.\/](\d{4})/
    if (!dataRgx.test(data_nasc)) {
      res.status(422);
      throw new Error("Digite a data de nascimento da seguinte maneira (DD/MM/AAAA)");
    };

    const emailRgx = /\S+@\S+\.\S+/;
    if (!emailRgx.test(email)) {
      res.status(422);
      throw new Error("Digite o email da seguinte maneira (email@email.com)");
    };

    const ESTUDANTE = new EstudantesDataBase()
    const IDS = Date.now()

    data_nasc = data_nasc.split("/").reverse().join("/")

    const newEstudante = new Estudante(
      Date.now().toString(),
      nome,
      email,
      data_nasc,
      "0"
    )

    await ESTUDANTE.createEstudante(newEstudante)

    if(hobbies.includes(",")) {
      hobbies = hobbies.split(",")

      hobbies.forEach(async (hobbyName: string) => {
        const HOBBY_ID = Date.now().toString()
        const ESTUDANTE_HOBBIES_ID = Date.now().toString()
        const getHobby = await ESTUDANTE.getHobby(hobbyName)

        if(!getHobby.length) {
          const newHobby = new Hobby(
            HOBBY_ID,
            hobbyName
          );

          await ESTUDANTE.createHobby(newHobby);
        };

        const newEstudanteHobby = new EstudanteHobby(
          ESTUDANTE_HOBBIES_ID,
          IDS.toString(),
          HOBBY_ID
        )
        await ESTUDANTE.createEstudanteHobby(newEstudanteHobby)

        data_nasc = data_nasc.split("/").reverse().join("/")

        const newEstudante = new Estudante(
          Date.now().toString(),
          nome,
          email,
          data_nasc,
          "0"
        )

        await ESTUDANTE.createEstudante(newEstudante)

        res.status(201).send({message: "Estudante criado com sucesso!"})
      });
    }
    
    const HOBBY_ID = Date.now().toString()
    const ESTUDANTE_HOBBIES_ID = Date.now().toString()
    const getHobby = await ESTUDANTE.getHobby(hobbies)

    if(!getHobby.length) {
      const newHobby = new Hobby(
        HOBBY_ID,
        hobbies
      );

      await ESTUDANTE.createHobby(newHobby);
    };

    const newEstudanteHobby = new EstudanteHobby(
      ESTUDANTE_HOBBIES_ID,
      IDS.toString(),
      HOBBY_ID
    )
    await ESTUDANTE.createEstudanteHobby(newEstudanteHobby)

    res.status(201).send({message: "Estudante criado com sucesso!"})
  } catch (error: any) {
    res.send(error.message || error.sqlMessage)
  }
}
