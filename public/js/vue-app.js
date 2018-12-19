const helloWorld = new Vue({
    el: "#helloVue",
    data: {
        title: "Hello, world!",
        message: "This is my first Vue template!"
    },
    methods: {
        sayHello: function() {
            alert(this.title);
        }
    }
});

const example = new Vue({
    el: "#example",
    data: {
        title: "Hello",
        message: "This is an example!",
        name: "Cat",
        img: {
            src: "https://placeimg.com/200/200/animals",
            alt: "Animals"
        }
    }
});

const book = new Vue({
    el: "#book",
    data: {
        title: "Harry Potter",
        author: "J.K. Rowling",
        summary: "A magical story about loss.",
        showDetail: false
    },
    methods: {
        toggleDetails: function() {
            this.showDetail = !this.showDetail;
        }
    }
});

const colorsOfTheRainbow = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
const rainbow = new Vue({
    el: "#colors",
    data: {
        rainbow: colorsOfTheRainbow
    },
    methods: {
        toggleDetails: function() {
            this.showDetail = !this.showDetail;
        }
    }
});