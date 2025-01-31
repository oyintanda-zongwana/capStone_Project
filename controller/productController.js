import {getProductsDB, getProductDB, insertProductDB, deleteProductDB, updateProductDB, addToCartDB} from '../model/productDB.js'
import {getUserIdDB} from '../model/userDB.js'
import {hash} from 'bcrypt'

let getProducts = async(req, res) => {
    res.json(await getProductsDB());
}

let getProduct = async(req, res) => {
    res.json(await getProductDB(req.params.id));
}

let insertProduct = async (req, res) => {    
    let {name, surname, age, code, car, eye, username, password} = req.body
    let hashedP = await hash(password, 10)
    await insertProductDB(name, surname, age, code, car, eye, username, hashedP)
    res.send('data was inserted into successfully')
}   

let deleteProduct = async(req, res) => {
    let {id} = req.body
    await deleteProductDB(req.params.id)
    res.send('peer was deleted into successfully')
}

let updateProduct = async(req, res) => {
    let {name, surname, age, code, car, eye} = req.body
    
    let peer = await getProductDB(req.params.id)
    name ? name = name: name =  peer.name 
    surname ? surname = surname: surname =  peer.surname 
    age ? age = age: age =  peer.age 
    code ? code = code: code =  peer.fav_coding_lang 
    car ? car = car: car =  peer.fav_car 
    eye ? eye = eye: eye =  peer.eye_color 

    await updateProductDB(req.params.id, name, surname, age, code, car, eye)
    res.send('data has been updated successfully')
}

let addToCart = async (req, res) => {
    console.log(req.body);
    let { id } = await getUserIdDB(req.body.user); // Get user ID from the database
    await addToCartDB(id, req.body.prodID); // Pass correct userID and productID
    res.json({ message: 'You have added an item to your cart' });
};

export {getProducts, getProduct, insertProduct, deleteProduct, updateProduct, addToCart}