import fs from "fs";
import axios from "axios";
import dotenv from "dotenv";

import connectDB from "./../config/db.js";
import Product from "../models/productModel.js";


dotenv.config();

connectDB();

let data = fs.readFileSync("./backend/data/bookDetails.json", {
  encoding: "utf8",
  flag: "r",
});

const user_ids = [
  "626e7dae19e8d911a49dbe7a",
  "626e7dd319e8d911a49dbe7b",
  "627411768fff8e5094a93060",
  "627411988fff8e5094a93061",
];

data = JSON.parse(data);
data.forEach(async (item) => {
  try {
    const rand_id = Math.floor(Math.random() * 4);
    item.user = { _id: user_ids[rand_id] };
    const product = new Product(item);
    
	const createdProduct = await product.save();
    console.log(createdProduct);
    
  } catch (err) {
    console.log(err);
  }
});
