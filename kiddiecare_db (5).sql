-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 12, 2025 at 04:18 AM
-- Server version: 10.5.26-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kiddiecare_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `timeStart` time NOT NULL,
  `timeEnd` time NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('pending','approved','declined') DEFAULT 'pending',
  `guardianId` int(11) DEFAULT NULL,
  `patientId` int(11) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `pediatricianId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `date`, `timeStart`, `timeEnd`, `description`, `status`, `guardianId`, `patientId`, `email`, `pediatricianId`) VALUES
(12, '2025-01-09', '09:00:00', '10:00:00', 'asdasdasdaasdasdasdasdasdsad', 'approved', 1, 1, 'jbacenas0@gmail.com', 6),
(13, '2025-01-09', '10:00:00', '11:00:00', 'asdasdasdasdasdasdasd', 'approved', 1, 1, 'jbacenas0@gmail.com', 6),
(14, '2025-01-09', '11:00:00', '12:00:00', 'qweqweqeqweqwe', 'approved', 1, 1, 'jbacenas0@gmail.com', 6),
(15, '2025-01-10', '08:00:00', '09:00:00', 'HILANTAN', 'approved', 1, 1, 'jbacenas0@gmail.com', 6),
(16, '2025-01-10', '09:00:00', '10:00:00', 'LBM', 'approved', 2, 2, 'jbacenas0@gmail.com', 6);

-- --------------------------------------------------------

--
-- Table structure for table `availability`
--

CREATE TABLE `availability` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `timeSlots` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`timeSlots`)),
  `user_id` int(11) NOT NULL,
  `status` enum('available','not_available') NOT NULL DEFAULT 'available',
  `bookedTimes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `availability`
--

INSERT INTO `availability` (`id`, `name`, `email`, `date`, `timeSlots`, `user_id`, `status`, `bookedTimes`) VALUES
(68, 'Jhorne Bhoy Dalapag Acenas', 'jbacenas0@gmail.com', '2025-01-09', '[]', 6, 'available', '[\"10:00 AM - 11:00 AM\", \"11:00 AM - 12:00 PM\"]'),
(69, 'Jhorne Bhoy Dalapag Acenas', 'jbacenas0@gmail.com', '2025-01-10', '[\"10:00 AM - 11:00 AM\",\"11:00 AM - 12:00 PM\"]', 6, 'available', '[\"08:00 AM - 09:00 AM\", \"09:00 AM - 10:00 AM\"]'),
(70, 'Jhorne Bhoy Dalapag Acenas', 'jbacenas0@gmail.com', '2025-01-11', '[\"09:00:00 - 10:00:00\",\"10:00:00 - 11:00:00\",\"11:00:00 - 12:00:00\"]', 6, 'available', '[\"08:00:00 - 09:00:00\"]'),
(71, 'Jhorne Bhoy Dalapag Acenas', 'jbacenas0@gmail.com', '2025-01-14', '[\"09:00:00 - 10:00:00\",\"10:00:00 - 11:00:00\",\"11:00:00 - 12:00:00\"]', 6, 'available', '[\"08:00:00 - 09:00:00\"]'),
(72, 'Jhorne Bhoy Dalapag Acenas', 'jbacenas0@gmail.com', '2025-01-16', '[\"08:00 AM - 09:00 AM\",\"09:00 AM - 10:00 AM\",\"10:00 AM - 11:00 AM\",\"11:00 AM - 12:00 PM\"]', 6, 'available', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `consultations`
--

CREATE TABLE `consultations` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `timeStart` time NOT NULL,
  `timeEnd` time NOT NULL,
  `guardianId` int(11) NOT NULL,
  `patientId` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `status` enum('pending','approved','declined') DEFAULT 'pending',
  `pediatricianId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `consultations`
--

INSERT INTO `consultations` (`id`, `date`, `timeStart`, `timeEnd`, `guardianId`, `patientId`, `description`, `email`, `status`, `pediatricianId`) VALUES
(2, '2025-01-14', '08:00:00', '09:00:00', 1, 1, 'FEVER', 'jbacenas0@gmail.com', 'approved', 6);

-- --------------------------------------------------------

--
-- Table structure for table `conversation`
--

CREATE TABLE `conversation` (
  `id` int(11) NOT NULL,
  `participant_1` int(11) NOT NULL,
  `participant_2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `conversation`
--

INSERT INTO `conversation` (`id`, `participant_1`, `participant_2`) VALUES
(65, 1, 6);

-- --------------------------------------------------------

--
-- Table structure for table `guardians`
--

CREATE TABLE `guardians` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `middlename` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) NOT NULL,
  `extension` varchar(50) DEFAULT NULL,
  `contact` varchar(20) DEFAULT NULL,
  `guardianAddress` varchar(255) DEFAULT NULL,
  `profileImage` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `guardians`
