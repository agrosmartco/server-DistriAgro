import { Router } from 'express';
import productscontroller from '../controllers/productsController';
import passport from 'passport';
import upload from '../config/multer.config';
import permit from '../middlewares/permission';

const router = Router();

/**
 * @api {get} /products Show all products
 * @apiName GetProducts
 * @apiGroup Products
 *
 * @apiSuccess {String} id id of the Product.
 * @apiSuccess {String} reference reference of product.
 * @apiSuccess {String} description  description of the Product.
 * @apiSuccess {Number} category  category of the Product.
 * @apiSuccess {Number} price  price of the Product.
 * @apiSuccess {Number} quantity  quantity of the Product.
 * @apiSuccess {String} barcode  barcode of the Product.
 * @apiSuccess {String} image  image of the Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *   "id": "1",
 *   "reference": "V0001",
 *   "description": "Arveja",
 *   "idcategory": 2,
 *   "price": 1500,
 *   "quantity": 500,
 *   "barcode": "0000011111",
 *   "image": ""
 *   }
 *
 * @apiError Products not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *      { message: Products not found }
 */
router.get('/products', productscontroller.getProducts);

/**
 * @api {get} /products Show one products
 * @apiName GetOneProduct
 * @apiGroup Products
 *
 * @apiSuccess {String} id id of the Product.
 * @apiSuccess {String} reference reference of product.
 * @apiSuccess {String} description  description of the Product.
 * @apiSuccess {Number} category  category of the Product.
 * @apiSuccess {Number} price  price of the Product.
 * @apiSuccess {Number} quantity  quantity of the Product.
 * @apiSuccess {String} barcode  barcode of the Product.
 * @apiSuccess {String} image  image of the Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *   "id": "1",
 *   "reference": "V0001",
 *   "description": "Arveja",
 *   "idcategory": 2,
 *   "price": 1500,
 *   "quantity": 500,
 *   "barcode": "0000011111",
 *   "image": ""
 *   }
 *
 * @apiError Products not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *      { message: Products not found }
 */
router.get('/products/:reference', productscontroller.getOneProduct);

/**
 * @api {post} /products Create new products
 * @apiName CreateProducts
 * @apiGroup Products
 *
 * @apiSuccess {String} reference reference of product.
 * @apiSuccess {String} description  description of the Product.
 * @apiSuccess {Number} category  category of the Product.
 * @apiSuccess {Number} price  price of the Product.
 * @apiSuccess {Number} quantity  quantity of the Product.
 * @apiSuccess {String} barcode  barcode of the Product.
 * @apiSuccess {String} image  image of the Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *   "id": "1",
 *   "reference": "V0001",
 *   "description": "Arveja",
 *   "idcategory": 2,
 *   "price": 1500,
 *   "quantity": 500,
 *   "barcode": "0000011111",
 *   "image": ""
 *   }
 *
 * @apiError The product already in the DB.
 * @apiError Create products not found.
 * @apiError Please upload an image.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 * { message: Create products not found }
 */
router.post(
	'/products',
	passport.authenticate('jwt', { session: false }),
	permit([ 'admin', 'support' ]),
	upload.single('file'),
	productscontroller.createProduct
);

/**
 * @api {delete} /products delete product
 * @apiName DeleteProduct
 * @apiGroup Products
 *
 * @apiSuccess {String} reference reference of product.
 * @apiSuccess {String} description  description of the Product.
 * @apiSuccess {Number} category  category of the Product.
 * @apiSuccess {Number} price  price of the Product.
 * @apiSuccess {Number} quantity  quantity of the Product.
 * @apiSuccess {String} barcode  barcode of the Product.
 * @apiSuccess {String} image  image of the Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *   "id": "1",
 *   "reference": "V0001",
 *   "description": "Arveja",
 *   "idcategory": 2,
 *   "price": 1500,
 *   "quantity": 500,
 *   "barcode": "0000011111",
 *   "image": ""
 *   }
 *
 * @apiError Create products not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 * { message: Create products not found }
 */
router.delete(
	'/products/:reference/',
	passport.authenticate('jwt', { session: false }),
	permit([ 'admin', 'support' ]),
	productscontroller.deleteProduct
);

export default router;
