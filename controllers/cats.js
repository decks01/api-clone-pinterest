import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export const getCats =async (req, res) => {
    try {
      const categorias = await prisma.categorias.findMany({});
      res.send(categorias);
    } catch (error) {
      res.status(403)
    }
};

export const getCatById = async (req, res) => {
    try {
      const { id } = req.params;
      const categorias = await prisma.categorias.findUnique({
        where: {
          idCats: Number(id),
        },
      });
      res.json(categorias);
    } catch (error) {
      res.status(403)
    }
};

export const deleteCat = async (req, res) => {
    try {
      const { id } = req.params;
      const categorias = await prisma.categorias.delete({
        where: {
          idCats: Number(id),
        }
      });
      res.send(categorias); 
    } catch (error) {
      console.log(error);
      res.status("NO SE PUDO BORRAR ESTE CATALOGO")  
    }
};

export const updateCat = async (req, res) => {
    try {
      const {tipo} = req.body;
      const { id } = req.params;
      const categorias = await prisma.categorias.update({
        where: { idCats: Number(id) },
        data: {
          tipo,
        },
      });
      res.send(categorias);
      console.log(categorias);
    } catch (error) {
      res.send("NO SE PUDO ACTUALIZAR ESTA CATEGORIA");
    }
};

export const createCat = async (req, res) => {
    try {
      const {tipo} = req.body;
      const categorias = await prisma.categorias.create({
        data: {
          tipo,
      
        },
      });
      res.send(categorias);
      console.log("categorias CREATE", categorias);
    } catch (error) {
      res.send("NO SE PUDO CREAR ESTE REGISTRO");
    }
  };