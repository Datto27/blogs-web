const _ = require('lodash')
const blogItem = require("../models/blogModel")

const getPosts = (req, res) => {
    blogItem.find({}, (err, items) => {
        res.render('home', {items})
    })
}
const createPost = (req, res) => {
    const title = req.body.title
    const content = req.body.content
    // insert data into mongodb 
    const blog = new blogItem({
        title: title,
        content: content
    })
    blog.save()
    res.redirect('/')
}
const singelPost = (req, res) => {
    // console.log(req.params.title)
    const reqTitle = _.lowerCase(req.params.title)
    blogItem.find({}, (err, items) => {
        if (err) {
            console.log(err)
        } else {
            items.map(post => {
                const currTitle = _.lowerCase(post.title)
                if (reqTitle === currTitle) {
                    // console.log(post)
                    res.render('post', {title: currTitle, content: post.content})
                }
            })
        }
    })
}

module.exports = {
    getPosts, createPost, singelPost
}