const Product = require("../models/Product");

// ✅ GET ALL PRODUCTS (with filter)
exports.getAllProducts = async (req, res) => {
  try {
    const { category, fabric } = req.query;

    const filter = { isAvailable: true };
    if (category) filter.category = category;
    if (fabric) filter.fabric = fabric;

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET SINGLE PRODUCT
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ ADMIN — CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const { name, category, fabric, price, description, image } = req.body;

    const product = new Product({
      name,
      category,
      fabric,
      price,
      description,
      image,
    });

    await product.save();
    res.status(201).json({ msg: "Product created", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ ADMIN — UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json({ msg: "Product updated", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ ADMIN — DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { isAvailable: false });
    res.json({ msg: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
