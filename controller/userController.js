import {getUsersDB, getUserDB, insertUserDB, deleteUserDB, updateUserDB, getUserIdDB} from '../model/userDB.js'
import {hash} from 'bcrypt'

let getUsers = async(req, res) => {
    res.json(await getUsersDB());
}

let getUser = async(req, res) => {
    res.json(await getUserDB(req.params.id));
}

let getUserId = async(req, res) => {
    res.json(await getUserIdDB(req.params.id));
}

let insertUser = async (req, res) => {    
    let {name, surname, age, code, car, eye, username, password} = req.body
    let hashedP = await hash(password, 10)
    // await insertUserDB(name, surname, age, code, car, eye, username, hashedP)
    res.send('data was inserted into successfully')
}   

let deleteUser = async(req, res) => {
    let {id} = req.body
    await deleteUserDB(req.params.id)
    res.send('peer was deleted into successfully')
}

let updateUser = async(req, res) => {
    let {name, surname, age, code, car, eye} = req.body
    
    let peer = await getUserDB(req.params.id)
    name ? name = name: name =  peer.name 
    surname ? surname = surname: surname =  peer.surname 
    age ? age = age: age =  peer.age 
    code ? code = code: code =  peer.fav_coding_lang 
    car ? car = car: car =  peer.fav_car 
    eye ? eye = eye: eye =  peer.eye_color 

    await updateUserDB(req.params.id, name, surname, age, code, car, eye)
    res.send('data has been updated successfully')
}

let loginUser = (req, res) => {
    res.send({
        message:"you have signed in successfully", 
        token:req.body.token})
}

export {getUsers, getUser, insertUser, deleteUser, updateUser, loginUser, getUserId}