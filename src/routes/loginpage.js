import { Router } from "express";
export const loginpage = Router();
import env from "dotenv";
env.config();

loginpage.get('/',async (req, res) => {
    try{
        const token = req.cookies.token;
        if(!token){
          res.render("LoginPage", {
            code: "login",
            error: '',
          });
        }
        else{
          const result = await jwt.verify(token,"Text-Tools_secret_key_CreatedBy_Kartik_Hatwar_for_registered_users");
  
          if(result){
            res.render('index.ejs')
          }
          else{
            res.render("LoginPage", {
              code: "login",
              error: '',
            });
          }
          }
        }
    catch{
      res.redirect('/error');
    }
  });


