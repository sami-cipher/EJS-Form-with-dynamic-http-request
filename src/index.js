const express = require("express");
const app = express();
const _ = require("lodash");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

const posts = [];

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

app.get("/", (req, res) => {
  console.log(posts);
  res.render("home", {
    startingContent: homeStartingContent,
    contents: posts
  });
});
const fuel = {
  bewerages: ["beer", "coffee", "wine", "Lemonade", "water"],
  chats: ["Bhelpuri", "Aloo tikki", "Samosa"]
};
app.get("/form", (req, res) => {
  res.render("form", {
    fuel: Object.keys(fuel)
  });
});
app.get("/fualList", (req, res) => {
  const { type } = req.query;
  res.send(fuel[type]);
});
app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

// /posts/:post-param
app.get("/posts/:route", (req, res) => {
  const postRequest = req.params.route;
  const match = posts.find(
    post => _.kebabCase(post.title) === _.kebabCase(postRequest)
  );

  // check for match
  if (match) {
    // console.log("match is found!");
    res.render("post", {
      postTitle: match.title,
      postBody: match.body
    });
  } else {
    console.log("match is NOT found!");
  }
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    body: req.body.postContent
  };
  posts.push(post);
  res.redirect("/");
});

app.listen(8080);
