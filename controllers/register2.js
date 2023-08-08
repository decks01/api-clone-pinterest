
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register2 = async (req, res) => {
    try {
        // Get user input
        const { ID, nombre, apellido, correo, imagen, contrasena } = req.body;
        const validCorreo = await prisma.usuarios.findUnique({
          where: {
            ID: ID,
          },
        })
        
        if(validCorreo){
            res.send(" Ya existe el usaurio")
            return;
        }
        if (!(ID && correo  && nombre && apellido && imagen  && contrasena)) {  
          res.status(400).send("All input is required");
        } else if (validCorreo) {
          res.status(200).send("El correo ya existe.");
        }

        
              
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.contrasena, salt);

        const user = await prisma.usuarios.create({
            data: {
              ID,
              nombre,
              apellido,
              correo,
              imagen,
              contrasena:password,
              rol: {
                connect: { idRol: Number(2) },
              },
            },
          });
    
        // Create token
        const token = jwt.sign(
          { idUsuarios: user._id, ID },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        // save user token
        user.token = token;
    
        // return new user
        res.status(201).json(user);
      } catch (err) {
        console.log(err);
      }
      // Our register logic ends here
  };
  