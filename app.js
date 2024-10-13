const express=require('express');
const mongoose=require('mongoose');
const Blog=require('./models/blog')
//connect to mongodb
const dbURI='mongodb+srv://mukhi:mukhi123@nodetuts.voiwy.mongodb.net/nodetuts?retryWrites=true&w=majority'
mongoose.connect(dbURI)
  .then(()=>app.listen(3000))
  .catch((err)=>console.log(err))
//express app
const app=express();

//register view engine
app.set('view engine','ejs');


//mongoose and mongo sandbox routes
app.get('/add-blog',(req,res)=>{
const blog=new Blog({
    title:'new Blog',
snippet:"about my new blog222222",
body:'more about my new blog'
});
blog.save()
.then((result)=>{
res.send(result);
})
.catch((err)=>{
    console.log(err)
})
})

app.get('/all-blogs',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((err=>{
        console.log(err)
    }))
})

app.get('/single-blog',(req,res)=>{
    Blog.findById('670c197cbcaf15bf65f29579')
    .then(result=>res.send(result))
    .catch(err=>console.log(err))
})
app.get('/',(req,res)=>{
    const blogs=[
        {title: 'yoshi',snippet:'Lorem ipsum dolor sit amet consectetur'},
        {title: 'mario',snippet:'Lorem ipsum dolor sit amet consectetur'},
        {title: 'hola',snippet:'Lorem ipsum dolor sit amet consectetur'}
    ]
    console.log(req.url)
       res.render('index',{
        title: 'Home',
        blogs
       })
    }
)
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'about'
       })
})

app.get('/blogs/create',(req,res)=>{
    res.render('create',{
        title: 'create a new blog'
       })
})

//404 page
app.use((req,res)=>{
   res.status(404).render('404',{
    title: '404'
   })
})

