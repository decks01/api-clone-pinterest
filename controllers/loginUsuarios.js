
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const loginUsuario = async (req, res) => {

    try {
        // Get user input
        const { ID, correo } = req.body;
      console.log(ID);
        // Validate user input
        if (!(ID )) {
          res.status(400).send("All input is required");
        }
        // Validate if user exists in our database

    //     const user = await prisma.usuarios.findUnique({ correo: req.body.correo });
    // if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });
    
    const result = await prisma.users.findUnique({
      where: {
        ID: ID
      },
    })

    console.log(result);
    // const validPassword = await bcrypt.compare(req.body.contrasena, user.contrasena);
    if (result) {
          // Create token
          const token = jwt.sign(
            { ID: result._id, ID },
            process.env.TOKEN_KEY
          );
    
          // save user token
          result.token = token;
            
          // user
          res.status(200).json({data: result});
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log('error en credenciales desde usaurios');
      }
    
  };
  