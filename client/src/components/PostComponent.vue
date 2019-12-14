<template>
  <div class="hello">
    <div class="create-post">
      <div class="create">
        <div class="form-group">
          <input type="text" v-model="title" required placeholder="Enter Title" id="title" class="form-control">
        </div>
        <div class="form-group">
          <textarea class="form-control" required v-model="text" id="text" placeholder="Enter Text"></textarea>
        </div>
        <div class="form-group">
          <input name="text" class="form-control" v-model="author" id="text" placeholder="Author">
        </div>
        <div class="form-groupq">
          <button v-on:click="createPost" type="submit" class="btn btn-primary">Add Post</button>
          <button type="reset" class="btn btn-secondary">Add Post</button>
        </div>
      </div>
    </div>
    <h1>Latest Post</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>

    <p class="error" v-if="error">{{error}}</p>

    <div class="post-container">
      <div class="post" v-for="(post, index) in posts" v-bind:item="post" v-bind:index="index" v-bind:key="post._id">
        <h4 class="title">{{post.title}}</h4>
        <p class="text">{{post.text}}</p>
        <span v-on:click="deletePost(post._id)" class="delete">X</span>
      </div>
    </div>

  </div>
</template>

<script>
import PostService from '../PostService';

export default {
  name: 'PostComponent',
  data(){
    return{
      posts: [],
      error: '',
      title: '',
      author: '',
      text: ''
    }
  },
  async created(){
    try{
      this.posts = await PostService.getPost(); 
    } catch(err){
      this.error = err.message;
    }
  },
  methods:{
    async createPost(){
      await PostService.insertPost(this.title, this.text, this.author);
      this.posts = await PostService.getPost();
            this.$swal("Post Telah ditambahkan!", {
        title: 'success!',
        text: 'Your posts has been added.',
        icon: 'success'
      }); 
    },
    deletePost(id){
      this.$swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: false
    }).then( async (willdete) => {

      if(willdete.value){
        await PostService.deletePost(id);
        this.posts = await PostService.getPost(); 
        this.$swal("Post Telah dihapus!", {
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success'
        });       
        }else{
          this.$swal("Post Tidak dihapus!", {
            title: 'Cancelled!',
            text: 'No post has been deleted.',
            icon: 'error'
          });           
        }
      
    });
    },

  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
p.error{
  background: rgb(248, 129, 129);
  border: 1px solid rgb(240, 51, 51);
  padding-top: 1.3rem;
  padding-bottom: 1.3rem;
  color: white;
  width: 50%;
  margin: 0 auto;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.create-post{
  border: 1px solid lightgrey;
  padding: 2rem;
  width: 50%;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0px 2px 9px 2px rgba(211, 211, 211, 0.61);
}

.form-group{
  padding-top: .5rem;
  padding-bottom: .5rem;
}

input.form-control{
  width: 80%;
  padding: .4rem;
  border-radius: 6px;
  border: 1px solid rgb(197, 197, 197);
}

textarea.form-control{
  width: 80%;
  padding: .4rem;
  border-radius: 6px;
  border: 1px solid rgb(197, 197, 197);
  resize: vertical;
}

input.form-control:hover{
  border-radius: 6px;
}

.btn{
  padding: .7rem;
  border: none;
  margin-left: .5rem;
  margin-right: .5rem;
  cursor: pointer;
  transition: .3s;
}

.btn-primary{
  background: rgb(65, 141, 99);
  color: white;
}

.btn-primary:hover{
  background: rgb(52, 119, 82);
  color: white;
}

.btn-secondary{
  background: rgb(201, 201, 201);
  color: rgb(126, 125, 125);
}

.btn-secondary:hover{
  background: rgb(168, 168, 168);
  color: rgb(126, 125, 125);
}

.post-container{
  width: 50%;
  margin: 0 auto;
}
.post{
  background-color: #87f0c1;
  border-radius: 12px;
  box-shadow: 0px 2px 9px 2px rgba(211, 211, 211, 0.61);
  padding: 1.3rem;
  margin: 1rem;
}

.delete {
    cursor: pointer;
    font-size: 1.2rem;
    color: red;
    background: white;
    padding: .3rem;
}

</style>
