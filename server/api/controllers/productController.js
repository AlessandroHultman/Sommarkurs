import Product from "../models/Product.js";

export async function product_post(req, res) {
  console.log(req.body);

  const {
    title,
    price,
    description,
    category,
    image,
    stock,
    rating,
  } = req.body;

  try {
    const product = await Product.create({
      title,
      price,
      description,
      category,
      image,
      stock,
      rating,
    });
    res.status(201).json({ product: product._id });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
}

export async function products_get(req, res) {
  const filter = { };
  try {
    const allProducts = await Product.find(filter);
    res.status(201).json({ products: allProducts });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
}
