import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();



export const Uauth = async (req,res,next)=>{
   try {

    const token = req.cookies.token;
    
    if(!token) res.redirect('/loginpage');
    else{
        const verifyUser2 = jwt.verify(token,"Text-Tools_secret_key_CreatedBy_Kartik_Hatwar_for_registered_users")
        if(!verifyUser2){ 
            res.redirect('/loginpage');
        }
        else{
            next();
        }
    }
    
    
   } catch (err) {
        res.send(`auth sending :  ${err}`);
   }
}