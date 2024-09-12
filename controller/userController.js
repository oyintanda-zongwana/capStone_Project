import {getUsersDB, getUserDB, insertUserDB, deleteUserDB, updateUserDB, getUserIdDB} from '../model/userDB.js'
import {hash} from 'bcrypt'

let getUsers = async(req, res) => {
    res.json(await getUsersDB());
}

let getUserId = async (req, res) => {
    try {
        let user = await getUserIdDB(req.params.id);
        if (user) {
            res.json(user); // No change here, as this still returns a single user object
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving user');
    }
};

let getUser = async (req, res) => {
    try {
        let user = await getUserDB(req.params.email);
        if (user) {
            res.json(user); // No change here, as this still returns a single user object
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving user');
    }
};

let insertUser = async (req, res) => {    
    try {
        let { name, surname, age, gender, role, email, password, profile } = req.body;
        let hashedP = await hash(password, 10);
        await insertUserDB(name, surname,  email, hashedP);
        res.send('Data was inserted successfully');
    } catch (error) {
        console.log(error);
        
        res.status(500).send('Error inserting user');
    }
};   

let deleteUser = async (req, res) => {
    try {
        let result = await deleteUserDB(req.params.id);
        if (result.affectedRows > 0) {
            res.send('User was deleted successfully');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Error deleting user');
    }
};

let updateUser = async (req, res) => {
    try {
        let { name, surname, age, gender, role, email, password, profile } = req.body;
        
        let user = await getUserIdDB(req.params.id); // Ensure this is using `getUserIdDB` as it should match the ID
        if (user) {
            name = name || user.firstName;
            surname = surname || user.lastName;
            age = age || user.userAge;
            gender = gender || user.gender;
            role = role || user.userRole;
            email = email || user.email;
            password = password || user.password;
            profile = profile || user.userProfile;

            await updateUserDB(req.params.id, name, surname, age, gender, role, email, password, profile);
            res.send('Data has been updated successfully');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Error updating user');
    }
};

const loginUser = (req, res) => {
    try {
        res.send({
            message: "You have signed in successfully", 
            token: req.body.token
        });
    } catch (error) {
        res.status(500).send('Error during login');
    }
};


export {getUsers, getUser, insertUser, deleteUser, updateUser, loginUser, getUserId}