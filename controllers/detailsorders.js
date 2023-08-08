import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export const getDetails =async (req, res) => {
    try {
      console.log("entre a detailsorders");
      const detallespedido = await prisma.detallespedido.findMany({
       
        include: {
          ped: true,
        },
      });
      res.json(detallespedido);
    } catch (error) {
      console.log("error3", error);
      // res.status(403)
      // res.send("error", error);
      res.status(error).send(error);
    }
}; 

export const getDetailById = async (req, res) => {
    try {
      const { id } = req.params;
      const detallespedido = await prisma.detallespedido.findUnique({
        where: {
          idDetalles: Number(id),
        },
      });
      res.json(detallespedido);
    } catch (error) {
      res.status(403)
    }
};

export const deleteDetail = async (req, res) => {
    try {
      const { id } = req.params;
      const detallespedido = await prisma.detallespedido.delete({
        where: {
          idDetalles: Number(id),
        }
      });
      res.send(detallespedido); 
    } catch (error) {
      res.status("NO SE PUDIERON BORRAR LOS DETALLES DEL PEDIDO")  
    }
};

export const updateDetail = async (req, res) => {
    try {
      const {idProd,idPedido,cantidad,precio,subtotal} = req.body;
      const { id } = req.params;
      const detallespedido = await prisma.detallespedido.update({
        where: { idDetalles: Number(id) },
        data: {
          idProd,
          idPedido,
          cantidad,
          precio,
          subtotal,
        },
      });
      res.send(detallespedido);
      console.log(detallespedido);
    } catch (error) {
      res.send("NO SE PUDIERON ACTUALIZAR LOS DETALLES DEL PEDIDO");
    }
};

export const createDetail = async (req, res) => {
    try {
      const {idProd,idPedido,cantidad,precio,subtotal} = req.body;
      console.log(req.body);
      const detallespedido = await prisma.detallespedido.create({
        data: {
          idProd,
          idPedido,
          cantidad,
          precio,
          subtotal,
        },
      });
      res.send(detallespedido);
      console.log("detallespedido CREATE", detallespedido);
    } catch (error) {
      res.send("NO SE PUDIERON CREAR LOS DETALLES DEL PEDIDO");
      console.log("error",error);
    }
  };