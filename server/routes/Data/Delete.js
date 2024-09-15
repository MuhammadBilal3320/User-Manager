import { Router } from "express";
import dataSchema from '../../models/dataSchema.js';
import { check, validationResult } from 'express-validator';
import fetchUser from "../../middleware/fetchUser.js";

const router = Router();

router.delete('/deleteData/:id',fetchUser,
    [
        check('id').isMongoId().withMessage('Invalid ID format'),
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {

            const deleteData = await dataSchema.findById(req.params.id);
            
            if (!deleteData) {
                return res.status(404).json({ message: "Data not found!" });
            }
            
            if(deleteData.userID.toString() !== req.user.id) {
                console.log("THis is deletedata",deleteData.userID)
                console.log("THis is req.userid",req.user.id)
                return res.status(403).json({ message: "You are not authorized to delete this data!" });
            }

            await dataSchema.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Data Deleted successfully" });

        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
    });

export default router;
