import { Request, Response } from "express"
import { getRepository, getCustomRepository } from "typeorm"
import { Products } from "../entities/pg/Products";
import { ProductsRepository } from "../repositories/productsRepository"


class productsController {

    
    public async getProducts(req: Request,res: Response): Promise<Response> {


        try {

            const products = await getCustomRepository(ProductsRepository,'default').find();
        
            return res.json(products);
            
        } catch (error) {
            

            return res.json(error);

        }

    }

}

const porductscontroller = new productsController;
export default porductscontroller;