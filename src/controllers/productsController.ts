import {Request, Response} from 'express';
import {getCustomRepository} from 'typeorm';
import {Products} from '../entities/pg/Products';
import {ProductsRepository} from '../repositories/productsRepository';
import s3 from '../services/aws-s3';

class productsController {
  public async getProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products: Products | any = await getCustomRepository(
        ProductsRepository,
        process.env.CONNECTION_PG,
      ).find();

      return res.json(products);
    } catch (error) {
      return res.status(404).json({message: 'Products not found ' + error});
    }
  }

  public async getOneProduct(req: Request, res: Response): Promise<Response> {
    try {
      const reference = req.params.reference;
      const product = await getCustomRepository(
        ProductsRepository,
        process.env.CONNECTION_PG,
      ).findByReference(reference);

      if (!product) {
        return res.status(404).json({message: 'Product Not Found'});
      }

      return res.json(product);
    } catch (error) {
      return res
        .status(500)
        .json({message: 'Error in function GetOneProduct', error});
    }
  }

  public async createProduct(req: Request, res: Response): Promise<Response> {
    const s3Client = s3.s3Client;
    const params = s3.uploadParams;

    try {
      var product = JSON.parse(req.body.product);

      const validateProduct = await getCustomRepository(
        ProductsRepository,
        process.env.CONNECTION_PG,
      ).findByReference(product.reference);

      if (validateProduct) {
        return res.status(200).json({message: 'The product already in the DB'});
      }

      if (!req.file) {
        return res.status(404).json({message: 'Please upload an image'});
      }

      const saveProduct = new Products();
      saveProduct.id = product.id;
      saveProduct.reference = product.reference;
      saveProduct.description = product.description;
      saveProduct.idcategory =
        parseInt(product.idcategory) || product.idcategory;
      saveProduct.price = parseInt(product.price) || product.price;
      saveProduct.quantity = parseInt(product.quantity) || product.quantity;
      saveProduct.barcode = product.barcode;
      saveProduct.image = product.image;

      const createdProduct = (await getCustomRepository(
        ProductsRepository,
        process.env.CONNECTION_PG,
      ).save(saveProduct)) as Products;
      params.Key =
        createdProduct.reference + '.' + req.file.mimetype.substring(6, 10);

      params.Body = req.file.buffer;

      if (createdProduct.idcategory == 1) {
        params.Bucket = 'agromarketco/items/fruver';
      } else {
        params.Bucket = 'agromarketco/items/psmt';
      }

      await s3Client.upload(params, (err: any, data: any) => {
        if (err) {
          console.log({error: 'Error -> ' + err + data});
        }
        console.log({
          message: 'File uploaded successfully! -> keyname = ' + params.Key,
        });
      });

      return res.json(createdProduct);
    } catch (error) {
      return res
        .status(404)
        .json({message: 'Create products not found ', error});
    }
  }

  public async deleteProduct(req: Request, res: Response): Promise<Response> {
    const reference = req.params.reference;

    try {
      const product = (await getCustomRepository(
        ProductsRepository,
        process.env.CONNECTION_PG,
      ).findByReference(reference)) as Products;

      if (!product) {
        res.status(404).json({message: 'Product not Found'});
      }

      const productDelete = (await getCustomRepository(
        ProductsRepository,
        process.env.CONNECTION_PG,
      ).remove(product)) as Products;

      if (productDelete) {
        return res.json({
          message:
            'The product ' +
            product.description +
            ' ' +
            product.reference +
            ' was deleted ',
          data: {productDelete},
        });
      }

      return res.status(404).json({message: 'Not user was deleted'});
    } catch (error) {
      return res.status(500).json({message: 'Error deleteProduct', error});
    }
  }

  public async updateProduct(req: Request, res: Response): Promise<Response> {
    try {
      const reference = req.params.reference;
      const NewDataProduct = req.body;

      const product: Products | any = await getCustomRepository(
        ProductsRepository,
        process.env.CONNECTION_PG,
      ).findByReference(reference);

      if (!product) {
        return res.status(404).json({message: 'Product Not Found'});
      }

      const updateProduct = new Products();
      updateProduct.id = product.id;
      updateProduct.reference = NewDataProduct.reference;
      updateProduct.description = NewDataProduct.description;
      updateProduct.idcategory =
        parseInt(NewDataProduct.idcategory) || NewDataProduct.idcategory;
      updateProduct.price =
        parseInt(NewDataProduct.price) || NewDataProduct.price;
      updateProduct.quantity =
        parseInt(NewDataProduct.quantity) || NewDataProduct.quantity;
      updateProduct.barcode = NewDataProduct.barcode;
      updateProduct.image = NewDataProduct.image;

      getCustomRepository(ProductsRepository, process.env.CONNECTION_PG).merge(
        product,
        updateProduct,
      );

      const saveProduct = await getCustomRepository(
        ProductsRepository,
        process.env.CONNECTION_PG,
      ).save(product);

      return res.json(saveProduct);
    } catch (error) {
      return res.status(500).json({message: 'UpdateUserNotFound', error});
    }
  }
}

const porductscontroller = new productsController();
export default porductscontroller;
