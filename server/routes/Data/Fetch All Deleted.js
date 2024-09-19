import { Router } from "express";
import deletedSchema from '../../models/deletedSchema.js';
import fetchUser from "../../middleware/fetchUser.js";
import decodeString from "../../protector/decryption.js";

const router = Router();

router.get('/fetchDeletedAll', fetchUser, async (req, res) => {

    try {

        
        const data = await deletedSchema.find({ userID: req.user.id });

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No data found for this user!" });
        }

        const decryptedData = data.map(item => ({
            ...item.toObject(),
            emailOrUser: item.emailOrUser ? decodeString(item.emailOrUser) : null,
            password: item.password ? decodeString(item.password) : null,
        }));

        res.status(200).json(decryptedData);

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }

});

export default router;
