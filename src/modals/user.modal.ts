import { Schema, model } from "mongoose";

export interface NewUser{
          id:string;
          name: string;
          email: string;
          password: string;
          confirmPassword: string;
          address: string;
          token:string;
          isAdmin:boolean;
}

const NewUserSchema = new Schema<NewUser>({
          name:{type:String, required:true},
          email:{type:String, required:true},
          password:{type:String, required:true},
          confirmPassword:{type:String, required:true},
          address:{type:String, required:true},
          isAdmin: {type: Boolean, required: true},
          token:{type:String}        
},{
          timestamps:true,
          toJSON: {
                    virtuals: true
          },
          toObject: {
                    virtuals: true
          }
}
)

export const UserModel = model<NewUser>('UserModel', NewUserSchema)