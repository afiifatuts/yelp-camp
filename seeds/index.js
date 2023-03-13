const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelper");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/campground");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 10; i++) {
    const random = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "64080e564916f17eea18bd8c",
      location: `${cities[random].city} , ${cities[random].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: "Point",
        coordinates: [cities[random].longitude, cities[random].latitude],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dydd3ldmi/image/upload/v1678283416/YelpCamp/gs4nkc675zdayjum59mc.jpg",
          filename: "YelpCamp/zolmmas7aj56glir14c3",
        },
        {
          url: "https://res.cloudinary.com/dydd3ldmi/image/upload/v1678283416/YelpCamp/gs4nkc675zdayjum59mc.jpg",
          filename: "YelpCamp/zolmmas7aj56glir14c3",
        },
      ],

      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis quod, rerum, voluptates alias maiores, iure architecto officiis dolorum suscipit sit distinctio veritatis! Doloremque itaque commodi laboriosam possimus ipsam fuga nemo.",
      price: price,
    });
    await camp.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});
