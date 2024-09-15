import { Router } from 'express';
import dotenv from 'dotenv';
import fetchUser from '../../middleware/fetchUser.js';
dotenv.config();

const router = Router();

router.get('/userDetails', fetchUser,async (req, res) => {

        try {
            const {userName, email} = req.user;
            
            
            res.status(200).send({ message: 'Details Received!', userName, email } );

        } catch (error) {
            return res.status(500).send({ message: "Internal Server Error!" });
        }
    })

export default router;
