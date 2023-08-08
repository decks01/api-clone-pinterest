
import express, {json, urlencoded, static as fileServer} from "express";
// import { urlArchivos } from "./config/constants.js";
import bodyParser from "body-parser";
import cors from 'cors';
import login from "./routes/login.js";
import usersRoutes from "./routes/user.js";
import roles from "./routes/rol.js"
import register from "./routes/auth.js"
import registert from "./routes/registert.js"

import products from "./routes/product.js"
import cats from "./routes/cat.js"
import detailsorders from "./routes/detailsorder.js"
import directionorders from "./routes/directionorder.js"
import orders from "./routes/order.js"
import shops from "./routes/shop.js"

import { dirname, extname, join } from 'path';
import { fileURLToPath } from 'url';
import { register2 } from "./controllers/register2.js";
import Stripe from "stripe";


// import multer from "multer";
// import sharp from "sharp";

const app = express();
const PORT = 8000;

// Subir Imagenes metodo 1************************************************************
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, './uploads')
//     },
//     filename: (req, file, cb) => {
//       const ext = file.originalname.split('.').pop() //retorna imagen.png -> png
//       cb(null, `${Date.now()}.${ext}`)
//     }
// })

// const helperImg = (filePath, fileName, size = 300) => {
//   return sharp(filePath)
//     .resize(size)
//     .toFile(`./optimize/${fileName}`)
// }

// const upload = multer({storage})

// app.post('/upload', upload.single('imagen'),(req,res) => {
//   console.log('--->', req.file)
//   helperImg(req.file.path, `resize-${req.file.filename}`, 100)
//   res.send({ data: 'Imagen Cargada'})
// })
// ***********************************************************************************

app.use(bodyParser.json());

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
  }));

app.get("/", (req, res) => {
  res.send("api activo");
});

//--files
// app.use("/products/file", fileServer(urlArchivos))
const CURRENT_DIR = dirname(fileURLToPath(import.meta.url)); 

app.use("/login",login );
app.use("/users", usersRoutes);
app.use("/roles", roles);
app.use("/register",register );
app.use("/register2",registert );
app.use("/products",products);
app.use("/cats",cats);
// app.use("/detailsorders",detailsorders);
// app.use("/directionorders",directionorders);
// app.use("/orders",orders);
// app.use("/shops",shops);


app.use('/public/images/', express.static(join(CURRENT_DIR, './uploads'))  );


// PAGO EN LINEA

// Llave secreta, ponerla en variables de entorno
const stripe = new Stripe('sk_test_51MocPGGZAl3G67dQHVYMRQwu3L4KgZYjcACPmOk1QXX4o9ZdrudO67020Z1iGxMP7vlm2LQLwjNelu1Mut6tBe9o00laqEYoIz')

app.post('/checkout', async (req, res)  => {
 try {
  const { amount, id, description } = req.body;
  
  let numeroConCeros = amount.toString() + "00";
  const amountFormat = parseFloat(numeroConCeros)

  console.log(req.body);
  const payment =  await stripe.paymentIntents.create({
     amount: amountFormat ,
     currency: "MXN",
     description:` ${description } de Heavy Madness`,
     payment_method: id,
     confirm: true
   })
 
   console.log(payment);
   res.send({message: 'Success Payment'})

 } catch (error) {
    console.log(error);
 }
})


app.listen(PORT, () =>
  console.log(`Server corriendo en puerto: http://localhost:${PORT}`)
);