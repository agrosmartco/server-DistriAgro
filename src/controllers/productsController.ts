import { Request, Response } from "express"
import { getRepository, getCustomRepository } from "typeorm"
import { Products } from "../entities/pg/Products";
import { ProductsRepository } from "../repositories/productsRepository"
import s3 from "../services/aws-s3"


class productsController {


    public async getProducts(req: Request, res: Response): Promise<Response> {

        try {

            const products: Products | any = await getCustomRepository(ProductsRepository, 'default').find();

            return res.json(products);

        } catch (error) {

            return res.status(404).json({ message: 'Products not found ' + error });

        }

    }

    public async createProduct(req: Request, res: Response): Promise<Response> {

        const s3Client = s3.s3Client;
        const params = s3.uploadParams;

        try {

            var product = JSON.parse(req.body.product);

            const createdProduct = await getCustomRepository(ProductsRepository, 'default').save(product) as Products;

            params.Key = createdProduct.reference+'.'+req.file.mimetype.substring(6, 10);  
            console.log(params.Key);
                      
            params.Body = req.file.buffer;

            const response = s3Client.upload(params, (err:any, data:any)=>{
                if (err) {
                    console.log({error:"Error -> " + err});
                    
                }
                console.log({message: 'File uploaded successfully! -> keyname = ' + params.Key});
              
            });
           
            return res.json(createdProduct);

        } catch (error) {

            return res.status(404).json({ message: 'Create products not found ', error })

        }

    }

}

const porductscontroller = new productsController;
export default porductscontroller;