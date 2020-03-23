import { Router } from "express"
import productscontroller from "../controllers/productsController"
import passport from "passport"
import upload from "../config/multer.config"

const router = Router();

/**
 * @api {get} /products Show all products
 * @apiName GetProducts
 * @apiGroup Products
 *
 * @apiSuccess {String} id id of the Product.
 * @apiSuccess {String} description  description of the Product.
 * @apiSuccess {Number} price  price of the Product.
 * @apiSuccess {Number} quantity  quantity of the Product.
 * @apiSuccess {String} image  image of the Product.
 * 
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
        "id": "5e5973deea960c30d817d10a",
        "description": "Banano UR",
        "price": 2000,
        "quantity": 100,
        "image": "string"
    }
 *
 * @apiError ProductNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ProductNotFound"
 *     }
 */
router.get('/products', productscontroller.getProducts);

router.post('/products', upload.single('file'), productscontroller.createProduct);



export default router;