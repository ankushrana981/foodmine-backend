import { verify } from "jsonwebtoken";

export default (req:any, res:any, next:any)=>{
          const token = req.headers.access_token;
          if(!token) return ;

          try {
          const DecodToken = verify(token, process.env.SECREAT_KEY!)
          req.user = DecodToken;

          } catch (error) {
              res.status(401).send({error: "Unauthorized access token"})      
          }
          return next()
}