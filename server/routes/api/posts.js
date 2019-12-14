const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//get posts
router.get('/', async (req, res) => {
   const lists = await loadPostCollection();
   res.send(await lists.find({}).toArray());
});


//add post
router.post('/', async (req, res) => {
   const posts = await loadPostCollection();
   await posts.insertOne({
      title: req.body.title,
      text: req.body.text,
      createdAt: new Date()
   });
   res.status(201).send();
})


//delete post
router.delete('/:id', async (req, res) => {
   const posts = await loadPostCollection();
   await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id)
   });
   res.status(200).send();
})


async function loadPostCollection(){
   const client = await mongodb.MongoClient.connect
   ('mongodb+srv://usermongo1994:usermongo1994@cluster0-b49sb.gcp.mongodb.net/post', {
      useNewUrlParser: true
   });

   return client.db('post').collection('post_data');
}


module.exports = router;
