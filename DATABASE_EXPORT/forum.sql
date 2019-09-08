-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 08, 2019 at 11:30 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `forum`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comm_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `comm_body` varchar(100) NOT NULL,
  `posting_date` date NOT NULL,
  `last_edit_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comm_id`, `user_id`, `post_id`, `comm_body`, `posting_date`, `last_edit_date`) VALUES
(4, 7, 1, 'komentsssssar', '2019-09-06', '2019-09-06'),
(5, 7, 3, 'Radi', '2019-09-07', '2019-09-07');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_name` varchar(50) NOT NULL,
  `post_body` varchar(1000) NOT NULL,
  `posting_date` date NOT NULL,
  `last_edit_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `user_id`, `post_name`, `post_body`, `posting_date`, `last_edit_date`) VALUES
(1, 5, 'Prvi post', 'Neki tekst', '2019-09-01', '2019-09-01'),
(2, 5, 'Drugi post', 'random', '2019-09-01', '2019-09-01'),
(3, 7, 'Kiki', 'Bekto', '2019-09-05', '2019-09-05');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `email`, `password`) VALUES
(1, 'Bekto Dedic', 'bekto@gmail.com', 'password123'),
(2, 'Billy', 'billy@gmail.com', 'password123'),
(3, 'Billy', 'billy@gmail.com', 'password123'),
(4, 'Suncica', 'sunci@gmail.com', 'passw1231241241'),
(5, 'Julius Novachrono', 'julius@yahoo.com', '$2a$10$XjRBo6ExLe3.l4j9eZYY3e8B7Uz6APt.ts2ysUlisL/gkBw3r8R8u'),
(6, 'Bekto', 'bosniangc@gmail.com', '$2a$10$SCNRnN2uQKa2AQdUjG3EE.yeVHL4cwLbIYXC9iFY3AIjPSXEXIqAa'),
(7, 'Kristian', 'kiki@gmail.com', '$2a$10$oHBADJiRzXrCYFLmHyseN.YG5oYuZ/iPD7PhekmlTs6ZuyMNgXNzu'),
(8, 'NoviClan', 'nekimail@gmail.com', '$2a$10$QrWTcGfYVEGJxtvEu33G6OVdadUGTzFXSlFcIPjxdllAISCqUTB7C');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comm_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comm_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
