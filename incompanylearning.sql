-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 04-08-2022 a las 20:51:32
-- Versión del servidor: 8.0.18
-- Versión de PHP: 5.6.39

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `incompanylearning`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `budgets`
--

CREATE TABLE `budgets` (
  `ID` int(11) NOT NULL COMMENT 'ID de tabla',
  `hours` varchar(5) NOT NULL DEFAULT '0' COMMENT 'Horas presupuestadas',
  `hourXgroup` varchar(8) NOT NULL COMMENT 'Valor de la hora x grupo',
  `hourXperson` varchar(8) NOT NULL COMMENT 'Valor de la hora individual',
  `isActive` tinyint(1) DEFAULT '0' COMMENT 'Si esta activo',
  `ID_companies` int(11) NOT NULL COMMENT 'ID de companies',
  `timestamp` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'Fecha de creación'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `budgets`
--

INSERT INTO `budgets` (`ID`, `hours`, `hourXgroup`, `hourXperson`, `isActive`, `ID_companies`, `timestamp`) VALUES
(1, '01:30', '675.00', '1281.15', 0, 1, NULL),
(2, '02:00', '800.00', '2000.00', 1, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `companies`
--

CREATE TABLE `companies` (
  `ID` int(11) NOT NULL COMMENT 'ID de tabla',
  `name` varchar(30) NOT NULL COMMENT 'Nombre o razón social'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `companies`
--

INSERT INTO `companies` (`ID`, `name`) VALUES
(1, 'Cromosol S.A.'),
(2, 'Techwise');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `groups`
--

CREATE TABLE `groups` (
  `ID` int(11) NOT NULL COMMENT 'ID de tabla',
  `name` varchar(30) NOT NULL COMMENT 'Nombre del grupo',
  `count` int(2) NOT NULL COMMENT 'Cantidad de miembros'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `groups`
--

INSERT INTO `groups` (`ID`, `name`, `count`) VALUES
(1, 'A', 1),
(2, 'B', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `levels`
--

CREATE TABLE `levels` (
  `ID` int(11) NOT NULL COMMENT 'ID de tabla',
  `name` varchar(30) NOT NULL COMMENT 'Nombre descriptivo del nivel'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `levels`
--

INSERT INTO `levels` (`ID`, `name`) VALUES
(1, 'Elementary'),
(2, 'Initial');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `schedule`
--

CREATE TABLE `schedule` (
  `ID` int(11) NOT NULL COMMENT 'ID de tabla',
  `ID_users` int(11) NOT NULL COMMENT 'ID de users',
  `date` varchar(30) NOT NULL COMMENT 'Fecha de la clase',
  `hours` varchar(5) NOT NULL COMMENT 'Horas de clase',
  `startHour` varchar(10) NOT NULL COMMENT 'Hora de inicio',
  `finishHour` varchar(10) NOT NULL COMMENT 'Hora de finalización',
  `ID_validations` int(11) NOT NULL DEFAULT '0' COMMENT 'ID de validations',
  `price` varchar(8) NOT NULL DEFAULT '0' COMMENT 'Precio'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL COMMENT 'ID de tabla',
  `user` varchar(30) NOT NULL COMMENT 'Nombre de usuario',
  `password` varchar(30) NOT NULL COMMENT 'Contraseña',
  `name` varchar(50) NOT NULL COMMENT 'Nombre',
  `lastName` varchar(50) NOT NULL COMMENT 'Apellido',
  `phone` varchar(30) NOT NULL COMMENT 'Número de teléfono',
  `email` varchar(30) NOT NULL COMMENT 'Correo electrónico',
  `isTeacher` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Es un profesor?',
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Es administrador?',
  `ID_levels` int(11) NOT NULL DEFAULT '0' COMMENT 'ID de levels',
  `ID_groups` int(11) NOT NULL DEFAULT '0' COMMENT 'ID de groups',
  `ID_companies` int(11) NOT NULL DEFAULT '0' COMMENT 'ID de companies',
  `timestamp` varchar(25) DEFAULT NULL COMMENT 'Último ingreso'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`ID`, `user`, `password`, `name`, `lastName`, `phone`, `email`, `isTeacher`, `isAdmin`, `ID_levels`, `ID_groups`, `ID_companies`, `timestamp`) VALUES
(1, 'dariomadeira', 'lili11dhmG', 'Darío', 'Madeira', '2651417999', 'dariomadeira@gmail.com', 0, 0, 2, 1, 1, '01/08/2022 a las 19:14:22'),
(2, 'pabloamendola', 'pablo', 'Pablo', 'Amendola', '', '', 0, 1, 1, 2, 2, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `validations`
--

CREATE TABLE `validations` (
  `ID` int(11) NOT NULL COMMENT 'ID de tabla',
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'Casos contemplados'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `validations`
--

INSERT INTO `validations` (`ID`, `name`) VALUES
(1, 'Presente con el grupo'),
(2, 'Presente individual'),
(3, 'Ausente con aviso'),
(4, 'Ausente sin aviso individual'),
(5, 'Profesor ausente'),
(6, 'Ausente sin aviso en el grupo'),
(7, 'Cancelado con aviso en el grupo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `budgets`
--
ALTER TABLE `budgets`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_idCompanies` (`ID_companies`);

--
-- Indices de la tabla `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_idShedule` (`ID_users`),
  ADD KEY `fk_idValidations` (`ID_validations`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_idGroup` (`ID_groups`),
  ADD KEY `fk_idLevels` (`ID_levels`),
  ADD KEY `fk_idUsersCompanies` (`ID_companies`);

--
-- Indices de la tabla `validations`
--
ALTER TABLE `validations`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `budgets`
--
ALTER TABLE `budgets`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de tabla', AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `companies`
--
ALTER TABLE `companies`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de tabla', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `groups`
--
ALTER TABLE `groups`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de tabla', AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `levels`
--
ALTER TABLE `levels`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de tabla', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `schedule`
--
ALTER TABLE `schedule`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de tabla';

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de tabla', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `validations`
--
ALTER TABLE `validations`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de tabla', AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `budgets`
--
ALTER TABLE `budgets`
  ADD CONSTRAINT `fk_idCompanies` FOREIGN KEY (`ID_companies`) REFERENCES `companies` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `fk_idShedule` FOREIGN KEY (`ID_users`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_idValidations` FOREIGN KEY (`ID_validations`) REFERENCES `validations` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_idGroup` FOREIGN KEY (`ID_groups`) REFERENCES `groups` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_idLevels` FOREIGN KEY (`ID_levels`) REFERENCES `levels` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_idUsersCompanies` FOREIGN KEY (`ID_companies`) REFERENCES `companies` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
