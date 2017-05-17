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
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'School Name', 'School ID', '01-2016', '01-2016', 'Region', 'Division', '["logo.png","img-bg.jpg","School Address"]');



-- Table structure for `tbl_section`-- 
CREATE TABLE IF NOT EXISTS `tbl_section` (
`id` varchar(50) NOT NULL,
`section` varchar(100) NOT NULL,
`order` int(2) NOT NULL,
`year` varchar(50) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table `tbl_section`-- 


-- Table structure for `tbl_student`-- 
CREATE TABLE IF NOT EXISTS `tbl_student` (
`id` varchar(50) NOT NULL,
`student_id` varchar(20) NOT NULL,
`year` varchar(20) NOT NULL,
`section` varchar(20) NOT NULL,
`date` varchar(20) NOT NULL,
`status` int(1) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table `tbl_student`-- 


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
('01b307acba4f54f55aafc33bb06bbbf6ca803e9a', 'Administrator', 'admin', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', 'rufo.jpg', '1');



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