import * as fs from "fs/promises";
const DINOS_FILE = "./dinos.json";
const CATEGORY_FILE ="./categories.json";
const DIETS_FILE = "./diets.json";
const SIZES_FILE = "./sizes.json";

//write the API calls

//Get the list of all products with the most important information only (dinoId, productName, diet and size) /products
export async function getAllDinos() {
  try {
    let dinosTxt = await fs.readFile(DINOS_FILE);
    let dinos = JSON.parse(dinosTxt);
    dinos.forEach(dino => 
      (delete dino.era, 
      delete dino.latinName, 
      delete dino.imageName1, 
      delete dino.imageName2, 
      delete dino.imageName3, 
      delete dino.manufacturer, 
      delete dino.dna, 
      delete dino.lenght, 
      delete dino.height, 
      delete dino.weight, 
      delete dino.difficulty, 
      delete dino.description ));
    return dinos;
    //TODO: return only important info!!!!!!!!!
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




//FUNCTIONS//




// test function for dinos ID. Used in getDinoByID DONE
function findDinoByID(dinoArray, Id) {
    return dinoArray.findIndex(
      (currDino) => currDino.dinoId === Id
    );
}


// Get the list of all product categories (size and diet) DONE
export async function getAllCategories(){
    let categories = await getCategories();
    categories.forEach((category) => (delete category.categoryId, delete category.subcategories));
    return categories;
}

// Get a product for a given ID with all details /products/{id} DONE
export async function getDinoByID(dinoId) {
    let dinoArray = await getAllDinos();
    let index = findDinoByID(dinoArray, dinoId);
    if (index === -1)
      throw new Error(`Dino with ID:${dinoId} doesn't exist`);
    else return dinoArray[index];
}

// Get the list of all products assigned to this subcategory with the most important information only /size/:size/products DONE
// test function for category name
function findSize(dinoArray, size){
  return dinoArray.findIndex((currDino) => currDino.size === size)
}

// get product by size
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

// get product by diet
export async function getDinoByDiet(diet) {
  let dinoArray = await getAllDinos();
  let index = findDiet(dinoArray, diet);
  if (index === -1)
    throw new Error(`Diet:${diet} doesn't exist`);
  else return dinoArray.filter(
    (currDino) => currDino.diet.includes(diet) 
  );
}



// Create a new basket for the costumer of a given ID

// Add a product to an existing basket for a specific customer

// Remove a product from an existing basket for a specific customer

// Get the list of all products assigned to the basket for a specific customer