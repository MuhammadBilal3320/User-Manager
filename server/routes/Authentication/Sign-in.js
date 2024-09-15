import { Router } from 'express';
import userSchema from '../../models/userSchema.js';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator'; 
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

const router = Router();

router.post('/loginUser',
    [
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password').notEmpty().withMessage("Please Enter Password").isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {

            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Incomplete Data Entered!' });
            }

            let ExistOrNot = await userSchema.findOne({ email: email });
            if (!ExistOrNot) {
                return res.status(401).json({ message: 'Please Enter Correct Credentials!' });
            }

            const userPassword = password + process.env.PASSWORD_CHANGER;
            const secretPassword = await bcrypt.compare(userPassword, ExistOrNot.password);
            if (!secretPassword) {
                return res.status(401).json({ message: 'Please Enter Correct Credentials!' });
            }

            const authData = {
                id: ExistOrNot._id,
            }

            const authToken = jsonwebtoken.sign(authData, process.env.REAL_SECRET_JWT);

            res.status(201).json({ message: 'Login User Successfully!', authData: authToken });

        } catch (error) {
            return res.status(500).send({ message: "Internal Server Error!" });
        }
    })

export default router;
