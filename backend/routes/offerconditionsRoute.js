const express = require("express");
const multer = require("multer");
const fs = require('fs');

const OfferConditions = require("../models/offerconditions");

const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid  = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if(isValid){
            error = null;
        }
        cb(error, "backend/images/offersconditions");
    },
    filename: (req, file, cb) =>{
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext)
    }
})

router.post("", multer({storage: storage}).single("image"), (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const offerconditions = new OfferConditions({
        description: req.body.description,
        imagePath: url + "/images/offersconditions/" + req.file.filename,
        created: req.body.created
    });
    offerconditions.save().then(createdOfferConditions => {
        res.status(201).json({
            message: "Offer conditions added successfully",
            offerConditions: {
                ...createdOfferConditions,
                id: createdOfferConditions._id
            }
        });
    });
});

router.get("",(req, res, next) => {
    try{
        OfferConditions.find().then(documents => {
            res.status(200).json({
                message: "offer conditions fetched successfully",
                offerConditions: documents
            });
        });        
    } catch (error) {
        console.error(error);
    }

});

router.delete("/:id", (req, res, next) => {
    try{
        OfferConditions.deleteOne({ _id: req.params.id }).then(result => {
            console.log(result);
            res.status(200).json({ message: "Offer conditions deleted!" });
        });
    } catch (error){
        console.error(error);
    }
});

module.exports = router;