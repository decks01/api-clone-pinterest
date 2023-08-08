import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
  try {
    const usuarios = await prisma.usuarios.findMany({
      include: {
        rol: true,
      },
    });
    res.json(usuarios);
    console.log(usuarios);
  } catch (error) {
    res.status(403)
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarios = await prisma.usuarios.findUnique({
      where: {
        //En este puede se asi
        // ID: Number(id),
        ID: Number(id),
      },
      include: {
        rol: true,
      },
    });
    res.json(usuarios);
  } catch (error) {
    res.status(403)
  }
};


export const getCorreo = async (req, res) => {

  
  try {

    const usuarioscorreo = await prisma.usuarios.findMany({
      select: {
        correo: true,
      },
    });
    res.json(usuarioscorreo);

  } catch (error) {
    console.log(error);
  }
};
// export const getUserByCorreo = async (req, res) => {
//   try {
//     const usuarios = await prisma.usuarios.findMany({
//     });
//     res.json(usuarios);
//   } catch (error) {
//     // res.status(403)
//     console.log(error);
//   }
// };


export const deleteUser = async (req, res) => {
  try {
    // const {visible} = req.body;
    const { id } = req.params;
    const usuarios = await prisma.usuarios.delete({
      where: { idUsuarios: Number(id) },
      // data: {
      //   visible,
      // },
    });
    res.send(usuarios);
    console.log(usuarios);
  } catch (error) {
    res.send("NO SE PUEDE ACTUALIZAR ESTE USUARIO");
  }
};

export const updateUser = async (req, res) => {
  try {
    const {ID,nombre,apellido,correo,contrasena,rolUsuario} = req.body;
    const { id } = req.params;
    const usuarios = await prisma.usuarios.update({
      where: { idUsuarios: Number(id) },
      data: {
        ID,
        nombre,
        apellido,
        correo,
        contrasena,
        imagen:"",
        rol: {
          connect: { idRol: Number(rolUsuario) },
        },
      },
    });
    res.send(usuarios);
    console.log(usuarios);
  } catch (error) {
    res.send("NO SE PUEDE ACTUALIZAR ESTE USUARIO");
  }
};

export const updateRoluser = async (req, res) => {
  try {
    const {rolUsuario} = req.body;
    const { id } = req.params;
    const usuarios = await prisma.usuarios.updateMany({
      where: { idUsuarios: Number(id) },
      data: {
        rolUsuario: rolUsuario
      },
    });
    res.send(usuarios);
    console.log(usuarios);
  } catch (error) {
    res.send("NO SE PUEDE ACTUALIZAR EL ROL DEL USUARIO");
  }
};

// No se necesita, este lo hace el registe con el auth
export const createUser = async (req, res) => {
  try {
    const {ID,nombre,apellido,correo,contrasena,rolUsuario} = req.body;
    const usuarios = await prisma.usuarios.create({
      data: {
        ID,
        nombre,
        apellido,
        correo,
        contrasena,
        imagen:"",
        rol: {
          connect: { idRol: Number(rolUsuario) },
        },
      },
    });
    res.send(usuarios);
    console.log("USUARIOS CREATE", usuarios);
  } catch (error) {
    res.send("NO SE PUDO CREAR ESTE REGISTRO");
  }
};