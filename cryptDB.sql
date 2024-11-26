-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Ноя 25 2024 г., 22:11
-- Версия сервера: 8.0.30
-- Версия PHP: 8.0.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `cryptDB`
--

-- --------------------------------------------------------

--
-- Структура таблицы `migrations`
--

CREATE TABLE `migrations` (
  `id` int NOT NULL,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `migrations`
--

INSERT INTO `migrations` (`id`, `timestamp`, `name`) VALUES
(1, 1732218746310, 'SchemaUpdate1732218746310');

-- --------------------------------------------------------

--
-- Структура таблицы `password_history`
--

CREATE TABLE `password_history` (
  `id` int NOT NULL,
  `passwordChangedAt` timestamp NULL DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `password_history`
--

INSERT INTO `password_history` (`id`, `passwordChangedAt`, `userId`, `password`) VALUES
(1, '2024-11-25 15:25:25', 1, 'wa/pFJ/yvWp7o'),
(2, '2024-11-25 15:25:47', 1, 'LgKTXpHnz2CeY'),
(3, '2024-11-25 15:26:03', 1, 'uriK4Fh/4T1ac'),
(4, '2024-11-25 15:37:44', 4, 'FWqzHJCPISeak'),
(5, '2024-11-25 18:41:03', 4, '1YzDYUjeRYM8I'),
(6, '2024-11-25 18:46:57', 4, 'CjEgEdxWg0Q/U');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `isAdmin` tinyint NOT NULL DEFAULT '0',
  `passwordChangedAt` timestamp NULL DEFAULT NULL,
  `nickname` varchar(255) NOT NULL,
  `password` varchar(24) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `isAdmin`, `passwordChangedAt`, `nickname`, `password`, `email`) VALUES
(1, 0, '2024-11-21 22:59:49', 'neiron', '5s9.pG8Gtl7tg', 'neiron@mail.ru'),
(3, 1, '2024-11-25 15:26:25', 'admin', 'fnRL/G5lXVMug', 'admin@mail.ru'),
(4, 0, '2024-11-25 15:35:49', 'testuser', 'gbdu.eZLeCmJM', 'test@mail.ru'),
(6, 0, '2024-11-25 18:17:27', 'newUser', 'WnPfA9/2cD2UM', 'neiron1@mail.ru'),
(7, 0, '2024-11-25 18:27:12', 'username228', 'hY3F4HYb7ei5c', 'neiro_666@mail.ru');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `password_history`
--
ALTER TABLE `password_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_20c510e5ca12f63b0c915c3e2df` (`userId`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_e2364281027b926b879fa2fa1e` (`nickname`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `password_history`
--
ALTER TABLE `password_history`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `password_history`
--
ALTER TABLE `password_history`
  ADD CONSTRAINT `FK_20c510e5ca12f63b0c915c3e2df` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
