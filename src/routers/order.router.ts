import Router from 'express';
import { OrderModel } from '../modals/order.modal';
import { OrderStatus } from '../constants/order_status';
import auth from '../middlewares/auth.mid'

const router = Router();
router.use(auth);
router.post('/create', async (req: any, res: any) => {
  try {
    const requestOrder = req.body;
    console.log(requestOrder, "requestOrder")
    // if there is not item in order 
    if (requestOrder.items.length <= 0) {
      return res.status(404).send("Cart is Empty");
    }
    console.log(req.user.id,"req.user.id 1")
    // if customer has already order and want a new order then 
    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    })
    console.log(req.user.id,"req.user.id 2")

    const newOrder = new OrderModel({ ...requestOrder, user: req.user.id })
    await newOrder.save();
    return res.send(newOrder)
  } catch (error) {
    return res.status(404).send({ error: error })
  }
})

router.get('/newOrderForCurrentUser', async (req: any, res) => {
  const order = await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW })

  if (order) res.send(order);
  else res.status(404).send("Order not found")
})

export default router;