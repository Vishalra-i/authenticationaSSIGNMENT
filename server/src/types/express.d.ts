import  User from "../models/user.model"; 

// Extend the Express namespace
declare global {
  namespace Express {
    export interface Request {
      user: User | null; 
    }
  }
}
