SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

DROP TABLE IF EXISTS `tbl_assignedsubject`, `tbl_grades`, `tbl_schoolinfo`, `tbl_section`, `tbl_student`, `tbl_studentinfo`, `tbl_subject`, `tbl_user`, `tbl_yearlevel`;

-- Table structure for `tbl_assignedsubject`-- 
CREATE TABLE IF NOT EXISTS `tbl_assignedsubject` (
`id` varchar(50) NOT NULL,
`teacher_id` varchar(50) NOT NULL,
`year` varchar(50) NOT NULL,
`section` varchar(50) NOT NULL,
`subject` varchar(50) NOT NULL,
`status` varchar(1) NOT NULL,
`schoolYear` varchar(100) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table `tbl_assignedsubject`-- 
INSERT INTO `tbl_assignedsubject` (`id`, `teacher_id`, `year`, `section`, `subject`, `status`, `schoolYear`) VALUES 
('356a192b7913b04c54574d18c28d46e6395428ab', '356a192b7913b04c54574d18c28d46e6395428ab', 'Grade 1', 'Section 1', 'Filipino 1', '1', '["06-2016","03-2017"]'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Grade 7', 'Aristotle', 'Filipino', '1', '["06-2016","03-2017"]'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', '356a192b7913b04c54574d18c28d46e6395428ab', 'Grade 1', 'Section 2', 'Filipino 1', '1', '["06-2016","03-2017"]'),
('fc074d501302eb2b93e2554793fcaf50b3bf7291', '', '', '', '', '1', '');



-- Table structure for `tbl_grades`-- 
CREATE TABLE IF NOT EXISTS `tbl_grades` (
`id` varchar(50) NOT NULL,
`highest_score` int(3) NOT NULL,
`scores` text NOT NULL,
`quarter` varchar(100) NOT NULL,
`details` varchar(100) NOT NULL,
`component` varchar(100) NOT NULL,
`date` varchar(100) NOT NULL,
`teacher_id` varchar(50) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table `tbl_grades`-- 


-- Table structure for `tbl_schoolinfo`-- 
CREATE TABLE IF NOT EXISTS `tbl_schoolinfo` (
`id` varchar(50) NOT NULL,
`schoolName` varchar(100) NOT NULL,
`schoolID` varchar(10) NOT NULL,
`schoolYearStart` varchar(20) NOT NULL,
`schoolYearEnd` varchar(20) NOT NULL,
`region` varchar(50) NOT NULL,
`division` varchar(50) NOT NULL,
`details` varchar(500) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table `tbl_schoolinfo`-- 
INSERT INTO `tbl_schoolinfo` (`id`, `schoolName`, `schoolID`, `schoolYearStart`, `schoolYearEnd`, `region`, `division`, `details`) VALUES 
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Mangaldan National High School', '123456', '06-2016', '08-2017', 'Region 1', '2', '["df58248c414f342c81e056b40bee12d17a08bf61-1494548227.apr","df58248c414f342c81e056b40bee12d17a08bf61-1494575530.apr","Mangaldan, Pangasinan"]');



-- Table structure for `tbl_section`-- 
CREATE TABLE IF NOT EXISTS `tbl_section` (
`id` varchar(50) NOT NULL,
`section` varchar(100) NOT NULL,
`order` int(2) NOT NULL,
`year` varchar(50) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table `tbl_section`-- 
INSERT INTO `tbl_section` (`id`, `section`, `order`, `year`) VALUES 
('356a192b7913b04c54574d18c28d46e6395428ab', 'Section 1', '1', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Aristotle', '1', 'c1dfd96eea8cc2b62785275bca38ac261256e278'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Section 2', '2', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c');



-- Table structure for `tbl_student`-- 
CREATE TABLE IF NOT EXISTS `tbl_student` (
`id` varchar(50) NOT NULL,
`student_id` varchar(50) NOT NULL,
`year` varchar(20) NOT NULL,
`section` varchar(20) NOT NULL,
`date` varchar(20) NOT NULL,
`status` int(1) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table `tbl_student`-- 
INSERT INTO `tbl_student` (`id`, `student_id`, `year`, `section`, `date`, `status`) VALUES 
('0716d9708d321ffb6a00818614779e779925365c', '16-LNSHS-0101', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('0a57cb53ba59c46fc4b692527a38a87c78d84028', '16-LNSHS-0112', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', '16-LNSHS-0093', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('12c6fc06c99a462375eeb3f43dfd832b08ca9e17', '16-LNSHS-0106', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('1574bddb75c78a6fd2251d61e2993b5146201319', '16-LNSHS-0100', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('17ba0791499db908433b80f37c5fbc89b870084b', '16-LNSHS-0095', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('1b6453892473a467d07372d45eb05abc2031647a', '16-LNSHS-0088', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('22d200f8670dbdb3e253a90eee5098477c95c23d', '16-LNSHS-0114', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('356a192b7913b04c54574d18c28d46e6395428ab', '16-LNSHS-0085', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('472b07b9fcf2c2451e8781e944bf5f77cd8457c8', '16-LNSHS-0105', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('4d134bc072212ace2df385dae143139da74ec0ef', '16-LNSHS-0108', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('632667547e7cd3e0466547863e1207a8c0c0c549', '16-LNSHS-0115', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('7719a1c782a1ba91c031a682a0a2f8658209adbf', '16-LNSHS-0113', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', '16-LNSHS-0087', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('7b52009b64fd0a2a49e6d8a939753077792b0554', '16-LNSHS-0096', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('887309d048beef83ad3eabf2a79a64a389ab1c9f', '16-LNSHS-0110', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('902ba3cda1883801594b6e1b452790cc53948fda', '16-LNSHS-0091', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('91032ad7bbcb6cf72875e8e8207dcfba80173f7c', '16-LNSHS-0104', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('972a67c48192728a34979d9a35164c1295401b71', '16-LNSHS-0119', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('9e6a55b6b4563e652a23be9d623ca5055c356940', '16-LNSHS-0102', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '16-LNSHS-0089', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('b1d5781111d84f7b3fe45a0852e59758cd7a87e5', '16-LNSHS-0094', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', '16-LNSHS-0103', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '16-LNSHS-1993', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('b6692ea5df920cad691c20319a6fffd7a4a766b8', '16-LNSHS-0117', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('bc33ea4e26e5e1af1408321416956113a4658763', '16-LNSHS-0111', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('bd307a3ec329e10a2cff8fb87480823da114f8f4', '16-LNSHS-0097', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('c1dfd96eea8cc2b62785275bca38ac261256e278', '16-LNSHS-0090', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('cb4e5208b4cd87268b208e49452ed6e89a68e0b8', '16-LNSHS-0116', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('d435a6cdd786300dff204ee7c2ef942d3e9034e2', '16-LNSHS-0107', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', '16-LNSHS-0086', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('f1abd670358e036c31296e66b3b66c382ac00812', '16-LNSHS-0099', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59', '16-LNSHS-0118', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('f6e1126cedebf23e1463aee73f9df08783640400', '16-LNSHS-0109', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', '16-LNSHS-0098', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('fc074d501302eb2b93e2554793fcaf50b3bf7291', '16-LNSHS-0120', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0'),
('fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '16-LNSHS-0092', 'Grade 1', 'Section 2', '2017-05-14 15:08:54', '0');



-- Table structure for `tbl_studentinfo`-- 
CREATE TABLE IF NOT EXISTS `tbl_studentinfo` (
`id` varchar(50) NOT NULL,
`family_name` varchar(50) NOT NULL,
`given_name` varchar(50) NOT NULL,
`middle_name` varchar(50) NOT NULL,
`gender` varchar(10) NOT NULL,
`date_of_birth` varchar(10) NOT NULL,
`place_of_birth` varchar(100) NOT NULL,
`permanent_address` varchar(100) NOT NULL,
`citizenship` varchar(20) NOT NULL,
`height` varchar(10) NOT NULL,
`weight` varchar(10) NOT NULL,
`mother_name` varchar(100) NOT NULL,
`father_name` varchar(100) NOT NULL,
`picture` varchar(100) NOT NULL,
`date` varchar(20) NOT NULL,
`student_id` varchar(50) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table `tbl_studentinfo`-- 
INSERT INTO `tbl_studentinfo` (`id`, `family_name`, `given_name`, `middle_name`, `gender`, `date_of_birth`, `place_of_birth`, `permanent_address`, `citizenship`, `height`, `weight`, `mother_name`, `father_name`, `picture`, `date`, `student_id`) VALUES 
('0716d9708d321ffb6a00818614779e779925365c', 'PASILIAO', 'Jan Joshua', 'Penuliar', 'Male', '02/12/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0101'),
('0a57cb53ba59c46fc4b692527a38a87c78d84028', 'SINOCRUZ', 'Sherryca', 'Siangco', 'Female', '02/23/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0112'),
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'FERNANDEZ', 'Richard Dean', 'Panlilio', 'Male', '02/4/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0093'),
('12c6fc06c99a462375eeb3f43dfd832b08ca9e17', 'SORIANO', 'Doeche', 'Baguilod ', 'Male', '02/17/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0106'),
('1574bddb75c78a6fd2251d61e2993b5146201319', 'PARAGAS', 'Diether', 'Caguioa', 'Male', '02/11/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0100'),
('17ba0791499db908433b80f37c5fbc89b870084b', 'GABRIEL', 'Jayson', 'Cruz', 'Male', '02/6/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0095'),
('1b6453892473a467d07372d45eb05abc2031647a', 'CORPUZ', 'Morris', 'Canto', 'Male', '01/30/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0088'),
('22d200f8670dbdb3e253a90eee5098477c95c23d', 'TANDOC', 'Mikee Efren', 'Cruz', 'Male', '02/25/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0114'),
('356a192b7913b04c54574d18c28d46e6395428ab', 'BARAQUIO', 'Justin', 'Aquino', 'Male', '01/27/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0085'),
('472b07b9fcf2c2451e8781e944bf5f77cd8457c8', 'SISON', 'Rhea Lyn', 'Versoza', 'Female', '02/16/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0105'),
('4d134bc072212ace2df385dae143139da74ec0ef', 'VERSOZA', 'John Albert', 'Escano', 'Male', '02/19/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0108'),
('632667547e7cd3e0466547863e1207a8c0c0c549', 'TURINGAN', 'Princess Jhoy', 'Pascua', 'Female', '02/26/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0115'),
('7719a1c782a1ba91c031a682a0a2f8658209adbf', 'SISON', 'Jessa Mae', 'Aquino', 'Female', '02/24/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0113'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', 'CORPUZ', 'Justin Loiusse ', 'Repato', 'Male', '01/29/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0087'),
('7b52009b64fd0a2a49e6d8a939753077792b0554', 'MALICDEM', 'Roger Jr ', 'Caburnay', 'Male', '02/7/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0096'),
('887309d048beef83ad3eabf2a79a64a389ab1c9f', 'ROSARIO', 'Jamaica', 'Ferrer', 'Female', '02/21/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0110'),
('902ba3cda1883801594b6e1b452790cc53948fda', 'CRUZ', 'Rod Michael', 'Reyna', 'Male', '02/2/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0091'),
('91032ad7bbcb6cf72875e8e8207dcfba80173f7c', 'ROVILLOS', 'Jamaica', 'Tongcalo', 'Female', '02/15/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0104'),
('972a67c48192728a34979d9a35164c1295401b71', 'VILLANUEVA', 'Al Nicholson', 'Pinzon', 'Male', '03/2/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0119'),
('9e6a55b6b4563e652a23be9d623ca5055c356940', 'PASILIAO', 'Julius', 'Estrada ', 'Male', '02/13/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0102'),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'CRUZ', 'Clarenz Justin', 'Viray', 'Male', '01/31/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0089'),
('b1d5781111d84f7b3fe45a0852e59758cd7a87e5', 'FUERTE', 'John Kenneth', 'Dela Cruz', 'Male', '02/5/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0094'),
('b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', 'REYES', 'Tresha May', 'Caasi', 'Female', '02/14/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0103'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'gabrillo', 'rufo', 'narcisi', 'Male', '01/26/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-1993'),
('b6692ea5df920cad691c20319a6fffd7a4a766b8', 'VENTAYEN', 'Ventayen', 'Vargas', 'Male', '02/28/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0117'),
('bc33ea4e26e5e1af1408321416956113a4658763', 'SALAMAT', 'Limuel', 'Esmena', 'Male', '02/22/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0111'),
('bd307a3ec329e10a2cff8fb87480823da114f8f4', 'MERCADO', 'Tina', 'Aviles', 'Female', '02/8/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0097'),
('c1dfd96eea8cc2b62785275bca38ac261256e278', 'CRUZ', 'Mark Anthony', 'Reyna', 'Male', '02/1/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0090'),
('cb4e5208b4cd87268b208e49452ed6e89a68e0b8', 'UNTALAN', 'Jeremy', 'Dela Cruz', 'Male', '02/27/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0116'),
('d435a6cdd786300dff204ee7c2ef942d3e9034e2', 'VENTURA', 'Mark Vince', 'Bautista', 'Male', '02/18/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0107'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'BELLEZA', 'Mark Daniel', 'Caguioa', 'Male', '01/28/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0086'),
('f1abd670358e036c31296e66b3b66c382ac00812', 'OCAL', 'Vivian', 'Franco', 'Female', '02/10/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0099'),
('f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59', 'VERZOSA', 'Diony', 'Guittap ', 'Male', '03/1/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0118'),
('f6e1126cedebf23e1463aee73f9df08783640400', 'VICENTE', 'Trisha Mae', 'Ramos', 'Female', '02/20/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0109'),
('fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', 'NIMER', 'Cleopearl', 'Gulmatico', 'Male', '02/9/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0098'),
('fc074d501302eb2b93e2554793fcaf50b3bf7291', 'VILLEGAS', 'Benjie', 'Bumanlag', 'Male', '03/3/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0120'),
('fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'DELA CRUZ', 'Francheska', 'Malanum ', 'Male', '02/3/1993', '', '', '', '', '', '', '', 'avatar.jpg', '2017-05-14 15:08:54', '16-LNSHS-0092');



-- Table structure for `tbl_subject`-- 
CREATE TABLE IF NOT EXISTS `tbl_subject` (
`id` varchar(50) NOT NULL,
`subject_code` varchar(20) NOT NULL,
`subject_title` varchar(1000) NOT NULL,
`subject_discription` varchar(250) NOT NULL,
`subject_sort` varchar(2) NOT NULL,
`year` varchar(50) NOT NULL,
`weight` varchar(20) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table `tbl_subject`-- 
INSERT INTO `tbl_subject` (`id`, `subject_code`, `subject_title`, `subject_discription`, `subject_sort`, `year`, `weight`) VALUES 
('356a192b7913b04c54574d18c28d46e6395428ab', 'Fil-1', '["Filipino 1"]', 'No description', '1', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '[30,30,40]'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Filipino', '["Filipino"]', 'No description', '1', 'c1dfd96eea8cc2b62785275bca38ac261256e278', '[20,20,60]');



-- Table structure for `tbl_user`-- 
CREATE TABLE IF NOT EXISTS `tbl_user` (
`id` varchar(50) NOT NULL,
`name` varchar(100) NOT NULL,
`username` varchar(50) NOT NULL,
`password` varchar(50) NOT NULL,
`picture` varchar(60) NOT NULL,
`status` int(1) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table `tbl_user`-- 
INSERT INTO `tbl_user` (`id`, `name`, `username`, `password`, `picture`, `status`) VALUES 
('01b307acba4f54f55aafc33bb06bbbf6ca803e9a', 'Administrator', 'admin', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', 'rufo.jpg', '1'),
('356a192b7913b04c54574d18c28d46e6395428ab', 'Rufo N. Gabrillo Jr.', 'rufongabrillojr', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', 'avatar.jpg', '2'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Carla Carmela P. Perez', 'carla', 'b67d5291646af614aabb8be2b188eb21322f0c65', 'avatar.jpg', '2');



-- Table structure for `tbl_yearlevel`-- 
CREATE TABLE IF NOT EXISTS `tbl_yearlevel` (
`id` varchar(50) NOT NULL,
`title` varchar(250) NOT NULL,
`chronological` int(2) NOT NULL,
`attribute` int(1) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table `tbl_yearlevel`-- 
INSERT INTO `tbl_yearlevel` (`id`, `title`, `chronological`, `attribute`) VALUES 
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Grade 10', '10', '1'),
('17ba0791499db908433b80f37c5fbc89b870084b', 'Grade 12', '12', '2'),
('1b6453892473a467d07372d45eb05abc2031647a', 'Grade 5', '5', '1'),
('356a192b7913b04c54574d18c28d46e6395428ab', 'Grade 2', '2', '1'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', 'Grade 4', '4', '1'),
('902ba3cda1883801594b6e1b452790cc53948fda', 'Grade 8', '8', '1'),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'Grade 6', '6', '1'),
('b1d5781111d84f7b3fe45a0852e59758cd7a87e5', 'Grade 11', '11', '2'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Grade 1', '1', '1'),
('c1dfd96eea8cc2b62785275bca38ac261256e278', 'Grade 7', '7', '1'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Grade 3', '3', '1'),
('fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'Grade 9', '9', '1');




/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- Buckup function --
-- Developed by Rufo N. Gabrillo Jr. --