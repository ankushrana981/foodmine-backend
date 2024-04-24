import { Router } from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken'

const router = Router();

router.post('/login', async (req,res)=>{
          const {email, password} = req.body;
          try {
             const user = sample_users.find(user => user.email === email && user.password === password);
             if(!user){
                return res.status(404).json({message: "User not found"});
             }
             if(user){
                const token = jwt.sign(req.body, process.env.SECREAT_KEY! , { expiresIn: "30d" })
                res.status(200).send({data: user ,message: "Login Succesfully", token: token});
             }
       
          } catch (error) {
             console.log(error);
             res.status(500).json({message: "Internal Server Error"});
          }
       })

export default router