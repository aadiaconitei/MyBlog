import jwt, { sign, SignOptions } from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

/**
 * generates JWT used for local testing
 */
export function generateToken() {
  // information to be encoded in the JWT
  const payload = {
    name: "ReactBlog",
    accessTypes: ["getPosts", "addPost", "updatePost", "deletePost"],
  };

  const signInOptions: SignOptions = {
    algorithm: "HS256",
    expiresIn: "1h",
  };

  // generate JWT
  const key: any = process.env.SECRET_KEY;
  return sign(payload, key, signInOptions);
}

export function verifyToken(req: any, res: any) {
  let token = req.headers["x-access-token"];
  console.log("token", token);
  if (!token) {
    return false;
    // return res.status(403).send({
    //   message: "No token provided!"
    // });
  }
  let key: any = process.env.SECRET_KEY;
  jwt.verify(token, key, (err: any, decoded: any) => {
    if (err) {
      return false;
      // return res.status(401).send({
      //   message: "Unauthorized!"
      // });
    }
    //req.admin = decoded.admin;
    console.log("decoded", decoded);
  });
  return true;
}