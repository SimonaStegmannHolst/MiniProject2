// index.js
import express from 'express'
//import {getAllDinos, postCustomer, getDino, putCustomer, deleteCustomer } from './dinos.controller.js'
import {getAllDinos, getDino,  getAllCategories, getDinoBySize, getDinoByDiet, postBasketForUser} from './dinos.controller.js'

export const dinosRouter = express.Router();

// middleware specific to this route
dinosRouter.use(express.json())

// route handlers ADD MORE
dinosRouter.get("/velocishop/products", getAllDinos);
dinosRouter.get("/velocishop/products/:id", getDino);
dinosRouter.get("/velocishop/categories", getAllCategories);
dinosRouter.get("/velocishop/size/:size/products", getDinoBySize); 
dinosRouter.get("/velocishop/diet/:diet/products", getDinoByDiet); 
dinosRouter.post("/velocishop/customers/:id/baskets", postBasketForUser);