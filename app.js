const express = require("express")
const bodyParser = require("body-parser")
const _ = require('lodash')
const blogItem = require("./models/blogModel")

const app = express()

// vars
var posts = [ {
    title: "blog",
    content: "default content"
}]

app.set('view engine', 'ejs') 

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

// routing
app.get('/', (req, res) => {
    blogItem.find({}, (err, items) => {
        res.render('home', {items})
    })

})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/contact', (req, res) => {
    res.render('contact')
})
app.get('/compose', (req, res) => {
    res.render('compose')
})
app.post('/compose', (req, res) => {
    const title = req.body.title
    const content = req.body.content
    // insert data into mongodb 
    const blog = new blogItem({
        title: title,
        content: content
    })
    blog.save()
    posts.push(req.body)
    res.redirect('/')
})
app.get('/posts/:title', function(req, res) {
    // console.log(req.params.title)
    const reqTitle = _.lowerCase(req.params.title)
    blogItem.find({}, (err, items) => {
        if (err) {
            console.log(err)
        } else {
            items.map(post => {
                const currTitle = _.lowerCase(post.title)
                if (reqTitle === currTitle) {
                    console.log(post)
                    res.render('post', {title: currTitle, content: post.content})
                }
            })
        }
    })
})

app.listen(4000) 