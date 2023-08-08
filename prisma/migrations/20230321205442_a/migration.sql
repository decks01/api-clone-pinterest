-- CreateTable
CREATE TABLE `Roles` (
    `idRol` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoRol` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idRol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuarios` (
    `idUsuarios` INTEGER NOT NULL AUTO_INCREMENT,
    `ID` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `contrasena` VARCHAR(191) NOT NULL,
    `imagen` VARCHAR(191) NOT NULL,
    `rolUsuario` INTEGER NOT NULL,

    UNIQUE INDEX `Usuarios_ID_key`(`ID`),
    PRIMARY KEY (`idUsuarios`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categorias` (
    `idCats` INTEGER NOT NULL AUTO_INCREMENT,
    `talla` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idCats`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Productos` (
    `idProds` INTEGER NOT NULL AUTO_INCREMENT,
    `idCat` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `stock` INTEGER NOT NULL,
    `precio` DOUBLE NOT NULL,
    `imagen` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idProds`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Detallespedido` (
    `idDetalles` INTEGER NOT NULL AUTO_INCREMENT,
    `idProd` INTEGER NOT NULL,
    `idPedido` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `precio` DOUBLE NOT NULL,
    `subtotal` DOUBLE NOT NULL,

    PRIMARY KEY (`idDetalles`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Direccionpedido` (
    `idDirecciones` INTEGER NOT NULL AUTO_INCREMENT,
    `estado` VARCHAR(191) NOT NULL,
    `ciudad` VARCHAR(191) NOT NULL,
    `colonia` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `usuarioID` INTEGER NOT NULL,

    PRIMARY KEY (`idDirecciones`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedidos` (
    `idPedidos` INTEGER NOT NULL AUTO_INCREMENT,
    `pedidoUsuario` INTEGER NOT NULL,
    `idDireccion` INTEGER NOT NULL,
    `fecha` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`idPedidos`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Compras` (
    `idCompra` INTEGER NOT NULL AUTO_INCREMENT,
    `pedidoID` INTEGER NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `fecha` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fechaEntrega` DATE NOT NULL,

    PRIMARY KEY (`idCompra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_rolUsuario_fkey` FOREIGN KEY (`rolUsuario`) REFERENCES `Roles`(`idRol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Productos` ADD CONSTRAINT `Productos_idCat_fkey` FOREIGN KEY (`idCat`) REFERENCES `Categorias`(`idCats`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detallespedido` ADD CONSTRAINT `Detallespedido_idProd_fkey` FOREIGN KEY (`idProd`) REFERENCES `Productos`(`idProds`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detallespedido` ADD CONSTRAINT `Detallespedido_idPedido_fkey` FOREIGN KEY (`idPedido`) REFERENCES `Pedidos`(`idPedidos`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Direccionpedido` ADD CONSTRAINT `Direccionpedido_usuarioID_fkey` FOREIGN KEY (`usuarioID`) REFERENCES `Usuarios`(`idUsuarios`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedidos` ADD CONSTRAINT `Pedidos_pedidoUsuario_fkey` FOREIGN KEY (`pedidoUsuario`) REFERENCES `Usuarios`(`idUsuarios`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedidos` ADD CONSTRAINT `Pedidos_idDireccion_fkey` FOREIGN KEY (`idDireccion`) REFERENCES `Direccionpedido`(`idDirecciones`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compras` ADD CONSTRAINT `Compras_pedidoID_fkey` FOREIGN KEY (`pedidoID`) REFERENCES `Pedidos`(`idPedidos`) ON DELETE RESTRICT ON UPDATE CASCADE;
