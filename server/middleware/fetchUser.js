import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const fetchUser = (req, res, next)=>{
    try {

        const token = req.header('authToken');
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied!' });
        }
        
        const verified = jsonwebtoken.verify(token, process.env.REAL_SECRET_JWT);

        if (!verified) {
            return res.status(401).json({ message: 'Token is not valid, authorization denied!' });
        }

        req.user = verified;
        next();

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}

export default fetchUser;