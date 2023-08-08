import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export const getRoles =async (req, res) => {
  try {
    const roles = await prisma.roles.findMany({});
    res.send(roles);
  } catch (error) {
    res.status(403)
  }
};

export const getRolesById = async (req, res) => {
  try {
    const { id } = req.params;
    const roles = await prisma.roles.findUnique({
      where: {
        idRol: Number(id),
      },
    });
    res.json(roles);
  } catch (error) {
    res.status(403)
  }
};

export const deleteRol = async (req, res) => {
  try {
    const { id } = req.params;
    const roles = await prisma.roles.delete({
      where: {
        idRol: Number(id),
      },
    });
    res.send(roles);
  } catch (error) {
    res.send("ESTE ROL NO SE PUDO ELIMINAR");
  }
};

export const createRol = async (req, res) => {
  try {
    const {tipoRol} = req.body;
    const roles = await prisma.roles.create({
      data: {
        tipoRol
      },
    });
    res.send(roles);
    console.log("roles CREATE", roles);
  } catch (error) {
    res.send("NO SE PUDO CREAR ESTE ROL");
  }
};

export const updateRol = async (req, res) => {
  try {
    const {tipoRol} = req.body;
    const { id } = req.params;
    const roles = await prisma.roles.update({
      where: { idRol: Number(id) },
      data: {
        tipoRol,
      },
    });
    res.send(roles);
    console.log(roles);
  } catch (error) {
    res.send("NO SE PUDO ACTUALIZAR ESTE USUARIOS");
  }
};