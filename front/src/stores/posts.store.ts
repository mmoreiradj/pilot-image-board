import { defineStore } from "pinia";
import { ref } from "vue";
import { Post } from "@/models";

export const usePostsStore = defineStore("posts", () => {
  const posts = ref([] as Post[]);

  function addPosts(newPosts: Post[]) {
    newPosts.forEach((newPost) => {
      const index = posts.value.findIndex((post) => post.id === newPosts[0].id);
      if (index === -1) {
        posts.value.push(newPost);
      } else {
        posts.value[index] = newPost;
      }
    });
  }

  function resetPosts() {
    posts.value = [];
  }

  function removePost(postId: number) {
    posts.value = posts.value.filter((post) => post.id !== postId);
  }

  return { posts, addPosts, resetPosts, removePost };
});
