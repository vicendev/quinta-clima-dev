const express = require("express");
const multer = require("multer");
const fs = require('fs');

const Offer = require("../models/offer");

const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'application/pdf': 'pdf'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const url = req.get('host');
        let repository = "";

        if ( url == 'localhost:3000')
        {
            repository = "backend/images/offers"
        } else {
            repository = "images/offers"
        }

        const isValid  = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if(isValid){
            error = null;
        }
        cb(error, repository);
    },
    filename: (req, file, cb) =>{
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext)
    }
})

router.post("", multer({storage: storage}).any(), (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const offer = new Offer({
        title: req.body.title,
        price: req.body.price,
        imagePath: url + "/images/offers/" + req.files[0].filename,
        documentPath: url + "/images/offers/" + req.files[1].filename,
        created: req.body.created
    });
    offer.save().then(createdOffer => {
        res.status(201).json({
            message: "Offer added successfully",
            offer: {
                ...createdOffer,
                id: createdOffer._id
            }
        });
    });
});

router.put("/:id", multer({ storage: storage }).any(), (req, res, next) => {
    try{

        let imagePath = req.body.imagePath;
        let documentPath = req.body.documentPath;

        if(req.files) {
            const url = req.protocol + "://" + req.get("host");
            if(req.files[0].mimetype != 'application/pdf' && !req.files[1] ){
                imagePath = url + "/images/offers/" + req.files[0].filename;
            }
            else if(req.files[0].mimetype == 'application/pdf' && !req.files[1] ){
                documentPath = url + "/images/offers/" + req.files[0].filename;
            } else {
                imagePath = url + "/images/offers/" + req.files[0].filename;
                documentPath = url + "/images/offers/" + req.files[1].filename;
            }

        }

        const offer = new Offer({
            _id: req.body.id,
            title: req.body.title,
            price: req.body.price,
            imagePath: imagePath,
            documentPath: documentPath,
            created: req.body.created      
        });

        Offer.updateOne({ _id: req.params.id }, offer).then(result =>{
            res.status(200).json({message: "Update successful!" });
        });        
    } catch (error) {

    }

});

router.get("",(req, res, next) => {
    try{
        Offer.find().then(documents => {
            res.status(200).json({
                message: "offer fetched successfully",
                offer: documents
            });
        });        
    } catch (error) {
        console.error(error);
    }

});

router.get("/:id", (req, res, next) => {
    try{
        const id = req.params.id;

        Offer.find({_id: id}).then(documents => {
            res.status(200).json({
                message: "Offer by Id fetched successfully",
                offer: documents
            })
        })
    } catch (error) {
        console.error(error);
    }
})

router.delete("/:id", (req, res, next) => {
    try{
        Offer.deleteOne({ _id: req.params.id }).then(result => {
            console.log(result);
            res.status(200).json({ message: "Offer deleted!" });
        });
    } catch (error){
        console.error(error);
    }
});

router.post("/deleteImage", (req, res, next) => {
    try{
        const backPath = "./backend/images/offers/"

        fs.unlinkSync(backPath + req.body.imagePath)
        fs.unlinkSync(backPath + req.body.documentPath)
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;