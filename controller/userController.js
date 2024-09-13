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
        let { name, surname, email, password} = req.body;
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
        let { name, surname, role, email, password} = req.body;
        
        let user = await getUserIdDB(req.params.id); // Ensure this is using `getUserIdDB` as it should match the ID
        if (user) {
            name ? name = name: name = user.firstName;
            surname ? surname = surname: surname = user.lastName;
            role ? role = role: role = user.userRole;
            email ? email = email: email = user.email;
            password ? password = password: password = user.password;

            await updateUserDB(req.params.id, name, surname, role, email, password);
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
            token: req.body.token,
            role: req.body.userRole
        });
    } catch (error) {
        res.status(500).send('Error during login');
    }
};


export {getUsers, getUser, insertUser, deleteUser, updateUser, loginUser, getUserId}