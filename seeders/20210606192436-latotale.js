'use strict';
const { random } = require("faker");
const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {

try
{
const users = [];
const tags = [];
const articles = [];
const articleTags = [];
const comments = [];

const myRoles = ["admin", "author", "guest"];
const myTags = ["science", "beauty", "health"];
//users
for (let i=0; i<20; i++)
{
  users.push({
    username : faker.internet.userName(),
    email : faker.internet.email(),
    password : faker.internet.password(),
    role : myRoles[Math.floor(Math.random() * myRoles.length)],
    createdAt : faker.date.between('01-01-2000', '01-01-2021'),
    updatedAt : new Date(),
  });
}
    await queryInterface.bulkInsert("users", users, {});

//tags
for (let i=0; i<10; i++)
{
  tags.push({
    name: `${faker.commerce.color()} ${faker.company.bsBuzz()} ${faker.company.bsNoun()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

await queryInterface.bulkInsert("tags", tags, {});

const createdUsers = await queryInterface.sequelize.query(
  "SELECT * FROM users",
  {
    type: queryInterface.sequelize.QueryTypes.SELECT,
  }
);
createdUsers.forEach((user) => {
  let nbArticles = Math.ceil(Math.random() * (10 - 2) + 2);
  let nextDay = new Date(user.createdAt);
  for (let i = 0; i < nbArticles; i++) {
    nextDay.setDate(nextDay.getDate() + 1);
    articles.push({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      published: faker.datatype.boolean(),
      createdAt: nextDay,
      updatedAt: nextDay,
      UserId: user.id,
    });
  }
});

await queryInterface.bulkInsert("articles", articles, {});

const createdArticles = await queryInterface.sequelize.query(
  "SELECT * FROM articles",
  {
    type: queryInterface.sequelize.QueryTypes.SELECT,
  }
);

const createdTags = await queryInterface.sequelize.query(
  "SELECT * FROM tags",
  {
    type: queryInterface.sequelize.QueryTypes.SELECT,
  }
);
createdArticles.forEach((article) => {
  //every article is commented between 0 and 10 comments.
  let nbComments = Math.ceil(Math.random() * 10);
  for (let i = 0; i < nbComments; i++) {
    comments.push({
      content: faker.lorem.sentence(),
      ArticleId: article.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  //every article is tagged between 2 and 6 tags
  let nbArticlesTags = Math.ceil(Math.random() * 6);
  for (let i = 0; i < nbArticlesTags; i++) {
    articleTags.push({
      ArticleId: article.id,
      TagId: createdTags[i].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
});

await queryInterface.bulkInsert("comments", comments, {});
await queryInterface.bulkInsert("articletags", articleTags, {});
}
catch (error) 
{
  console.log(error);
}


},

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
    await queryInterface.dropTable("articles");
    await queryInterface.dropTable("tags");
    await queryInterface.dropTable("comments");
    await queryInterface.dropTable("articletags");
  }
};
