import { Router } from "express";
import dataSchema from '../../models/dataSchema.js';
import fetchUser from "../../middleware/fetchUser.js";
import encryptString from '../../protector/encryption.js';

const router = Router();

router.put('/updateData/:id', fetchUser, async (req, res) => {
    try {
        const { title, emailOrUser, password, message } = req.body;

        const deleteData = await dataSchema.findById(req.params.id);

        if (!deleteData) {
            return res.status(404).json({ message: "Data not found!" });
        }

        
        if (deleteData.userID.toString() !== req.user.id) {
            return res.status(403).send({ message: "Unauthorized" });
        }

        let updateData = {};

        if (title) {
            updateData.title = title;
        }

        if (emailOrUser) {
            updateData.emailOrUser = encryptString(emailOrUser);
        }

        if (password) {
            updateData.password = encryptString(password);
        }

        if (message) {
            updateData.message = message;
        }

        await dataSchema.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true });
        res.status(200).send({ message: "Data Updated successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
});

export default router;
