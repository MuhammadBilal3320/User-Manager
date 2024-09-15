import { Router } from "express";
import { check, validationResult } from 'express-validator';
import dataSchema from '../../models/dataSchema.js';
import fetchUser from "../../middleware/fetchUser.js";
import encryptString from "../../protector/encryption.js";

const router = Router();

router.post('/createData', fetchUser,
    [
        check('dataImage').optional().isString().withMessage('Data Image must be a string'),
        check('title').optional().isString().withMessage('Title must be a string'),
        check('emailOrUser').optional().isString().withMessage('Email/Username must be a string')
            .isLength({ min: 3 }).withMessage('Email/Username must be at least 3 characters long'),
        check('password').optional().isString().withMessage('Password must be a string')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        check('message').optional().isString().withMessage('Message must be a string'),
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { dataImage, title, emailOrUser, password, message } = req.body;

            if (!emailOrUser && !password) {
                return res.status(400).send({ message: "At least one of Email/Username or Password must be provided!" });
            }

            const encodedEmailOrUser = emailOrUser ? encryptString(emailOrUser) : null;
            const encodedPassword = password ? encryptString(password) : null;

            const newData = new dataSchema({
                userID: req.user.id,
                dataImage: dataImage || null,
                title: title || null,
                emailOrUser: encodedEmailOrUser,
                password: encodedPassword,
                message: message || null
            });

            await newData.save();
            res.status(200).send({ message: "Data saved successfully" });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Internal Server Error!" });
        }

    });

export default router;
