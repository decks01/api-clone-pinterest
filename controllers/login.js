
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const login = async (req, res) => {

    try {
        // Get user input
        const { ID, contrasena } = req.body;
    
        // Validate user input
        if (!(ID && contrasena)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exists in our database

    //     const user = await prisma.usuarios.findUnique({ correo: req.body.correo });
    // if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });
    const IDparse = parseInt(ID)
    const result = await prisma.usuarios.findUnique({
      where: {
        ID: IDparse
      },
    })
    // const validPassword = await bcrypt.compare(req.body.contrasena, user.contrasena);
    if (result && (await bcrypt.compare(contrasena, result.contrasena))) {
          // Create token
          const token = jwt.sign(
            { ID: result._id, IDparse },
            process.env.TOKEN_KEY
          );
    
          // save user token
          result.token = token;
            
          // user
          res.status(200).json({data: result});
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log('error en credenciales');
        console.log(err);
      }
    
  };
  