import axios from 'axios';

const url = 'api/posts/';

class PostService{
   //get post
   static getPost(){
      return new Promise(async (resolve, reject) => {
         try{
            const res = await axios.get(url);
            const data = res.data;
            resolve(
               data.map(post => ({
                  ...post,
                  createdAt: new Date(post.createdAt)
               }))
            );
         }
         catch(err){
            reject(err)
         }
      });
   }

   //create post
   static insertPost(title, text, author){
      return axios.post(url,{
         title, text, author
      });
   }

   //delete post
   static deletePost(id){
      return axios.delete(`${url}${id}`);
   }
   
}

export default PostService;