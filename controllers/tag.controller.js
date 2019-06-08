

const Tag = require("../models/tag.model.js");
const jsonMessages = require("../jsonMessages/db.js");


// GET ALL TAGS
async function getTags(req, res) {
    try {
        const count = await Tag.countDocuments();
        const search = await Tag.find();

        if (count === 0) {
            return res.status(jsonMessages.notFound.noRecords.status).send(jsonMessages.notFound.noRecords);
        }
        else {
            return res.send(search);
        }
    }
    catch (err) {
        return res.status(jsonMessages.error.dbError.status).send(jsonMessages.error.dbError);
    }
};


// GET TAG BY ID
async function getTagByID(req, res) {
    const _id = req.params.id;

    try {
        const search = await Tag.findOne({ _id });

        if (search) {
            return res.send(search);
        }
        else {
            return res.status(jsonMessages.notFound.noRecordsId.status).send(jsonMessages.notFound.noRecordsId);
        }
    }
    catch (err) {
        return res.status(jsonMessages.error.dbError.status).send(jsonMessages.error.dbError);
    }
};


// CREATE NEW TAG
async function createTag(req, res) {
    const _tag = req.body.tag;
    const newTag = new Tag(req.body);

    try {
        const search = await Tag.findOne({ "tag": _tag });
        const result = newTag.save();

        console.log(search)

        if (search) {
            return res.status(jsonMessages.error.duplicateData.status).send(jsonMessages.error.duplicateData);
        }
        else {
            if (result) {
                return res.status(jsonMessages.success.successInsert.status).send({ msg: jsonMessages.success.successInsert, data: newTag });
            }
            else {
                return res.status(jsonMessages.error.errorInsert.status).send(jsonMessages.error.errorInsert);
            }
        }
    }
    catch (err) {
        return res.status(jsonMessages.error.dbError.status).send(jsonMessages.error.dbError);
    }
};


// DELETE TAG BY ID
async function deleteTagByID(req, res) {
    const _id = req.params.id;

    try {
        const search = await Tag.findOne({ _id });
        const result = await Tag.findByIdAndDelete({ _id });
    
        if (search) {
            if (result) {
                return res.status(jsonMessages.success.successDelete.status).send(jsonMessages.success.successDelete);
            }
            else {
                return res.status(jsonMessages.error.errorDelete.status).send(jsonMessages.error.errorDelete);
            }
        }
        else {
            return res.status(jsonMessages.notFound.noRecordsId.status).send(jsonMessages.notFound.noRecordsId);
        }
    }
    catch (err) {
        return res.status(jsonMessages.error.dbError.status).send(jsonMessages.error.dbError);
    }
};


// EXPORT ALL FUNCTIONS
module.exports = {
    getTags,
    getTagByID,
    createTag,
    deleteTagByID
};
