const posts = [
    {
      title: 'Amazing new framework!!!', 
      summary: 'Why you must start using Explode.js IMMEDIATELY!',
      votes: 0,
      thumbnail: 'https://placeimg.com/75/75/any',
      alt: "Any image"
    },
    {
      title: 'Understanding the Event Loop', 
      summary: 'This post will change your life.',
      votes: 0,
      thumbnail: 'https://placeimg.com/75/75/nature',
      alt: "Any nature image"
    },
    {
      title: 'No seriously, what is a $%*# is a promise?', 
      summary: 'Understanding callback heck and why you must avoid it.',
      votes: 0,
      thumbnail: 'https://placeimg.com/75/75/tech',
      alt: "Any tech image"
    },
  ];

const app = new Vue({
    el: "#app",
    data: {
        posts: posts,
        newTitle: '',
        newSummary: ''
    },
    methods: {
        increment: function (post) {
            post.votes++;
        },
        decrement: function (post) {
            post.votes--;
        },
        addPost: function () {
            this.posts.push({title: this.newTitle, summary: this.newSummary, votes: 0});
            this.newTitle = '';
            this.newSummary = '';
        }
    },
    computed: {
        orderedList: function () { return this.posts.sort((currentPost,nextPost) =>{
               return nextPost.votes - currentPost.votes;
             });}
    }
});
