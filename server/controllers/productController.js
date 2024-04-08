import upload from "../config/cloudinary.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const { filter_by, sort_by, search } = req.query;
    let filter;
    let sort;

    if (filter_by)
      switch (filter_by) {
        case "body_butters":
          filter = "Body Butters";
          break;
        case "body_oils":
          filter = "Body Oils";
          break;
        case "sample_size":
          filter = "Sample Size";
          break;
        case "bundles":
          filter = "Bundles";
          break;
        default:
          filter = "";
          break;
      }

    if (sort_by)
      switch (sort_by) {
        case "Alphabetically_A-Z":
          sort = ["name", 1];
          break;
        case "Alphabetically_Z-A":
          sort = ["name", -1];
          break;
        case "Price_Low-High":
          sort = ["price", 1];
          break;
        case "Price_High-Low":
          sort = ["price", -1];
          break;
        case "Date_New-Old":
          sort = ["createdAt", -1];
          break;
        case "Date_Old-New":
          sort = ["createdAt", 1];
          break;
        default:
          sort = ["updatedAt", 1];
          break;
      }

    const products = await Product.find(
      filter || search
        ? {
            $or: [
              { category: filter },
              { title: { $regex: search, $options: "i" } },
            ],
          }
        : {}
    ).sort(
      sort_by
        ? {
            [sort[0]]: sort[1],
          }
        : {}
    );

    if (products.length === 0) throw new Error("No Product not found");

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const { product_name } = req.params;
    const urlName = product_name.replace(/-/g, " ");

    const product = await Product.findOne({ name: urlName });

    if (!product) throw new Error("Product not found");

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const addNewProduct = async (req, res) => {
  try {
    const {
      title,
      name,
      images,
      price,
      discount,
      category,
      summary,
      description,
      pairs_with,
      weight,
      benefits,
      ingredients,
      how_to_use,
      shelf_life,
      first_time,
      additional_info,
      in_stock,
    } = req.body;

    // Ensure only Admin can add new product
    const { user_id } = req.params;
    const user = await User.findById(user_id);
    if (!user || !user.isAdmin) throw new Error("Forbidden");

    //Upload images
    const imageResponse = await upload(images);
    const productImages = imageResponse.map((image) => image.secure_url);

    //Add new product
    const newProduct = await Product.create({
      title,
      name,
      images: productImages,
      price,
      discount,
      category,
      summary,
      description,
      pairs_with,
      weight,
      benefits,
      ingredients,
      how_to_use,
      shelf_life,
      first_time,
      additional_info,
      in_stock,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const editProduct = async (req, res) => {
  try {
    const {
      title,
      name,
      images,
      price,
      category,
      summary,
      description,
      pairs_with,
      benefits,
      ingredients,
      how_to_use,
      shelf_life,
      first_time,
      additional_info,
      in_stock,
      discount,
    } = req.body;

    const { user_id, product_id } = req.params;

    //Ensure only Admin can edit product
    const user = await User.findById(user_id);
    if (!user || !user.isAdmin) throw new Error("Forbidden");

    //Edit product
    const product = await Product.findById(product_id);

    //Upload images
    const imageResponse = await upload(images);
    const productImages = imageResponse.map((image) => image.secure_url);

    product.title = title;
    product.name = name;
    product.images = productImages;
    product.price = price;
    product.category = category;
    product.summary = summary;
    product.description = description;
    product.pairs_with = pairs_with;
    product.benefits = benefits;
    product.ingredients = ingredients;
    product.how_to_use = how_to_use;
    product.shelf_life = shelf_life;
    product.first_time = first_time;
    product.additional_info = additional_info;
    product.in_stock = in_stock;
    product.discount = discount;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { product_id, user_id } = req.params;

    // Ensure only Admin can add new product
    const user = await User.findById(user_id);
    if (!user || !user.isAdmin) throw new Error("Forbidden");

    //Delete product
    const product = await Product.deleteOne({ _id: product_id });

    res.status(202).json({ ...product, product_id });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
