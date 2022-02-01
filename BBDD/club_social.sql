-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-02-2022 a las 19:38:32
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 7.4.22

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
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `id_eventos` int(11) NOT NULL,
  `titulo_evento` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `cuerpo_evento` longtext COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`id_eventos`, `titulo_evento`, `cuerpo_evento`) VALUES
(1, 'título evento 1', 'cuerpo evento 1'),
(2, 'título evento 2', 'cuerpo evento 2'),
(3, 'título evento 3', 'cuerpo evento 4'),
(4, 'título evento 4', 'cuerpo evento 4'),
(5, 'título evento 5', 'cuerpo evento 5');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instalaciones`
--

CREATE TABLE `instalaciones` (
  `nombre_pista` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `tipo_pista` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `precio` int(11) NOT NULL,
  `precio_no_socio` float NOT NULL,
  `id_pista` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `instalaciones`
--

INSERT INTO `instalaciones` (`nombre_pista`, `tipo_pista`, `precio`, `precio_no_socio`, `id_pista`) VALUES
('padel_1', 'padel', 1, 1.5, 1),
('padel_2', 'padel', 1, 1.4, 2),
('tenis_1', 'tenis', 1, 1.6, 3),
('tenis_2', 'tenis', 1, 1.4, 4),
('futbol_1', 'futbol', 5, 1, 5),
('baloncesto_1', 'baloncesto', 3, 1, 6),
('barbacoa_1', 'barbacoa', 5, 1, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticias`
--

CREATE TABLE `noticias` (
  `id_noticias` int(11) NOT NULL,
  `titulo_noticia` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `cuerpo_noticia` longtext COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `noticias`
--

INSERT INTO `noticias` (`id_noticias`, `titulo_noticia`, `cuerpo_noticia`) VALUES
(1, 'Título noticia 1', 'Cuerpo noticia 1'),
(2, 'Título noticia 2', 'Cuerpo noticia 2'),
(3, 'Título noticia 3', 'Cuerpo noticia 3'),
(4, 'Título noticia 4', 'Cuerpo noticia 4'),
(5, 'Título noticia 5', 'Cuerpo noticia 5');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id_reserva` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_pista` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `apellidos` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `tipo_usuario` set('Socio','Administrador','Presidente','Invitado') COLLATE utf8_spanish_ci NOT NULL DEFAULT 'Invitado',
  `edad` int(11) NOT NULL,
  `miembros` int(11) NOT NULL,
  `email` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `usuario` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `contraseña` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellidos`, `tipo_usuario`, `edad`, `miembros`, `email`, `usuario`, `contraseña`) VALUES
(1, 'nombre 1', 'apes1', 'Invitado', 22, 2, 'email@gsfgda', 'usua1', '1234'),
(2, 'nombre 2', 'apes2', 'Invitado', 2, 2, 'email@gsfgdaegfrg', 'usua2', '25252');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id_eventos`);

--
-- Indices de la tabla `instalaciones`
--
ALTER TABLE `instalaciones`
  ADD PRIMARY KEY (`id_pista`);

--
-- Indices de la tabla `noticias`
--
ALTER TABLE `noticias`
  ADD PRIMARY KEY (`id_noticias`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id_reserva`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `id_eventos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `instalaciones`
--
ALTER TABLE `instalaciones`
  MODIFY `id_pista` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `noticias`
--
ALTER TABLE `noticias`
  MODIFY `id_noticias` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id_reserva` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
