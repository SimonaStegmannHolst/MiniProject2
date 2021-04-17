// index.js
import express from 'express'
//import {getAllDinos, postCustomer, getDino, putCustomer, deleteCustomer } from './dinos.controller.js'
import {getAllDinos, getDino,  getAllCategories, getDinoBySize, getDinoByDiet} from './dinos.controller.js'

export const dinosRouter = express.Router();

// middleware specific to this route
dinosRouter.use(express.json())

// route handlers ADD MORE
dinosRouter.get("/products", getAllDinos);
dinosRouter.get("/products/:id", getDino);
dinosRouter.get("/categories", getAllCategories);
dinosRouter.get("/size/:size/products", getDinoBySize); 
dinosRouter.get("/diet/:diet/products", getDinoByDiet); 