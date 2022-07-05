<template>
  <div class="post">
    <a href="/" class="breadcrumbs">Back</a>
    <div class="post__title">
      <h1>{{post.title}}</h1>
      <p @click="showDialog">{{user.name}}</p>
    </div>
    <div class="post__body">
      <div class="post__body-text">
        {{post.body}}
      </div>
      <div class="add-comment">
        <input v-model="commentInput" type="text" placeholder="Add New Comment">
        <button @click="addNewComment">Add New Comment</button>
      </div>
      <div class="post__body-comments" v-for="comment in comments" :key="comment.id">
        <div class="comment__title">
          <span class="comment-user-name">{{comment.name}}</span>
          <span class="comment-user-email">{{comment.email}}</span>
        </div>
        <p>{{comment.body}}</p>
      </div>
    </div>
    <Dialog v-model:show="dialogVisible" :user="user">
      <div class="info">
        <div>
          <p>User</p>
          <span class="name">{{user.name}}</span>
          <span>{{user.username}}</span>
          <span>{{user.email}}</span>
          <span>{{user.phone}}</span>
        </div>
        <div>
          <p>Company</p>
          <span>{{user.company.name}}</span>
          <span>{{user.company.bs}}</span>
          <span>{{user.company.catchPhrase}}</span>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import axios from "axios";
import Dialog from "@/components/Dialog";
export default {
  name: "Post",
  components: {Dialog},
  data() {
    return {
      post: [],
      user: [],
      comments: [],
      commentInput: '',
      dialogVisible: false
    }
  },
  mounted() {
    this.fetchPost()
    this.fetchUser()
    this.fetchComments()
  },
  methods: {
    showDialog(){
      this.dialogVisible = true;
    },
    addNewComment() {
      this.comments = [ { body: this.commentInput, id: Date.now(), email: 'kuzyk.yarik@mgail.com', name: 'Yaroslav' }, ...this.comments,]
    },
    async fetchPost(){
      try{
        let {data} = await axios.get('https://jsonplaceholder.typicode.com/posts')
        this.post = data.find(el => el.id == this.$route.params.id);
      }catch (e) {
        console.log(e)
      }
    },
    async fetchUser(){
      try{
        let {data} = await axios.get('https://jsonplaceholder.typicode.com/users')
        this.user = data.find(el => el.id == this.$route.params.id);
      }catch (e) {
        console.log(e)
      }
    },
    async fetchComments(){
      try{
        let {data} = await axios.get('https://jsonplaceholder.typicode.com/comments')
        this.comments = data.filter(el => el.postId == this.$route.params.id);
      }catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
  .post{
    width: 700px;
    margin: 0 auto;
  }
  .post__title{
    margin-bottom: 30px;
  }
  .post__title h1 {
    text-transform: uppercase;
  }
  .post__title p {
    display: flex;
    justify-content: flex-end;
    font-weight: bold;
    cursor: pointer;
  }
  .post__body-text{
    margin-bottom: 100px;
    font-size: 30px;
  }
  .comment__title{
    display: flex;
    flex-direction: column;
  }
  .comment-user-name{
    font-size: 17px;
    font-weight: bold;
  }
  .comment-user-email{
    color: cornflowerblue;
  }
  .post__body-comments{
    margin-bottom: 50px;
    border: 1px solid #000;
    padding: 10px 20px;
  }
  .breadcrumbs{
    font-weight: 600;
    text-decoration: none;
    color: #000;
    font-size: 18px;
  }
  .add-comment{
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
  }
  .add-comment input {
    width: 75%;
    border: 0;
    border-bottom: 1px solid #000;
  }
  .add-comment button {
    width: 19%;
    border: 1px solid #000;
    background: transparent;
    padding: 10px 0px;
    cursor: pointer;
    outline: none;
  }
  .info p {
    margin-bottom: 0;
    font-size: 20px;
    font-weight: 600;
  }
  .info span{
    font-size: 17px;
    margin: 2px 0;
  }
  .info div{
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  @media (max-width: 768px){
    .post{
      width: 100%;
      padding: 0 15px;
    }
    .add-comment{
      flex-direction: column;
    }
    .add-comment input {
      width: 100%;
      margin-bottom: 15px;
    }
    .add-comment button {
      width: 100%;
    }
    .post__title h1 {
      font-size: 24px;
    }
    .post__body-text{
      font-size: 20px;
    }
  }
</style>