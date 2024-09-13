import { compare } from 'bcrypt';
import { getUserDB } from '../model/userDB.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

config();

const checkUser = async (req, res, next) => {
    const { email, password } = req.body;
    
    try {
        let user = await getUserDB(email);
        console.log("userRole:", user.userRole);
        

        if (!user) {
            return res.status(404).send("User not found");
        }

        console.log("User found:", user); // Debug log

        let hashedPassword = user.password;
        
        console.log("Provided password:", password); // Debug log
        console.log("Hashed password from DB:", hashedPassword); // Debug log

        if (!password || !hashedPassword) {
            throw new Error("Missing password or hashed password");
        }

        let result = await compare(password, hashedPassword);

        if (result) {
            let token = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '1h' });
            console.log("Generated token:", token); // Debug log
            req.body.token = token;
            req.body.userRole = user.userRole;
            next();
        } else {
            res.status(401).send("Password is incorrect");
        }
    } catch (error) {
        console.error("Error in checkUser:", error);
        res.status(500).send("Internal server error: " + error.message);
    }
};

const verifyAToken = (req, res, next) => {
    console.log('Headers:', req.headers); // Log all headers to debug

    // Retrieve cookies from headers
    const cookie = req.headers.cookie;
    
    if (!cookie) {
        console.log('No cookies found in headers');
        return res.status(401).json({ message: 'No token provided' });
    }
    
    // Extract token from cookies
    let token;
    const cookies = cookie.split(';');
    const tokenCookie = cookies.find(c => c.trim().startsWith('token='));
    if (tokenCookie) {
        token = tokenCookie.split('=')[1];
    }
    
    if (!token) {
        console.log('Token not found in cookies');
        return res.status(401).json({ message: 'No token provided' });
    }
    
    // Verify the token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log('Token verification failed:', err);
            return res.status(403).json({ message: 'Token has expired or is invalid' });
        }
        req.user = decoded.username;
        console.log('Authenticated user:', req.user);
        next();
    });
};

export {checkUser, verifyAToken}