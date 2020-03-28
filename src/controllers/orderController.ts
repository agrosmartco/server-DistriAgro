import {Request, Response} from 'express';
import {getRepository, getCustomRepository} from 'typeorm';
import {OrderHeader} from '../entities/pg/OrderHeader';
import {OrderBody} from '../entities/pg/orderBody';
import {OrderBodyRepository} from '../repositories/orderBodyRepository';

class orderController {
  public async getOrders(req: Request, res: Response): Promise<Response> {
    try {
      const orders = await getRepository(
        OrderHeader,
        process.env.CONNECTION_PG,
      ).find();

      return res.json(orders);
    } catch (error) {
      return res.status(500).json({message: 'Error GetOrders', error});
    }
  }

  public async getOneOrder(req: Request, res: Response): Promise<any> {
    try {
      const idOrder = parseInt(req.params.id);
      const orderHeader = (await getRepository(
        OrderHeader,
        process.env.CONNECTION_PG,
      ).findOne(idOrder)) as OrderHeader;

      console.log(orderHeader.id);

      const orderBody = await getCustomRepository(
        OrderBodyRepository,
        process.env.CONNECTION_PG,
      ).findByOrderHeader(orderHeader.id);

      return res.json({orderHeader, orderBody});
    } catch (error) {
      return res.status(500).json({message: 'Error GetOneOrders', error});
    }
  }

  public async createOrder(req: Request, res: Response): Promise<Response> {
    const newOrderHeader: OrderHeader | any = req.body.orderHeader;
    var newOrderBody = req.body.orderBody;
    var savedOrderBody;

    try {
      const orderHeader = new OrderHeader();
      orderHeader.id = newOrderHeader.id;
      orderHeader.date = new Date(newOrderHeader.date);
      orderHeader.id_client =
        parseInt(newOrderHeader.id_client) | newOrderHeader.id_client;
      orderHeader.name_client = newOrderHeader.name_client;
      orderHeader.address = newOrderHeader.address;

      const savedOrderHeader = (await getRepository(
        OrderHeader,
        process.env.CONNECTION_PG,
      ).save(orderHeader)) as OrderHeader;

      const orderId = await getRepository(
        OrderHeader,
        process.env.CONNECTION_PG,
      )
        .createQueryBuilder()
        .select('MAX(id) as id')
        .getRawOne();

      newOrderBody.forEach(async (res: OrderBody) => {
        var orderBody = res;
        orderBody.id_order = orderId.id;

        savedOrderBody = await getCustomRepository(
          OrderBodyRepository,
          process.env.CONNECTION_PG,
        ).save(orderBody);
      });

      return res.json({savedOrderHeader});
    } catch (error) {
      return res.status(500).json({message: 'Error CreateOrder', error});
    }
  }
}

const ordercontroller = new orderController();
export default ordercontroller;
