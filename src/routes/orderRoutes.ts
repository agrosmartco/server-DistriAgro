import {Router} from 'express';
import passport from 'passport';
import permit from '../middlewares/permission';
import ordercontroller from '../controllers/orderController';

const router = Router();

router.get(
  '/order',
  passport.authenticate('jwt', {session: false}),
  permit(['admin', 'customer']),
  ordercontroller.getOrders,
);
router.get(
  '/order/:id',
  passport.authenticate('jwt', {session: false}),
  permit(['customer']),
  ordercontroller.getOneOrder,
);
router.post(
  '/order',
  passport.authenticate('jwt', {session: false}),
  permit(['customer']),
  ordercontroller.createOrder,
);

export default router;
