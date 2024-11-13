import  User from "../models/user.model"; 

export interface UserToken {
  _id : string ,
  role : string
}
// Extend the Express namespace
declare global {
  namespace Express {
    export interface Request {
      user? : UserToken ; 
    }
  }
}
