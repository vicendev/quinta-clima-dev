const express = require("express");
const multer = require("multer");
const fs = require('fs');

const WorksDone = require("../models/worksDone");
const checkAuth = require("../middleware/check-auth")

const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const url = req.get('host');
        let repository = "";

        if ( url == 'localhost:3000')
        {
            repository = "backend/images/worksdone"
        } else {
            repository = "images/worksdone"
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

router.post("", multer({storage: storage}).single("image"), (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const worksdone = new WorksDone({
        servId: req.body.servId,
        tagId: req.body.tagId,
        tagDesc: req.body.tagDesc,
        description: req.body.description,
        imagePath: url + "/images/worksdone/" + req.file.filename,
        created: req.body.created
    });
    worksdone.save().then(createdWorksDone => {
        res.status(201).json({
            message: "Works Done added successfully",
            worksdone: {
                ...createdWorksDone,
                id: createdWorksDone._id
            }
        });
    });
});

router.put("/:id", multer({ storage: storage }).single("image"), (req, res, next) => {
    try{
        let imagePath = req.body.imagePath;
        if(req.file) {
            const url = req.protocol + "://" + req.get("host");
            imagePath = url + "/images/worksdone/" + req.file.filename;
        }
        const workdone = new WorksDone({
            _id: req.body.id,
            servId: req.body.servId,
            tagId: req.body.tagId,
            tagDesc: req.body.tagDesc,
            description: req.body.description,
            imagePath: imagePath,
            created: req.body.created      
        });
        WorksDone.updateOne({ _id: req.params.id }, workdone).then(result =>{
            res.status(200).json({message: "Update successful!" });
        });        
    } catch (error) {

    }

})

router.get("",(req, res, next) => {
    try{
        WorksDone.find().then(documents => {
            res.status(200).json({
                message: "worksdone fetched successfully",
                worksdone: documents
            });
        });        
    } catch (error) {
        console.error(error);
    }

});

router.get("/:id", (req, res, next) => {
    try{
        const id = req.params.id;

        WorksDone.find({_id: id}).then(items => {
            res.status(200).json({
                message: "worksdone by servId fetched successfully",
                worksdone: items
            })
        })
    } catch (error) {
        console.error(error);
    }

})

router.get("/byService/:servId", (req, res, next) => {
    try{
        const servId = req.params.servId;

        WorksDone.find({servId: servId}).then(items => {
            res.status(200).json({
                message: "worksdone by servId fetched successfully",
                worksdone: items
            });
        });
    } catch (error) {
        console.error(error);
    }
})

router.get("/byTag/:tagId", (req, res, next) => {
    try{
        const tagId = req.params.tagId;

        WorksDone.find({tagId: tagId}).then(items => {
            res.status(200).json({
                message: "worksdone by tagId fetched successfully",
                worksdone: items
            })
        })
    } catch (error) {
        console.error(error);
    }

})

router.delete("/:id", (req, res, next) => {
    try{
        WorksDone.deleteOne({ _id: req.params.id }).then(result => {
            console.log(result);
            res.status(200).json({ message: "Work Done deleted!" });
        });
    } catch (error){
        console.error(error);
    }
});

router.post("/deleteImage", (req, res, next) => {
    try{

        const url = req.get('host');
        let backPath = "";

        if ( url == 'localhost:3000')
        {
            backPath = "./backend/images/worksdone/"
        } else {
            backPath = "./images/worksdone/"
        }

        fs.unlinkSync(backPath + req.body.imagePath)
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;