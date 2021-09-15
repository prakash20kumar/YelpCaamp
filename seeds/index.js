const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});

  for (let i = 0; i < 500; i++) {
    const random1000 = Math.floor(Math.random() * 4241);
    const price = Math.floor(Math.random() * 1000) + 500;
    const camp = new Campground({
      author: "613a1a76e124d90c3057a9b2",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      geometry: { type: "Point", coordinates: [cities[random1000].longitude, cities[random1000].latitude] },
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/dt6fbjqog/image/upload/v1631385027/YelpCamp/zlywp8wabzjadzrrbtyy.jpg",
          filename: "YelpCamp/zlywp8wabzjadzrrbtyy",
        },
        {
          url: "https://res.cloudinary.com/dt6fbjqog/image/upload/v1631385027/YelpCamp/jxovgply63ljo95eifmy.jpg",
          filename: "YelpCamp/jxovgply63ljo95eifmy",
        },
        {
          url: "https://res.cloudinary.com/dt6fbjqog/image/upload/v1631385026/YelpCamp/clt9ragebb3zgcrrljhf.jpg",
          filename: "YelpCamp/clt9ragebb3zgcrrljhf",
        },
        {
          url: "https://res.cloudinary.com/dt6fbjqog/image/upload/v1631385026/YelpCamp/mowvogfedy6o5kskfhyo.jpg",
          filename: "YelpCamp/mowvogfedy6o5kskfhyo",
        },
        {
          url: "https://res.cloudinary.com/dt6fbjqog/image/upload/v1631385034/YelpCamp/y4wjlm236gvsv8qcn3dh.jpg",
          filename: "YelpCamp/y4wjlm236gvsv8qcn3dh",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
