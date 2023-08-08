import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export const getShops =async (req, res) => {
    try {
      const compras = await prisma.compras.findMany({});
      res.send(compras);
    } catch (error) {
      res.status(403)
    }
};

export const getShopById = async (req, res) => {
    try {
      const { id } = req.params;
      const compras = await prisma.compras.findUnique({
        where: {
          idCompra: Number(id),
        },
      });
      res.json(compras);
    } catch (error) {
      res.status(403)
    }
};

export const getShopByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const compras = await prisma.compras.findMany({
      select: {
        pedcompra :{
          where: {
            pedidoUsuario: Number(id),
          },
        }
      }
    });
    res.json(compras);
  } catch (error) {
    console.log(error);
    // res.status(403)
  }
};



export const deleteShop = async (req, res) => {
    try {
      const { id } = req.params;
      const compras = await prisma.compras.delete({
        where: {
          idCompra: Number(id),
        }
      });
      res.send(compras); 
    } catch (error) {
      console.log(error);
      res.status("NO SE PUDO BORRAR ESTA COMPRA")  
    }
};

export const updateShop = async (req, res) => {
    try {
      const {pedidoID,estado,fechaEntrega} = req.body;
      const { id } = req.params;
      const compras = await prisma.compras.update({
        where: { idCompra: Number(id) },
        data: {
          pedidoID,
          estado,
          fechaEntrega
        },
      });
      res.send(compras);
      console.log(compras);
    } catch (error) {
      res.send("NO SE PUDO ACTUALIZAR ESTA COMPRA");
    }
};

export const createShop = async (req, res) => {
    try {
      const {pedidoID,estado,fechaEntrega} = req.body;
      const compras = await prisma.compras.create({
        data: {
          pedidoID,
          estado,
          fechaEntrega
        },
      });
      res.send(compras);
      console.log("compras CREATE", compras);
    } catch (error) {
      res.send("NO SE PUDO CREAR ESTE REGISTRO");
    }
  };