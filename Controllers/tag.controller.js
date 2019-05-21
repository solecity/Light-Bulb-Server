

const Tag = require("../Models/tag.model.js");


// GET ALL TAGS
async function getTags(req, res) {
    const error = "Cannot get tags."

    await Tag.find({}, function (err, tag) {
        if (err) {
            return res.status(404).send({ error: error + err });
        }
        else {
            Tag.find({}).select('');
            return res.send(tag);
        }
    });
};


// GET TAG BY ID
async function getTagByID(req, res) {
    const _id = req.params.id;

    await Tag.findOne({ _id }, function (err, tag) {
        const error =`Cannot find tag id '${_id}'.`;

        if (err) {
            return res.status(404).send({ error: error + err});
        }
        else {
            Tag.findOne({ _id }).select('');
            return res.send(tag);
        }
    });
};


// ADD NEW TAG
async function addTag(req, res) {
    let newTag = new Tag(req.body);
    const error = "Cannot add tag."

    newTag.save(function (err, tag) {
        if (err) {
            return res.status(404).send({ error: error + err });
        }
        else {
            return res.send(tag);
        }
    });
};


// REMOVE TAG BY ID
async function removeTagByID(req, res) {
    const _id = req.params.id;
    const error = `Cannot remove tag. Cannot find tag with id '${_id}'.`;

    Tag.findByIdAndDelete(_id, function (err, tag) {

        if (err) {
            return res.status(404).send({ error: error +  err });
        }
        else {
            return res.send(tag);
        }
    });
};


// EXPORT ALL FUNCTIONS
module.exports = {
    getTags,
    getTagByID,
    addTag,
    removeTagByID
};
