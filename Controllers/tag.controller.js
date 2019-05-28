

const Tag = require("../Models/tag.model.js");


// GET ALL TAGS
async function getTags(req, res) {
    try {
        const count = await Tag.countDocuments();
        const result = await Tag.find();

        if (count === 0) {
            return res.status(jsonMessages.notFound.noRecords.status).send(jsonMessages.notFound.noRecords);
        }
        else {
            return res.send(result);
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
        const result = await Tag.findOne({ _id });

        if (result) {
            return res.send(result);
        }
        else {
            return res.status(jsonMessages.notFound.noRecordsId.status).send(jsonMessages.notFound.noRecordsId);
        }
    }
    catch (err) {
        return res.status(jsonMessages.error.dbError.status).send(jsonMessages.error.dbError);
    }
};


// ADD NEW TAG
async function addTag(req, res) {
    let newTag = new Tag(req.body);

    try {
        newTag.save(function (err, tag) {
            if (err) {
                return res.status(jsonMessages.error.errorInsert.status).send(jsonMessages.error.errorInsert);
            }
            else {
                return res.status(jsonMessages.success.successInsert.status).send({ msg: jsonMessages.success.successInsert, data: tag });
            }
        });
    }
    catch (err) {
        return res.status(jsonMessages.error.dbError.status).send(jsonMessages.error.dbError);
    }
};


// REMOVE TAG BY ID
async function removeTagByID(req, res) {
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
    addTag,
    removeTagByID
};
