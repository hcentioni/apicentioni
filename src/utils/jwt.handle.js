import "dotenv/config";
import { sign, verify } from "jsonwebtoken";
const JWT_SECRET = process.env.SECRETO

const generateToken = async (id)=>{
    const jwt = sign ({id},JWT_SECRET,{
        expiresIn : "12h",
    });
    return jwt;
}
const verifyToken =  (jwt)=>{
    const isOk = verify(jwt,JWT_SECRET);
    return isOk;
}
export {verifyToken,generateToken} ;