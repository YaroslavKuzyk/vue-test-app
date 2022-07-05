import {createRouter, createWebHistory} from "vue-router";
import PostList from "@/views/PostList";
import Post from "@/views/Post";
const routes = [
    {
        path: '/',
        component: PostList
    },
    {
        path: '/:id',
        component: Post
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;