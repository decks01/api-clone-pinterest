/*
  Warnings:

  - You are about to drop the column `color` on the `categorias` table. All the data in the column will be lost.
  - You are about to drop the column `talla` on the `categorias` table. All the data in the column will be lost.
  - You are about to drop the column `imagen` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the `compras` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `detallespedido` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `direccionpedido` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pedidos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tipo` to the `Categorias` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `compras` DROP FOREIGN KEY `Compras_pedidoID_fkey`;

-- DropForeignKey
ALTER TABLE `detallespedido` DROP FOREIGN KEY `Detallespedido_idPedido_fkey`;

-- DropForeignKey
ALTER TABLE `detallespedido` DROP FOREIGN KEY `Detallespedido_idProd_fkey`;

-- DropForeignKey
ALTER TABLE `direccionpedido` DROP FOREIGN KEY `Direccionpedido_usuarioID_fkey`;

-- DropForeignKey
ALTER TABLE `pedidos` DROP FOREIGN KEY `Pedidos_idDireccion_fkey`;

-- DropForeignKey
ALTER TABLE `pedidos` DROP FOREIGN KEY `Pedidos_pedidoUsuario_fkey`;

-- DropForeignKey
ALTER TABLE `productos` DROP FOREIGN KEY `Productos_idCat_fkey`;

-- AlterTable
ALTER TABLE `categorias` DROP COLUMN `color`,
    DROP COLUMN `talla`,
    ADD COLUMN `tipo` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `imagen`;

-- DropTable
DROP TABLE `compras`;

-- DropTable
DROP TABLE `detallespedido`;

-- DropTable
DROP TABLE `direccionpedido`;

-- DropTable
DROP TABLE `pedidos`;

-- DropTable
DROP TABLE `productos`;

-- CreateTable
CREATE TABLE `Publicacion` (
    `idProds` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idCat` INTEGER NOT NULL,
    `idUser` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `imagen` VARCHAR(191) NOT NULL,
    `like` INTEGER NOT NULL,
    `guardado` BOOLEAN NOT NULL,

    PRIMARY KEY (`idProds`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Publicacion` ADD CONSTRAINT `Publicacion_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `Usuarios`(`idUsuarios`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Publicacion` ADD CONSTRAINT `Publicacion_idCat_fkey` FOREIGN KEY (`idCat`) REFERENCES `Categorias`(`idCats`) ON DELETE RESTRICT ON UPDATE CASCADE;
