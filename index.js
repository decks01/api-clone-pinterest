import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'; 

const app = express();
const PORT = 8000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Debe iniciar sesión para acceder a esta vista");
});



app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
  }));

// END POINT


// Para aumentar el limite de tamaño del JSON
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.listen(PORT, () =>
  console.log(`Server corriendo en puerto: http://localhost:${PORT}`)
);