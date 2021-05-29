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

export async function postBasketForUser(req, res) {
  try {
    let newBasket = req.body;
    let id = req.params.id; //id is from router specification
    await dinoModel.addBasketForUser(newBasket, id);
    res.end()
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

export async function postCustomer(req, res) {
  try {
    let newCustomer = req.body;
    await dinoModel.addCustomer(newCustomer);
    res.end()
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

export async function putBasketItem (req, res) {
  try {
    let productId = parseInt(req.params.productId);
    let basketId = (req.params.basketId);
    await dinoModel.updateBasket(productId, basketId); 
    res.end();
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

export async function deleteProduct (req, res) {
  try {
    let productId = parseInt(req.params.productId);
    let basketId = (req.params.basketId);
    console.log("this is baskedID in controller: " + basketId)
    await dinoModel.removeProduct(productId, basketId);
    res.end();
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

export async function getProductsInBasket (req, res) {
  try {
    let basketId = (req.params.basketId);
    let products = await dinoModel.getProductsInBasket(basketId);
    res.json(products);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

export async function getCustomer (req, res) {
  try {
    let id = (req.params.id)
    let customer = await dinoModel.getCustomerByID(id);
    res.json(customer);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}