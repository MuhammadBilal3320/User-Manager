import { Router } from 'express';
import userSchema from '../../models/userSchema.js';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator'; 
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

const router = Router();

router.post('/createUser',
    [
        body('userName').notEmpty().withMessage('User Name is required').isLength({ min: 3 }).withMessage('User Name must be at least 3 characters long'),
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password').notEmpty().withMessage("Please Enter Password").isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {

            const { userName, email, password } = req.body;

            if (!userName || !email || !password) {
                return res.status(400).json({ message: 'Incomplete Data Entered!' });
            }

            let ExistOrNot = await userSchema.findOne({ userName: userName });
            if (ExistOrNot) {
                return res.status(400).json({ message: 'User Name already Exists!' });
            }

            ExistOrNot = await userSchema.findOne({ email: email });
            if (ExistOrNot) {
                return res.status(400).json({ message: 'Email already Exists!' });
            }

            const userPassword = password + process.env.PASSWORD_CHANGER;
            const salt = await bcrypt.genSalt(12);
            const secretPassword = await bcrypt.hash(userPassword, salt);

            const newUser = new userSchema({
                userName: userName,
                email: email,
                password: secretPassword
            });

            await newUser.save();

            const authData = {
                id: newUser._id,
                userName: newUser.userName,
                email: newUser.email
            }

            const authToken = jsonwebtoken.sign(authData, process.env.REAL_SECRET_JWT);

            res.status(201).json({ message: 'User Created Successfully!', authToken: authToken });

        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal Server Error!" });
        }
    })

export default router;
