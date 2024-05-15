import Router from 'express';
import { OrderModel } from '../modals/order.modal';
import { OrderStatus } from '../constants/order_status';
import  auth  from '../middlewares/auth.mid'

const router = Router();
router.use(auth);
router.post('/create', async (req:any, res:any) => {
          try {
          const requestOrder = req.body;
          // if there is not item in order 
          if(requestOrder.items.length <= 0){
                   return res.status(404).send("Cart is Empty");
          }
          // if customer has already order and want a new order then 
         await OrderModel.deleteOne({
          user : req.user.id,
          status: OrderStatus.NEW,
         })
           const newOrder = new OrderModel({...requestOrder, user: req.user.id})
           await newOrder.save(); 
           res.send(newOrder)        
          } catch (error) {
                    
          }
})

export default router;