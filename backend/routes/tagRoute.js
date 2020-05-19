const express = require("express");

const Tag = require("../models/tags");
const checkAuth = require("../middleware/check-auth")


const router = express.Router();

router.post("", (req, res, next) => {
    try{
        const tag = new Tag({
            content: req.body.content,
            date: req.body.date
        })
        console.log(req.body)
        tag.save().then(createdTag =>{
            res.status(201).json({
                message: "Tag added successfully",
                tagId: createdTag._id
            });
        });
       
    } catch(error){
        console.error(error);
    }

})

router.get("", (req, res, next) => {
    try{
        Tag.find().then(documents => {
            res.status(200).json({
                message: "posts fetched successfully",
                tag: documents
            });
        });
    } catch(error){
        console.error(error);
    }
});

router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    try{
        Tag.find({_id: id}).then(item => {
            res.status(200).json({
                message:"tag by id fetched successfully",
                tag: item
            })
        })
    } catch(error) {
        console.error(error);
    }
})

router.delete("/:id", (req, res, next) => {
    try{
        Tag.deleteOne({ _id: req.params.id }).then(result => {
            console.log(result);
            res.status(200).json({ message: "Tag deleted!" });
        });
    }catch(error){
        console.error(error);
    }
});

module.exports = router;