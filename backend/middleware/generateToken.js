import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({id}, 'alpha', {
    expiresIn : '30d'
  });
}

export default generateToken;