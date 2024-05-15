import { Schema, Types, model } from "mongoose";
import { Food, foodSchema } from "./food.modal";
import { OrderStatus } from "../constants/order_status";

export interface LatLng{
          lat:string;
          lng:string;
}

export const LatLngSchema = new Schema<LatLng>({
          lat:{type:String, requited:true},
          lng:{type:String, requited:true}
})        

export interface OrderItem{
          food:Food;
          totalPrice:number;
          quantity:number;
}

export const orderItemSchema = new Schema<OrderItem>({
          food:{type:foodSchema, required:true},
          totalPrice:{type:Number, required:true},
          quantity:{type:Number, required:true}

})

export interface Order {
          id: number;
          items: OrderItem[];
          totalPrice: number;
          name: string;
          address:string;
          addressLatLng:LatLng;
          paymentId: string;
          user:Types.ObjectId;
          status: OrderStatus;
          createdAt:Date;
          updatedAt:Date;
}


export const OrderSchema = new Schema<Order>({
          name:{type:String, required:true},
          items:{type:[orderItemSchema], required:true},
          totalPrice:{type:Number, required:true},
          address:{type:String, required:true},
          addressLatLng:{type:LatLngSchema, required:true},
          paymentId:{type:String, required:true},
          user:{type:Schema.Types.ObjectId, required:true},
          status:{type:String,default:OrderStatus.NEW, required:true},
},{
          timestamps: true,
          toJSON: {
                    virtuals: true
          },
          toObject: {
                    virtuals: true
          }
})

export const OrderModel = model<Order>('OrderModel',OrderSchema)
 