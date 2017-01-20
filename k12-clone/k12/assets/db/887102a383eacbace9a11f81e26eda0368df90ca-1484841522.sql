SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

DROP TABLE IF EXISTS `tbl_assignedsubject`, `tbl_grades`;

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
('da4b9237bacccdf19c0760cab7aec4a8359010b0', '356a192b7913b04c54574d18c28d46e6395428ab', 'Grade 1', 'Section 2', 'Filipino 1', '1', '["06-2016","03-2017"]');



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



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- Buckup function --
-- Developed by Rufo N. Gabrillo Jr. --