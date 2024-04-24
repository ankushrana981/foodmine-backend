import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../modals/user.modal';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/login', async (req, res) => {
   const { email, password } = req.body;
   try {
      const user = await UserModel.findOne({ email });
      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }
      console.log(user.password,"user.password")
      console.log(password,"password")
      bcrypt.compare(password,user.password, (error,isMatch) =>{
         if(!isMatch){
           return res.status(404).json({message:"Invalid password"});
         }
         const token = jwt.sign(req.body, process.env.SECREAT_KEY!, { expiresIn: "30d" })
         return res.status(200).send({ data: user, message: "Login Succesfully", token: token });
      })

   } catch (error) {
      console.log(error);
       res.status(500).json({ message: "Internal Server Error" });
   }
})
router.post('/register', async (req, res) => {
   const { password, email } = req.body;
   try {
      const user = await UserModel.findOne({ email })
      if (user) return res.status(400).send("User Already Registered , Please login!")

      bcrypt.hash(password, 10, async (err, hashedPassword) => {
         if (err) console.log("Password Hashed Failed")
         if (hashedPassword) {
            console.log("Hashed Password", hashedPassword)
            try {
               const NewUser = await UserModel.create(
                  {
                     ...req.body,
                     password: hashedPassword
                  }
               )
               res.status(200).json({ message: "User created successfully" })
            } catch (error) {
               res.status(500).json({ message: error });
            }
         }
      })
   } catch (error) {
      res.status(500).json({ message: error });
   }
})

export default router