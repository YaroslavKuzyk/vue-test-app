<template>
  <div class="wrapper">
    <div class="post-list">
      <div
        class="post"
        v-for="post in posts"
        :key="post.id">
        <h3 class="post__title">{{post.title}}</h3>
        <p class="post__body">{{post.body}}</p>
        <a :href="`/${post.id}`" class="post__link">More</a>
      </div>
    </div>
  <Pagination
    :totalPages="totalPages"
    :page="page"
    :changePage="changePage"
  />
  </div>
</template>

<script>
import axios from 'axios';
import Pagination from "@/components/Pagination";
export default {
  name: "PostList",
  components: {Pagination},
  data(){
    return{
      posts: [],
      limit: 10,
      page: 1,
      totalPages: null
    }
  },
  mounted() {
    this.fetchPosts()
  },
  methods: {
    changePage(pageNumber){
      this.page = pageNumber
      this.fetchPosts()
    },
    async fetchPosts(){
      try{
        let response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data;
      }catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
.wrapper{
  height: calc(100vh - 20px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.post-list{
  width: 900px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.post{
  width: 250px;
  padding: 35px 20px;
  box-shadow: 0px 0px 5px -1px #000000;
  margin-bottom: 20px;
}
.post__title{
  margin: 0;
}
.post__link{
  display: inline;
  text-decoration: none;
  background: #000000;
  padding: 5px 15px;
  color: #fff;
}
@media (max-width: 992px) {
  .post-list{
    width: 600px!important;
  }
}
@media (max-width: 640px) {
  .post-list{
    width: 290px!important;
  }
}
</style>