import express from 'express';
import {createProduct,createProductImage, updateImgproduct, deleteProduct, getProducts, getProductById, updateProduct,} from '../controllers/products.js';
import multerUpload from '../middlewares/multer.js';
import { dirname, extname, join } from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

router.get('/', getProducts);







router.post('/upload', multerUpload.single('imagen'),  (req, res) => {
    console.log(req.file);
    res.sendStatus(200);
});
const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));

// router.put('/uploading/:id', multerUpload.single('imagen'), async (req, res) => {
//         try {
    
//         console.log('CURRENT_DIRCURRENT_DIRCURRENT_DIR',CURRENT_DIR);
//             console.log("req.body ESTE EL REQ IMAGEN ---------------------",req.file);
//           console.log("create entre");
//         //   const {imagen} = req.body;
          
//           console.log("ESTA ES LA DATA DE LA IMAGEN");   
          
//           const imagenUpdate =  join( 'public/images/'+req.file.filename ) 
//         //   const imagenUpdate = `${CURRENT_DIR, req.file.filename}`
//         const { id } = req.params;
            
//           const publicacion = await prisma.publicacion.update({
//             where: {
//               idProds: Number(id)
//             },
//             data: {
//                 imagen: imagenUpdate,
//             },
//           });

//           if(publicacion){
//             res.status(200).send("SE CREO LA IMAGEN");
//           }
//           console.log("publicacion CREATE", publicacion);  
//         } catch (error) {
//           console.log(error); 
//           // res.send("NO SE PUDO CREAR ESTE PRODUCTO");
//           res.send("No se pudo actualizar la imagen"); 
//         }
      

//     //   createProductImage()


// });



// router.post('/upload2', createProductImage);
router.post('/uploading', multerUpload.single('imagen'), async (req, res) => {
  try {

  console.log('CURRENT_DIRCURRENT_DIRCURRENT_DIR',CURRENT_DIR);
      console.log("req.body ESTE EL REQ IMAGEN ---------------------",req?.file);
    console.log("create entre");
  //   const {imagen} = req.body;
    
    console.log("ESTA ES LA DATA DE LA IMAGEN");   
    
    const imagenUpdate =  join( 'public/images/'+req?.file?.filename ) 
  //   const imagenUpdate = `${CURRENT_DIR, req.file.filename}`
  const {idCat,idUser,nombre,descripcion,like,guardado} = req.body;
  
    

  const idCatParse = parseInt(idCat);
  const idpaser = parseInt(idUser);
  const likeparser = parseFloat(like);
 
  const publicacion = await prisma.publicacion.create({
    data: {
      idCat: idCatParse,
      idUser: idpaser,
      nombre,
      descripcion,
      like: 0,
      guardado: false,
      imagen: imagenUpdate ? imagenUpdate : '' , 
    }, 
  }); 


    if(publicacion){  
      // res.status(200).send("SE CREO LA IMAGEN");
    }
    console.log("publicacion CREATE");   
  } catch (error) {
    console.log(error);    
    // res.send("NO SE PUDO CREAR ESTE PRODUCTO");
    res.send("No se pudo CREAR la imagen", error);  
  }


//   createProductImage()


});


router.put('/uploading/:id', multerUpload.single('imagen'), async (req, res) => {
  try {

  console.log('CURRENT_DIRCURRENT_DIRCURRENT_DIR',CURRENT_DIR);
      console.log("req.body ESTE EL REQ IMAGEN ---------------------",req?.file);
    console.log("create entre");
  //   const {imagen} = req.body;
  const { id } = req.params;
    
    console.log("ESTA ES LA DATA DE LA IMAGEN");   
    
    const imagenUpdate =  join( 'public/images/'+req?.file?.filename ) 
  //   const imagenUpdate = `${CURRENT_DIR, req.file.filename}`
  const {idProds, idCat,idUser,nombre,descripcion,like,guardado} = req.body;
  
    

  const idCatParse = parseInt(idCat);
  const idpaser = parseInt(idUser);
  const likeparser = parseFloat(like);     
  const guarda = new Boolean(guardado); 
 
  const publicacion = await prisma.publicacion.update({
    where: { idProds: Number(id) },
    data: {
      idCat: idCatParse,
      idUser: idpaser,
      nombre,
      descripcion,
      like: likeparser,
      // guardado: true ,
      imagen: imagenUpdate ? imagenUpdate : '' , 
    }, 
  }); 


    if(publicacion){  
      // res.status(200).send("SE CREO LA IMAGEN");
    }
    console.log("publicacion EDIT");   
  } catch (error) {
    console.log(error);    
    // res.send("NO SE PUDO CREAR ESTE PRODUCTO");
    res.send("No se pudo editar la imagen", error);  
  }


//   createProductImage()


});





// router.post('/imgurl', createUrlimage);

// upload.single('imagen'),
router.put('/imagen/:id', updateImgproduct);

router.get('/:id', getProductById);

router.delete('/delete/:id', deleteProduct);

router.put('/:id', updateProduct);

export default router;