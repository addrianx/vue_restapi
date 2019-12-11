const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//get posts
router.get('/', async (req, res) => {
   const posts = await loadPostCollection();
   res.send(await posts.find({}).toArray());
});


//add post
router.post('/', async (req, res) => {
   const posts = await loadPostCollection();
   await posts.insertOne({
      text: req.body.text,
      createdAt: new Date()
   });
   res.status(201).send();
})



//delete post


async function loadPostCollection(){
   const client = await mongodb.MongoClient.connect
   ('mongodb+srv://usermongo1994:usermongo1994@cluster0-b49sb.gcp.mongodb.net/test', {
      useNewUrlParser: true
   });

   return client.db('vue_express').collection('sample_airbnb');
}


module.exports = router;
