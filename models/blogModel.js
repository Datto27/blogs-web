const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.DB_URI)

const blogSchema = new mongoose.Schema({
    title: {type: String, max:20},
    content: {type: String}
})

module.exports = mongoose.model("Blog", blogSchema)