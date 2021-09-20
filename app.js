const express = require("express")
const bodyParser = require("body-parser")
const { getPosts, createPost, singelPost } = require("./controllers/Controllers")

const app = express()

app.set('view engine', 'ejs') 

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

// routing
app.get('/', getPosts)
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/contact', (req, res) => {
    res.render('contact')
})
app.get('/compose', (req, res) => {
    res.render('compose')
})
app.post('/compose', createPost)
app.get('/posts/:title', singelPost)

app.listen(process.env.PORT || 4000) 