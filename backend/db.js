const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://prashantchauhan1819:%40Apc1920@cluster0.wcyv7.mongodb.net/eatnow?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");

    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    const foodCategoryCollection = mongoose.connection.db.collection("foodcategory");

    const foodItems = await foodItemsCollection.find({}).toArray();
    const foodCategories = await foodCategoryCollection.find({}).toArray();

    global.food_items = foodItems;
    global.foodCategory = foodCategories;

  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

module.exports = mongoDB;
