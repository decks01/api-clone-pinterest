import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export const getOrders =async (req, res) => {
    try {
      const pedidos = await prisma.pedidos.findMany({
        // include: {
        //   usu: true,
        //   dir: true,
        //   det: true
        // },
      });
      res.send(pedidos);
    } catch (error) {
      console.log(error);
      // res.status(403)
    }
};

export const getOrdersByUser =async (req, res) => {
  try {
    const { id } = req.params;
    const pedidos = await prisma.pedidos.findMany({
      where:{
        pedidoUsuario: Number(id)
      },
      include: {
        compras: true,
        detallespedido: {
          include: {
            prod: true,
          }
        }
      },
    });
    res.send(pedidos);
  } catch (error) {
    console.log(error);
    // res.status(403)
  }
};

export const sumPrecio =async (req, res) => {
  try {
    const { id } = req.params;
    const pedidos = await prisma.pedidos.groupBy({
      where:{
        pedidoUsuario: Number(id)
      },

     
      
      select: {
        detallespedido:{
          by: ['prod'],
          _sum:{
            precio: true
          }
        }    
      }

    });
    res.send(pedidos);
  } catch (error) {
    console.log(error);
    // res.status(403)
  }
};


export const getOrderById = async (req, res) => {
    try {
      const { id } = req.params;
      const pedidos = await prisma.pedidos.findUnique({
        where: {
          idPedidos: Number(id),
        },
      });
      res.json(pedidos);
    } catch (error) {
      // res.status(403)
      console.log(error);
    }
};

export const deleteOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const pedidos = await prisma.pedidos.delete({
        where: {
          idPedidos: Number(id),
        }
      });
      res.send(pedidos); 
    } catch (error) {
      res.status("NO SE PUDO BORRAR ESTE PEDIDO")  
    }
};

export const updateOrder = async (req, res) => {
    try {
      const {pedidoUsuario,idDireccion,fecha} = req.body;
      const { id } = req.params;
      const pedidos = await prisma.pedidos.update({
        where: { idPedidos: Number(id) },
        data: {
          pedidoUsuario,
          idDireccion,     
          fecha,
        },
      });
      res.send(pedidos);
      console.log(pedidos);
    } catch (error) {
      res.send("NO SE PUDO ACTUALIZAR ESTE PEDIDO");
    }
};



export const updateorderDirection = async (req, res) => {
  try {
    const {idDireccion} = req.body;
    const { id } = req.params;
    const pedidos = await prisma.pedidos.update({
      where: { idPedidos: Number(id) },
      data: {
        idDireccion,     
      },
    });
    res.send(pedidos);
    console.log(pedidos);
  } catch (error) {
    res.send("NO SE PUDO ACTUALIZAR ESTE PEDIDO");
  }
};


export const createOrder = async (req, res) => {
    try {
      const {pedidoUsuario,idDireccion,fecha} = req.body;
      const pedidos = await prisma.pedidos.create({
        data: {
          pedidoUsuario,
          idDireccion,
          fecha,
        },
      });
      res.send(pedidos);
      console.log("pedidos CREATE", pedidos);
    } catch (error) {
      res.send("NO SE PUDO CREAR ESTE PEDIDO");
    }
};