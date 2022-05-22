const { check } = require("express-validator");
const express = require("express");
const router = express.Router();

const {
  getProductById,
  getProduct,
  createProduct,
  photo,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllUniqueCategoies,
} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { getAllCategory } = require("../controllers/category");

//all param middleware
router.param("productId", getProductById);
router.param("userId", getUserById);

//actual routes
//get route
router.get("/product/get-product/:productId", getProductById, getProduct);
router.get("/product/photo/:productId", photo);

//create route
router.post(
  "/product/create-product/:userId",
  //TODO: express-validator not validating
  check("name")
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 chars long"),
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//upadte route
router.put(
  "/product/update/:productId/:userId",
  getProductById,
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

//delete route
router.delete(
  "/product/delete-product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

//listing route
router.get("/product/get-all-product", getAllProducts);

router.get("/product/categoies", getAllUniqueCategoies);
module.exports = router;
