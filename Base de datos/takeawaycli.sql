-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-05-2017 a las 17:30:45
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `takeawaycli`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(10) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`, `descripcion`) VALUES
(2, 'Ensalada', 'diferentes ensladas'),
(3, 'Primeros', 'Primeros platos de carne y pescado para todo tipo de cliente'),
(4, 'Postres', 'Postres creativos y originales para cualquier goloso, tanto adulto como niÃ±os'),
(5, 'Bebidas', 'bebidas con alchol o refrescos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) CHARACTER SET utf8 NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `telf` varchar(200) CHARACTER SET utf8 NOT NULL,
  `direccion` varchar(300) CHARACTER SET utf8 NOT NULL,
  `cp` varchar(100) CHARACTER SET utf8 NOT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'login.jpg',
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id`, `nombre`, `email`, `telf`, `direccion`, `cp`, `password`, `avatar`, `fecha`) VALUES
(2, 'Tania', 'ainatpujolrigual@gmail.com', '696299108', 'c/Major 38, baj-1', '08800', 'tania1979', 'login.jpg', '2017-04-12 08:16:55');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contac_form`
--

CREATE TABLE `contac_form` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) CHARACTER SET latin1 NOT NULL,
  `email` varchar(500) CHARACTER SET latin1 NOT NULL,
  `mensaje` text CHARACTER SET latin1 NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

CREATE TABLE `detalle_pedido` (
  `id` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_plato` int(11) NOT NULL,
  `cantidad` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `importe` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platos`
--

CREATE TABLE `platos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) CHARACTER SET utf8 NOT NULL,
  `precio` float(4,2) NOT NULL,
  `descripcion` text CHARACTER SET utf8 NOT NULL,
  `foto` varchar(200) CHARACTER SET utf8 NOT NULL,
  `activado` tinyint(1) NOT NULL,
  `categoria` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `platos`
--

INSERT INTO `platos` (`id`, `nombre`, `precio`, `descripcion`, `foto`, `activado`, `categoria`) VALUES
(6, 'Amanida de Arros', 3.50, 'Deliciosa i refrescant amanida de arros, on afegim uns dauets de pernil dolÃ§ i verduretes que equilibren el plat.', 'amanida_arros.jpg', 0, 'Ensalada'),
(7, 'Amanida Campestre', 4.50, 'Deliciosa combinacio gracies a la base vegetal, rica en vitamines, al pernil dolç i al formatge, que aporten proteines i calci al plat. El toc dolç del blat de moro i les pastanagues li donen un gust agradable en boca.', 'amanida_campestre.jpg', 0, 'Ensalada'),
(8, 'Amanida de Pasta', 3.75, 'Amanida fresca amb la base de pasta Fusilli, juntament amb la tonyina i les hortalisses formen un plat complet. Acompanyat amb maionesa.', 'Amanida_pasta.jpg', 1, 'Ensalada'),
(9, 'Amanida Cesar', 3.75, 'Has tastat ja la nostra amanida classica? Amb base vegetal rica en vitamines, pollastre arrebossat cruixent i formatge que ens ofereix una bona font de calci.', 'Amanida_cesar.jpg', 1, 'Ensalada'),
(10, 'Bacalla al Romescu', 5.60, 'Delicios plat de peix, preparat amb la salsa tipica de romescu, atencio aquest port contenir alguns alÂ·lergens amb traces de: Crustacis, Ou, Cacauets, Soja, Llet, Api, Mostassa, Sulfits, Sesam, MolÂ·luscs.', 'bacalla_romescu.jpg', 1, 'Primeros'),
(11, 'Llom Rostit', 5.75, 'Plat molt nutritiu, el llom aromatitzat amb especies, va acompanyat amb verdures. Pots combinar-lo amb una de les nostres cremes.', 'llom_rostit.jpg', 1, 'Primeros'),
(12, 'Mandonguilles', 5.75, 'Delicios plat tipic de la terra gallega, portat a la teva taula', 'mandonguilles.jpg', 1, 'Primeros'),
(13, 'Lluc al Romani', 5.75, 'Delicios filet de lluç amb patata, oli de oliva, pebrot vermell, pebrot verd, tomaquet, all, vinagre i romanï', 'lluc_romani.jpg', 1, 'Primeros'),
(15, 'Maduixa, .., nabius', 3.75, 'Postre conbinat de maduixe y nabius', 'fruta1.jpg', 1, 'Postres'),
(16, 'Fruita del Temps', 2.75, 'Un potre delicios on trobaras la fuita mes delicioses del temps', 'fruta2.jpg', 1, 'Postres'),
(17, 'Pastis Kit Kat', 3.75, 'Pastis de la deliciossa chocolata kit kat amb una base de pÃ  de pasic', 'pastis_kit_kat.jpg', 1, 'Postres'),
(18, 'Crumble de Poma', 4.00, 'Poma cuita amb nabius i cruixent de galeta, civada i canyella.', 'Crumble_poma.jpg', 1, 'Postres'),
(19, 'Coca-Cola', 1.50, 'lata de 33cl', 'cocaCola.jpg', 1, 'Bebidas'),
(20, 'Coca-Cola Zero', 1.50, 'lata de 33cl', 'zero.jpg', 1, 'Bebidas'),
(21, 'Coca-Cola Light', 1.50, 'lata de 33cl', 'light.jpg', 1, 'Bebidas'),
(22, 'Nestea', 1.00, 'lata de 33cl', 'nestea.jpg', 1, 'Bebidas'),
(23, 'Moritz', 1.75, 'lata de 33cl', 'moritz.jpg', 1, 'Bebidas'),
(25, 'Vino Blanco', 2.00, 'botella de 1/2l', 'viBlanc.jpg', 1, 'Bebidas'),
(26, 'Vino Negro', 2.00, 'botella de vino de 1/2l', 'viNegre.jpg', 1, 'Bebidas'),
(27, 'Aigua', 1.25, 'botella 33cl', 'agua.jpg', 0, 'Bebidas');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `contac_form`
--
ALTER TABLE `contac_form`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `platos`
--
ALTER TABLE `platos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `contac_form`
--
ALTER TABLE `contac_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `platos`
--
ALTER TABLE `platos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
