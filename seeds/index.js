const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // Your User Id
      author: '677a6f197446dcc410223c9d',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ad esse, explicabo magnam perferendis repudiandae vero maiores veritatis alias iste',
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dz4kaguik/image/upload/v1736316187/YelpCamp/x59jdllcm0s9icf3oso2.jpg',
          filename: 'YelpCamp/x59jdllcm0s9icf3oso2',
        },
        {
          url: 'https://res.cloudinary.com/dz4kaguik/image/upload/v1736316188/YelpCamp/vuopbq8nbjpymfqpo4wo.jpg',
          filename: 'YelpCamp/vuopbq8nbjpymfqpo4wo',
        }
      ]

    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})