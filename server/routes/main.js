const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

//Home page
router.get('', async (req, res) => {
    // res.send("Welcome to the page.");

    
    try {
        const locals = {
            title: "Blog Posts",
            description: "Simple Blog created"
        };

        let perPage = 6;
        let page = req.query.page || 1;
    
        const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();
    
        // Count is deprecated - please use countDocuments
        // const count = await Post.count();
        const count = await Post.countDocuments({});
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);
    
        res.render('index', { 
          locals,
          data,
          current: page,
          nextPage: hasNextPage ? nextPage : null,
          currentRoute: '/'
        });
    
      } catch (error) {
        console.log(error);
      }
  
  });













  //Basic get posts without pagination:

//   router.get('', async (req, res) => {
//     // res.send("Welcome to the page.");

//     const locals = {
//         title: "Blog Posts",
//         description: "Simple Blog created"
//     }
//     try {
//         const data = await Post.find();
//         res.render('index', { locals, data });
//     } catch(error){
//         console.log(error);
//     }
  
//   });


 //Inserting initial data to Blog DB
function insertPostData(){
    Post.insertMany([
        {
            title: "Building a Blog",
            body: "This is the body text1"
        },
        {
            title: "Blog title 2",
            body: "This is the body text2"
        },
        {
            title: "Blog title 3",
            body: "This is the body text3"
        },
        {
            title: "Blog title 4",
            body: "This is the body text4"
        },
        {
            title: "Blog title 5",
            body: "This is the body text5"
        },
        {
            title: "Blog title 6",
            body: "This is the body text6"
        },
        {
            title: "Blog title 7",
            body: "This is the body text7"
        },
        {
            title: "Blog title 8",
            body: "This is the body text8"
        },
        {
            title: "Blog title 9",
            body: "This is the body text9"
        },
        {
            title: "Blog title 10",
            body: "This is the body text10"
        },
    ])
}

// insertPostData();










router.get('/about', (req, res) => {
    res.render('about');
  }); 

  module.exports = router;