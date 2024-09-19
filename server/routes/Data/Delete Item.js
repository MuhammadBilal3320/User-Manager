import { Router } from "express";
import dataSchema from '../../models/dataSchema.js';
import deletedSchema from '../../models/deletedSchema.js';
import fetchUser from "../../middleware/fetchUser.js";

const router = Router();

router.post("/deleteItem/:id", fetchUser,async (req, res) => {
    try {
        
        const item = await dataSchema.findById(req.params.id);
        
        if (!item) return res.status(404).json({ message: "Item not found!" });

        await deletedSchema.create({...item._doc, deletedAt: new Date() });
        await dataSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Item deleted successfully!" });
    

    } catch (error) {
        console.log(error.message);
    }
})

export default router;
