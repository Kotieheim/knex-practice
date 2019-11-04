require("dotenv").config();
const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL
});

console.log("knex and driver installed correctly");

function searchByItemName(searchTerm) {
  knexInstance
    .select("*")
    .from("shopping_list")
    .where("name", "ILIKE", `%${searchTerm}%`)
    .then(result => {
      console.log(result);
    });
}

searchByItemName("urger");

function paginateItems(page) {
  const limit = 6;
  const offset = limit * (page - 1);
  knexInstance
    .select("*")
    .from("shopping_list")
    .limit(limit)
    .offset(offset)
    .then(result => {
      console.log(result);
    });
}

paginateItems(2);

function productsAddedDaysAgo(daysAgo) {
  knexInstance
    .select("id", "name", "price", "date_added", "checked", "category")
    .from("shopping_list")
    .where(
      "date_added",
      ">",
      knexInstance.raw(`now() - '?? days':: INTERVAL`, daysAgo)
    )
    .then(results => {
      console.log(results);
    });
}

productsAddedDaysAgo(5);

function costPerCategory() {
  knexInstance
    .select("category")
    .from("shopping_list")
    .groupBy("category")
    .sum("price AS total")
    .then(result => {
      console.log(result);
    });
}

costPerCategory();
// function searchByProduceName(searchTerm) {
//   knexInstance
//     .select("product_id", "name", "price", "category")
//     .from("amazong_products")
//     .where("name", "ILIKE", `%${searchTerm}%`)
//     .then(result => {
//       console.log(result);
//     });
// }
//
// searchByProduceName("holo");
//
// function paginateProducts(page) {
//   const productsPerPage = 10;
//   const offset = productsPerPage * (page - 1);
//   knexInstance
//     .select("product_id", "name", "price", "category")
//     .from("amazong_products")
//     .limit(productsPerPage)
//     .offset(offset)
//     .then(result => {
//       console.log(result);
//     });
// }
//
// paginateProducts(2);

// function getProductsWithImages() {
//   knexInstance
//     .select("product_id", "name", "price", "category", "image")
//     .from("amazong_products")
//     .whereNotNull("image")
//     .then(result => {
//       console.log(result);
//     });
// }

// getProductsWithImages();
// function mostPopularVideosForDays(days) {
//   knexInstance
//     .select("video_name", "region")
//     .count("date_viewed AS views")
//     .where(
//       "date_viewed",
//       ">",
//       knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
//     )
//     .from("whopipe_video_views")
//     .groupBy("video_name", "region")
//     .orderBy([
//       { column: "region", order: "ASC" },
//       { column: "views", order: "DESC" }
//     ])
//     .then(result => {
//       console.log(result);
//     });
// }

// mostPopularVideosForDays(30);