--

INSERT INTO `guardians` (`id`, `user_id`, `firstname`, `middlename`, `lastname`, `extension`, `contact`, `guardianAddress`, `profileImage`) VALUES
(1, 1, 'Jhorne Bhoy', 'Dalapag', 'Acenas', 'N/A', '09976231227', 'San Martin, Villanueva Misamis Oriental', '/uploads/profile_images/1736475679567.jpg'),
(2, 2, 'Era Mae', 'Saculingan', 'Dalura', 'N/A', '09976231227', NULL, NULL),
(3, 8, 'Anna', 'Dalapag', 'Acenas', '', '09976231227', NULL, NULL),
(4, 10, 'Jhorne Bhoy', 'Saculingan', 'Ebarle', '', '09976231227', 'Villanueva Misamis Oriental', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `conversation_id` int(11) NOT NULL,
  `sender` int(11) NOT NULL,
  `content` varchar(500) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `conversation_id`, `sender`, `content`, `time`) VALUES
(120, 65, 1, 'Hello Doc', '2025-01-10 01:59:02'),
(121, 65, 6, 'hello', '2025-01-10 01:59:11'),
(122, 65, 6, 'How may i help you?', '2025-01-10 01:59:24'),
(123, 65, 6, 'f86u-6htr-0zfv', '2025-01-10 02:06:47');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` int(11) NOT NULL,
  `guardian_id` int(11) NOT NULL,
  `patientName` varchar(255) NOT NULL,
  `patientAge` int(11) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `birthplace` varchar(255) DEFAULT NULL,
  `religion` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `fatherName` varchar(255) DEFAULT NULL,
  `fatherAge` int(11) DEFAULT NULL,
  `fatherOccupation` varchar(255) DEFAULT NULL,
  `motherName` varchar(255) DEFAULT NULL,
  `motherAge` int(11) DEFAULT NULL,
  `motherOccupation` varchar(255) DEFAULT NULL,
  `cellphone` varchar(20) DEFAULT NULL,
  `patientEmail` varchar(255) DEFAULT NULL,
  `informant` varchar(255) DEFAULT NULL,
  `relation` varchar(255) DEFAULT NULL,
  `medicalHistory` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `guardian_id`, `patientName`, `patientAge`, `birthdate`, `sex`, `birthplace`, `religion`, `address`, `fatherName`, `fatherAge`, `fatherOccupation`, `motherName`, `motherAge`, `motherOccupation`, `cellphone`, `patientEmail`, `informant`, `relation`, `medicalHistory`) VALUES
(1, 1, 'Dalapo, Beboy', 21, '2003-08-21', 'Male', 'Sagay, Camiguin Province', 'born again', 'Villanueva Misamis Oriental', 'Roldan Dalapo', 60, 'heavy equipment operator', 'Lany Luv', 60, 'House Keeper', '09976231227', 'irami11@gmail.com', 'Jhorne Bhoy Acenas', 'Son', 'asdasdasdasdasadsadasdasda'),
(2, 2, 'Acenas, Jhorne Bhoy D.', 21, '2003-01-11', 'Male', 'CDO', 'Roman Catholic', 'Villanueva', 'Acenas, Wenifredo B.', 56, 'Heavy Equipment Operator', 'Acenas, Anabel D.', 60, 'House Keeper', '09976231227', 'dalura.eramae@gmail.com', 'Dalura, Era Mae D.', 'Wife', 'asdasdasdasdasd'),
(3, 3, 'Dalura, Era Mae Saculingan', 21, '2002-08-21', 'Female', 'CAMIGUIN', 'born again', 'camiguin', 'Acenas, Wenifredo B.', 57, 'Heavy Equipment Operator', 'Acenas, Anabel D.', 60, 'House Keeper', '09976231227', 'anna.acenas@gmail.com', 'Anabel D. Acenas', 'Mother', 'asdasdasdasd'),
(4, 4, 'Dalura, Era Mae Saculingan', 21, '2003-01-11', 'Female', 'CDO', 'born again', 'Villanueva', 'roldan', 67, 'Heavy Equipment Operator', 'leny', 55, 'asdasdasda', '1231412414141', 'irami11@gmail.com', 'Dalura, Era Mae D.', 'Mother', 'asdfasdfasdf');

-- --------------------------------------------------------

--
-- Table structure for table `pediatricians`
--

CREATE TABLE `pediatricians` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `middlename` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) NOT NULL,
  `extension` varchar(50) DEFAULT NULL,
  `contact` varchar(20) DEFAULT NULL,
  `clinicAddress` varchar(255) DEFAULT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  `profileImage` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pediatricians`
