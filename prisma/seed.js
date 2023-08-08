import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { register } from '../controllers/register.js';

async function main(req,res) {
    
  
  try {

    const admin = await prisma.roles.upsert({
      create: {
        tipoRol: 'Administrador',
      },
      update: {
        tipoRol: 'Administrador',
      },
      where: {
        idRol: 1,
      },
    })
  
    const empleado = await prisma.roles.upsert({
      create: {
        tipoRol: 'Empleado',
      },
      update: {
        tipoRol: 'Empleado',
      },
      where: {
        idRol: 2,
      },
    })

    const lectura = await prisma.roles.upsert({
      create: {
        tipoRol: 'Usuario',
      },
      update: {
        tipoRol: 'Usuario',
      },
      where: {
        idRol: 3,
      },
    })


    const salt = await bcrypt.genSalt(10);
    const pass = "123456";
    const password = await bcrypt.hash(pass,salt);
    const newPass = password;
    const usuarios  = await prisma.usuarios.upsert( {
        create: {
          ID: 1,
          nombre: 'Admin',
          apellido: 'Admin',
          correo: 'admin@admin.com',
          contrasena:newPass,
          rol: {
            connect: { idRol: 1 },
          }
          
        },
        update: {
          ID: 1,
          nombre: 'Chris',
          apellido: 'Gonzalez',
          correo: 'admin@admin.com',
          contrasena:newPass,
          rol: {
            connect: { idRol: 1 },
          },
         
        },
        where: {
          idUsuarios: 1,
    
        },
      });

      // Categorias

      const chicaNegro = await prisma.categorias.upsert({
        create: {
          tipo: 'Dark',
        },
        update: {
          tipo: 'Dark',

        },
        where: {
          idCats: 1,
        },
      })

      const medianaNegro = await prisma.categorias.upsert({
          create: {
          tipo: 'verano',
        },
        update: {
          tipo: 'verano',

        },
        where: {
          idCats: 2,
        },
      })

      const grandeNegro = await prisma.categorias.upsert({
          create: {
          tipo: 'light',
        },
        update: {
          tipo: 'light',

        },
        where: {
          idCats: 3,
        },
      })

      const extragNegro = await prisma.categorias.upsert({
          create: {
          tipo: 'creativo',
        },
        update: {
          tipo: 'creativo',

        },
        where: {
          idCats: 4,
        },
      })

      const chicaBlanco = await prisma.categorias.upsert({
         create: {
          tipo: 'computo',
        },
        update: {
          tipo: 'computo',

        },
        where: {
          idCats: 5,
        },
      })

      const medianaBlanco = await prisma.categorias.upsert({
          create: {
          tipo: 'solecito',
        },
        update: {
          tipo: 'solecito',

        },
        where: {
          idCats: 6,
        },
      })

      const grandeBlanco = await prisma.categorias.upsert({
        create: {
          tipo: 'pastel',
        },
        update: {
          tipo: 'pastel',

        },
        where: {
          idCats: 7,
        },
      })

      const extragBlanco = await prisma.categorias.upsert({
        create: {
          tipo: 'bosque',
        },
        update: {
          tipo: 'bosque',

        },
        where: {
          idCats: 8,
        },
      })

      const chicaRojo = await prisma.categorias.upsert({
        create: {
          tipo: 'small',
        },
        update: {
          tipo: 'small',

        },
        where: {
          idCats: 9,
        },
      })

      const medianaRojo = await prisma.categorias.upsert({
        create: {
          tipo: 'fire',
        },
        update: {
          tipo: 'fire',

        },
        where: {
          idCats: 10,
        },
      })

      const grandeRojo = await prisma.categorias.upsert({
        create: {
          tipo: 'otro',
        },
        update: {
          tipo: 'otro',

        },
        where: {
          idCats: 11,
        },
      })

      const extragRojo = await prisma.categorias.upsert({
        create: {
          tipo: 'animal',
        },
        update: {
          tipo: 'animal',

        },
        where: {
          idCats: 12,
        },
      })

      const chicaAzul = await prisma.categorias.upsert({
        create: {
          tipo: 'aventura',
        },
        update: {
          tipo: 'aventura',

        },
        where: {
          idCats: 13,
        },
      })

      const medianaAzul = await prisma.categorias.upsert({
        create: {
          tipo: 'mar',
        },
        update: {
          tipo: 'mar',

        },
        where: {
          idCats: 14,
        },
      })

      const grandeAzul = await prisma.categorias.upsert({
        create: {
          tipo: 'big',
        },
        update: {
          tipo: 'big',

        },
        where: {
          idCats: 15,
        },
      })


      // Productos

      // Playeras
      const camisachicaRyuki = await prisma.publicacion.upsert({ // alan azul
        create: {
          idCat: 2,
          idUser: 1,
          nombre: 'Aventuras en CCD',
          descripcion: 'mis aventuras en ccd',
          like: 70,
          guardado: false,
          imagen: '',
        },
        update: { 
          idCat: 2,
          idUser: 1,
          nombre: 'Aventuras en CCD',
          descripcion: 'mis aventuras en ccd',
          like: 70,
          guardado: false,
          imagen: '',
        },
        where: {
          idProds: 1,
        },
      })

      const cdsd = await prisma.publicacion.upsert({ // alan azul
        create: {
          idCat: 2,
          idUser: 1,
          nombre: 'Aventuras en CCD',
          descripcion: 'mis aventuras en ccd',
          like: 70,
          guardado: false,
          imagen: '',
        },
        update: { 
          idCat: 5,
          idUser: 1,
          nombre: 'paisaje de arte',
          descripcion: 'Un paisaje muy bonito, me gusto la imagen',
          like: 2,
          guardado: true,
          imagen: '',
        },
        where: {
          idProds: 2,
        },
      })


      // Create token
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiJsdWlzQGdtYWlsLmNvbSIsImlhdCI6MTY2MjU2MzM4NCwiZXhwIjoxNjYyNTcwNTg0fQ.atQaLq7pjXULP4VRcntE1MzQBLqu4dRkvZpVIxZV04F";
        // save user token
        usuarios.token = token;
            
        // return new user
        res.status(201).json(usuarios);
      } catch (err) {
        console.log(err);
      }

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
