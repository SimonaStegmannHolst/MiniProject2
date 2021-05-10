import * as fs from "fs/promises";
const DINOS_FILE = "./dinos.json";
const CATEGORY_FILE ="./categories.json";
const CUSTOMERS_FILE ="./costumers.json";
const BASKETS_FILE ="./baskets.json";

//write the API calls

//Get the list of all products with the most important information only (dinoId, productName, diet and size) /products
export async function getDinos() {
  try {
    let dinosTxt = await fs.readFile(DINOS_FILE);
    let dinos = JSON.parse(dinosTxt);
    return dinos;
  } catch (err) {
    if (err.code === "ENOENT") {
      // file does not exits
      await saveDinos([]); // create a new file with empty array
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw err;
  }
}

// save array of dinos to file. Function used in function getAllDinos
async function saveDinos(dinos = []) {
  let dinosTxt = JSON.stringify(dinos);
  await fs.writeFile(DINOS_FILE, dinosTxt);
}


//Get the list of all categories
export async function getCategories() {
  try {
    let categoriesTxt = await fs.readFile(CATEGORY_FILE);
    let categories = JSON.parse(categoriesTxt);
    return categories;
    
  } catch (err) {
    if (err.code === "ENOENT") {
      // file does not exits
      await saveCategories([]); // create a new file with empty array
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw err;
  }
}

// save array of categories to file. Function used in function getAllCategories
async function saveCategories(categories = []) {
  let categoriesTxt = JSON.stringify(categories);
  await fs.writeFile(CATEGORY_FILE, categoriesTxt);
}

//Get the list of all customers
export async function getCustomers() {
  try {
    let customersTxt = await fs.readFile(CUSTOMERS_FILE);
    let customers = JSON.parse(customersTxt);
    return customers;
    
  } catch (err) {
    if (err.code === "ENOENT") {
      // file does not exits
      await saveCustomers([]); // create a new file with empty array
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw err;
  }
}

// save array of customers to file. Function used in function getCustomers
async function saveCustomers(customers = []) {
  let customersTxt = JSON.stringify(customers);
  await fs.writeFile(CUSTOMERS_FILE, customersTxt);
}

//Get the list of all baskets
export async function getBaskets() {
  try {
    let basketsTxt = await fs.readFile(BASKETS_FILE);
    let baskets = JSON.parse(basketsTxt);
    return baskets;
    
  } catch (err) {
    if (err.code === "ENOENT") {
      // file does not exits
      await saveBaskets([]); // create a new file with empty array
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw err;
  }
}

// save array of baskets to file. Function used in function getBaskets
async function saveBaskets(baskets = []) {
  let basketsTxt = JSON.stringify(baskets);
  await fs.writeFile(BASKETS_FILE, basketsTxt);
}









//FUNCTIONS//





// Get the list of all product dinos with most important information only
export async function getAllDinos(){
  let dinoArray = await getDinos();
  dinoArray.forEach((dino) => (delete dino.era, 
    delete dino.latinName, 
    delete dino.imageName1, 
    delete dino.imageName2, 
    delete dino.imageName3, 
    delete dino.manufacturer, 
    delete dino.dna, 
    delete dino.categories,
    delete dino.lenght, 
    delete dino.height, 
    delete dino.weight, 
    delete dino.length,
    delete dino.difficulty, 
    delete dino.description,
    delete dino.cardDescription));
  return dinoArray;
}


// test function for dinos ID. Used in getDinoByID DONE
function findDinoByID(dinoArray, Id) {
    return dinoArray.findIndex(
      (currDino) => currDino.dinoId === Id
    );
}
// Get a product for a given ID with all details /products/{id} DONE
export async function getDinoByID(dinoId) {
  let dinoArray = await getAllDinos();
  let index = findDinoByID(dinoArray, dinoId);
  if (index === -1)
    throw new Error(`Dino with ID:${dinoId} doesn't exist`);
  else return dinoArray[index];
}


// Get the list of all product categories (size and diet) DONE
export async function getAllCategories(){
    let categories = await getCategories();
    categories.forEach((category) => (delete category.categoryId));
    return categories;
}



// Get the list of all products assigned to this subcategory with the most important information only /size/:size/products DONE
// test function for category name DONE
function findSize(dinoArray, size){
  return dinoArray.findIndex((currDino) => currDino.size === size)
}

// get product by size DONE
export async function getDinoBySize(size) {
  let dinoArray = await getAllDinos();
  let index = findSize(dinoArray, size);
  if (index === -1)
    throw new Error(`Size:${size} doesn't exist`);
  else return dinoArray.filter(
    (currDino) => currDino.size.includes(size) 
  );
}

// Get the list of all products assigned to this subcategory with the most important information only /diet/:diet/products DONE
// test function for category name
function findDiet(dinoArray, diet){
  return dinoArray.findIndex((currDino) => currDino.diet === diet)
}

// get product by diet DONE
export async function getDinoByDiet(diet) {
  let dinoArray = await getAllDinos();
  let index = findDiet(dinoArray, diet);
  if (index === -1)
    throw new Error(`Diet:${diet} doesn't exist`);
  else return dinoArray.filter(
    (currDino) => currDino.diet.includes(diet) 
  );
}



// Create a new basket for the costumer of a given ID /customers/{id}/baskets

// test function for basket ID. Used in addBasketForUser DONE
function findBasketByID(basketArray, Id) {
  return basketArray.findIndex(
    (currBasket) => currBasket.Id === Id
  );
}


// create a new basket for a specific user DONE
export async function addBasketForUser(newBasket, id) {
  let basketArray = await getBaskets();
  if(newBasket.Id != id){
    console.log("did not equal id")
    newBasket.Id = parseInt(id);
  }
  if(newBasket.customerId != id){
    console.log("did not equal customer id")
    newBasket.customerId = parseInt(id);
  }

  if (findBasketByID(basketArray, newBasket.Id) !== -1 )
    throw new Error(
      `Basket with Id:${newBasket.Id} already exists`
    );
  basketArray.push(newBasket);
  await saveBaskets(basketArray);
}



// Add a product to an existing basket for a specific customer DONE
// test function for basket ID. Uses .find rather than .findIndex, to return the whole obejct and not just the index. Used in updateBasket DONE
function findBasketById(basketArray, Id) {
  return basketArray.find(
    (currBasket) => currBasket.Id === Id
  );
}
// update existing basket with a new product DONE
export async function updateBasket(productId, basketId) {
  let basketArray = await getBaskets();
  
  let index = findBasketById(basketArray, basketId); // findIndex
  if (index === -1)
    throw new Error(`Basket with ID:${basketId} doesn't exist`);
  else {
    index.products.push(productId);
    await saveBaskets(basketArray);
  }
}


// Remove a product from an existing basket for a specific customer
export async function removeProduct(basketId, productId) {
  let basketArray = await getBaskets();
  let index = findBasketById(basketArray, basketId); // findIndex
  if (index === -1)
    throw new Error(`Basket with ID:${basketId} doesn't exist`);
  else {
    for( var i = 0; i < index.products.length; i++){ 
      if (index.products[i] === productId) { 
  
          index.products.splice(i, 1); 
      }
  }
    await saveBaskets(basketArray);
  }
}



// Get the list of all products assigned to the basket for a specific customer
export async function getProductsInBasket(basketId) {
  let basketArray = await getBaskets();
  let index = findBasketById(basketArray, basketId);
  if (index === -1)
    throw new Error(`Basket with ID:${basketId} doesn't exist`);
  else return index.products;
}









//Extra functions that are not a requirement

// test function for customers ID. Used in getCustomersById
function findCustomersByID(customerArray, Id) {
  return customerArray.findIndex(
    (currCustomer) => currCustomer.Id === Id
  );
}

// Get a customer for a given ID with all details NOT USED YET
export async function getCustomerByID(Id) {
  let customerArray = await getCustomers();
  let index = findCustomersByID(customerArray, Id);
  if (index === -1)
    throw new Error(`Customer with ID:${Id} doesn't exist`);
  else return customerArray[index];
}

// create a new customer
export async function addCustomer(newCustomer) {
  let customerArray = await getCustomers();

  if(newCustomer.basketId != newCustomer.Id){
    console.log("did not equal id")
    newCustomer.basketId = (newCustomer.Id);
  }

  if (findCustomersByID(customerArray, newCustomer.Id) !== -1 )
    throw new Error(
      `Customer with Id:${newCustomer.Id} already exists`
    );
  customerArray.push(newCustomer);
  await saveCustomers(customerArray);
}