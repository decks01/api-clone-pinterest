import { PrismaClient, Prisma } from "@prisma/client";
// import { RequestHandler } from "express";
// import { ipFileServer } from "../config/constants.js";
import multerUpload from '../middlewares/multer.js';


const prisma = new PrismaClient();

export const getProducts =async (req, res) => {
    try {
      const publicacion = await prisma.publicacion.findMany({
        include: {
          cat: true,
        },
      });
  console.log('entre a getproduct', publicacion);

      res.send(publicacion);
    } catch (error) {
      // res.status(403)
      res.send(error);

    }
};

export const getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const publicacion = await prisma.publicacion.findUnique({
        where: {
          idProds: Number(id),
        },
      });
      res.json(publicacion);
    } catch (error) {
      res.status(403)
    }
};

export const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const publicacion = await prisma.publicacion.delete({
        where: {
          idProds: Number(id),
        }
      });
      res.send(publicacion); 
    } catch (error) {
      res.status("NO SE PUDO BORRAR ESTE PRODUCTO")  
    }
};

export const updateProduct = async (req, res) => {
    try {
      const {idCat,idUser,nombre,descripcion,like,guardado,imagen} = req.body;
      const { id } = req.params;
      const publicacion = await prisma.publicacion.update({
        where: { idProds: Number(id) },
        data: {
          idCat,
          idUser,
          nombre,
          descripcion,
          like,
          guardado,
          imagen,
        },
      });
      res.send(publicacion);
      console.log(publicacion);
    } catch (error) {
      res.send("NO SE PUDO ACTUALIZAR ESTE PRODUCTO");
    }
};

export const createProduct = async (req, res) => {
    try {
      const {idCat,idUser,nombre,descripcion,like,guardado,imagen} = req.body;
      const publicacion = await prisma.publicacion.create({
        data: {
          idCat,
          idUser,
          nombre,
          descripcion,
          like,
          guardado,
          imagen,
        },
      });
      res.send(publicacion);
      console.log("publicacion CREATE", publicacion);
    } catch (error) {
      console.log(error);
      // res.send("NO SE PUDO CREAR ESTE PRODUCTO");
      res.send(error.message);
    }
  };

  export const createProductImage = async (req, res) => {
    try {
      const {imagen} = req.body;
      const { id } = req.params;
      const publicacion = await prisma.publicacion.update({
        where: { idProds: Number(id) },
        data: {
            imagen,
        },
      });
      res.status(200).send("Se creo producto");
      console.log("publicacion CREATE", publicacion);  
    } catch (error) {
      console.log(error);
      // res.send("NO SE PUDO CREAR ESTE PRODUCTO");
      res.send(error);
    }
  };

  export const updateImgproduct = async (req, res) => {
    try {
      const {imagen} = req.body;
      const { id } = req.params;
      const publicacion = await prisma.publicacion.update({
        where: { idProds: Number(id) },
        data: {
          imagen
        },
      });
      res.send(publicacion);
      console.log(publicacion);
    } catch (error) {
      console.log(error);
      res.send("NO SE PUDO ACTUALIZAR ESTE PRODUCTO");
    }
};

// export const updateImg = async(req, res) => {
//   const { body } = req;
//   const newBody = {
//     ...body,
//     image: req.file.path,
//   };
//   console.log("====================================");
//   console.log(body);
//   console.log("====================================");
//   prisma.products
//     .update({
//       data: newBody,
//     })
//     .then((data) => {
//       res.status(200).send({
//         message: "Success Post Books",
//         status: 200,
//         data,
//       });
//     })
//     .catch((error) => {
//       res.status(500).send({
//         message: "Error Post Books",
//         status: 500,
//         error,
//       });
//     });
// };

// export const createUrlimage = async (req, res, next) => {
//     const { file } = req
//     try {
//         return res.status(200).json({
//           "mesagge": "Archivo Cargado",
//           "url": `${ipFileServer}${file?.filename}`,
//           "name": file?.filename
//         })
//     } catch (error) {
//         return res.status(500).json({
//           "mesagge": "Error al carcar archivo",
//           "error": error
//         })
//     }
// }