--

INSERT INTO `pediatricians` (`id`, `user_id`, `firstname`, `middlename`, `lastname`, `extension`, `contact`, `clinicAddress`, `specialization`, `profileImage`) VALUES
(2, 6, 'Jhorne Bhoy', 'Dalapag', 'Acenas', 'N/A', '09976231227', NULL, NULL, NULL),
(3, 9, 'Lessa Mae', 'D', 'Ebarle', '', '09976231227', 'Ace Medical Center, Lapasan Cagayan De Oro City', 'pediatrician', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `userType` enum('Guardian','Pediatrician','Admin') NOT NULL,
  `emailVerified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `userType`, `emailVerified`) VALUES
(1, 'acenas.jhornebhoy@gmail.com', '$2b$10$93lv7TIKBL0QK4L1EXJSduV2WeokzyQNj.fHY2lqS2paU3EkQJYX.', 'Guardian', 1),
(2, 'dalura.eramae@gmail.com', '$2b$10$HobqPts8R//ZMW/V5YmalezXjg2wKNSzWuwU8i1sN3fIQWpU7dcxi', 'Guardian', 1),
(6, 'jbacenas0@gmail.com', '$2b$10$snZ7WgnCFWZN53SqU5zuUexr4BIEwcWrQLe7kSjhW7vAQZ9vHi1QC', 'Pediatrician', 1),
(7, 'dodo123lomopog@gmail.com', '$2b$10$snZ7WgnCFWZN53SqU5zuUexr4BIEwcWrQLe7kSjhW7vAQZ9vHi1QC', 'Admin', 1),
(8, 'anna.acenas@gmail.com', '$2b$10$K2KL8H4jdDmj2VYez138VOZJ0j4OJmzfBIYnZ1a8.YZNAjucMdE.S', 'Guardian', 1),
(9, 'lessaebarle@gmail.com', '$2b$10$pL4TQmDrVBWZ2RE6ojdY0OPfGGyJbl1Pp7l56R5slMRmwZTnVSPRS', 'Pediatrician', 1),
(10, 'gege@gmail.com', '$2b$10$.TxeAMTOCi/V9c5k/1jCguQdIQ5DUHHAMO8S6Soa9Gbcr.9flwbU6', 'Guardian', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `guardianId` (`guardianId`),
  ADD KEY `patientId` (`patientId`);

--
-- Indexes for table `availability`
--
ALTER TABLE `availability`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user` (`user_id`);

--
-- Indexes for table `consultations`
--
ALTER TABLE `consultations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `guardianId` (`guardianId`),
  ADD KEY `patientId` (`patientId`);

--
-- Indexes for table `conversation`
--
ALTER TABLE `conversation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `participant_1` (`participant_1`),
  ADD KEY `participant_2` (`participant_2`);

--
-- Indexes for table `guardians`
--
ALTER TABLE `guardians`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `conversation_id` (`conversation_id`),
  ADD KEY `sender` (`sender`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `guardian_id` (`guardian_id`);

--
-- Indexes for table `pediatricians`
--
ALTER TABLE `pediatricians`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `availability`
--
ALTER TABLE `availability`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `consultations`
--
ALTER TABLE `consultations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `conversation`
--
ALTER TABLE `conversation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `guardians`
--
ALTER TABLE `guardians`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pediatricians`
--
ALTER TABLE `pediatricians`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`guardianId`) REFERENCES `guardians` (`id`),
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`patientId`) REFERENCES `patients` (`id`);

--
-- Constraints for table `availability`
--
ALTER TABLE `availability`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `consultations`
--
ALTER TABLE `consultations`
  ADD CONSTRAINT `consultations_ibfk_1` FOREIGN KEY (`guardianId`) REFERENCES `guardians` (`id`),
  ADD CONSTRAINT `consultations_ibfk_2` FOREIGN KEY (`patientId`) REFERENCES `patients` (`id`);

--
-- Constraints for table `conversation`
--
ALTER TABLE `conversation`
  ADD CONSTRAINT `conversation_ibfk_1` FOREIGN KEY (`participant_1`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `conversation_ibfk_2` FOREIGN KEY (`participant_2`) REFERENCES `users` (`id`);

--
-- Constraints for table `guardians`
--
ALTER TABLE `guardians`
  ADD CONSTRAINT `guardians_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`conversation_id`) REFERENCES `conversation` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`sender`) REFERENCES `users` (`id`);

--
-- Constraints for table `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`guardian_id`) REFERENCES `guardians` (`id`);

--
-- Constraints for table `pediatricians`
--
ALTER TABLE `pediatricians`
  ADD CONSTRAINT `pediatricians_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
