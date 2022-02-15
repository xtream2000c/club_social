-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-02-2022 a las 15:55:20
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `club_social`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id_reserva` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_pista` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id_reserva`, `id_usuario`, `id_pista`, `fecha`, `hora`) VALUES
(1, 1, 6, '2022-02-12', 9),
(2, 5, 1, '2022-02-16', 9),
(3, 3, 2, '2022-02-13', 9),
(4, 3, 2, '2022-02-13', 10),
(5, 3, 2, '2022-02-13', 11),
(6, 3, 2, '2022-02-13', 12),
(7, 3, 2, '2022-02-13', 13),
(8, 3, 2, '2022-02-13', 14),
(9, 3, 2, '2022-02-13', 15),
(10, 3, 2, '2022-02-13', 16),
(11, 3, 2, '2022-02-13', 17),
(12, 3, 2, '2022-02-13', 18),
(13, 3, 2, '2022-02-13', 19),
(14, 3, 2, '2022-02-13', 20),
(15, 3, 2, '2022-02-13', 21),
(16, 3, 2, '2022-02-13', 22),
(28, 1, 4, '2022-02-17', 22),
(29, 1, 4, '2022-02-15', 12),
(30, 1, 4, '2022-02-20', 9),
(31, 1, 1, '2022-02-16', 19);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id_reserva`),
  ADD UNIQUE KEY `RESTRICCION_DUPLICIDAD` (`fecha`,`hora`,`id_pista`) USING BTREE,
  ADD KEY `FK_reserva_pista` (`id_pista`),
  ADD KEY `FK_reserva_usuario` (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id_reserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `FK_reserva_pista` FOREIGN KEY (`id_pista`) REFERENCES `instalaciones` (`id_pista`),
  ADD CONSTRAINT `FK_reserva_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
