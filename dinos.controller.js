import * as dinoModel from "./dinos.model.js";

//write functions

export async function getAllDinos(req, res) {
    try {
        let allDinos = await dinoModel.getAllDinos();
        res.json(allDinos);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

export async function getDino (req, res) {
    try {
      let id = parseInt(req.params.id)
      let dino = await dinoModel.getDinoByID(id);
      res.json(dino);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
}

export async function getAllCategories(req, res) {
  try {
      let allCategories = await dinoModel.getAllCategories();
      res.json(allCategories);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

export async function getDinoBySize (req, res) {
  try {
    let size = req.params.size
    let dino = await dinoModel.getDinoBySize(size);
    res.json(dino);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

export async function getDinoByDiet (req, res) {
  try {
    let diet = req.params.diet
    let dino = await dinoModel.getDinoByDiet(diet);
    res.json(dino);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}
