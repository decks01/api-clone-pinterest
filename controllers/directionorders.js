import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export const getDirections =async (req, res) => {
    try {
      const direccionpedido = await prisma.direccionpedido.findMany({});
      res.send(direccionpedido);
    } catch (error) {
      res.status(403)
    }
};

export const getDirectionById = async (req, res) => {
    try {
      const { id } = req.params;
      const direccionpedido = await prisma.direccionpedido.findUnique({
        where: {
          idDirecciones: Number(id),
        },
      });
      res.json(direccionpedido);
    } catch (error) {
      res.status(403)
    }
};

export const getDirectionByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const direccionpedido = await prisma.direccionpedido.findMany({
      where: {
        usuarioID: Number(id),
      },
    });
    res.json(direccionpedido); 
  } catch (error) {
    res.status(403)
    console.log(error);
  }
};


export const deleteDirection = async (req, res) => {
    try {
      const { id } = req.params;
      const direccionpedido = await prisma.direccionpedido.delete({
        where: {
          idDirecciones: Number(id),
        }
      });
      res.send(direccionpedido); 
    } catch (error) {
      res.status("NO SE PUDO BORRAR LA DIRECCION DEL PEDIDO")  
    }
};

export const updateDirection = async (req, res) => {
    try {
      const {estado,ciudad,colonia,direccion,correo,telefono,usuarioID} = req.body;
      const { id } = req.params;
      const direccionpedido = await prisma.direccionpedido.update({
        where: { idDirecciones: Number(id) },
        data: {
          estado,
          ciudad,
          colonia,
          direccion,
          correo,
          telefono,
          usuarioID,
        },
      });
      res.send(direccionpedido);
      console.log(direccionpedido);
    } catch (error) {
      res.send("NO SE PUDO ACTUALIZAR LA DIRECCION DEL PEDIDO");
    }
};

export const createDirection = async (req, res) => {
    try {
      const {estado,ciudad,colonia,direccion,correo,telefono,usuarioID} = req.body;
      const direccionpedido = await prisma.direccionpedido.create({
        data: {
          estado,
          ciudad,
          colonia,
          direccion,
          correo,
          telefono,
          usuarioID,
        },
      });
      res.send(direccionpedido);
      console.log("direccionpedido CREATE", direccionpedido);
    } catch (error) {
      // res.send("NO SE PUDO CREAR LA DIRECCION DEL PEDIDO");
      res.send(error);
      console.log(error);
    }
};