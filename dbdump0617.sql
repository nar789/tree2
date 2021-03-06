-- MySQL dump 10.13  Distrib 5.1.41, for Win32 (ia32)
--
-- Host: localhost    Database: tree
-- ------------------------------------------------------
-- Server version	5.1.41-community

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `tree`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `tree` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `tree`;

--
-- Table structure for table `experiment`
--

DROP TABLE IF EXISTS `experiment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `experiment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plant_id` int(11) DEFAULT NULL,
  `experiment_name` varchar(255) DEFAULT NULL,
  `experiment_attribute` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiment`
--

LOCK TABLES `experiment` WRITE;
/*!40000 ALTER TABLE `experiment` DISABLE KEYS */;
INSERT INTO `experiment` VALUES (25,3,'?멸린?ㅽ뿕','%7B%22table_name%22%3A%22berry1%22%2C%22attr_str%22%3A%5B%22light%22%2C%22seed%22%2C%22flower%22%5D%7D'),(26,2,'媛먯옄2?ㅽ뿕','%7B%22table_name%22%3A%22pt99%22%2C%22attr_str%22%3A%5B%22light%22%2C%22height%22%5D%7D'),(27,1,'?좊쭏?좎떎??','%7B%22table_name%22%3A%22ABC%22%2C%22attr_str%22%3A%5B%22tamato_Type%22%5D%7D');
/*!40000 ALTER TABLE `experiment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experiment_abc`
--

DROP TABLE IF EXISTS `experiment_abc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `experiment_abc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tamato_Type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiment_abc`
--

LOCK TABLES `experiment_abc` WRITE;
/*!40000 ALTER TABLE `experiment_abc` DISABLE KEYS */;
INSERT INTO `experiment_abc` VALUES (2,'A Type');
/*!40000 ALTER TABLE `experiment_abc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experiment_berry1`
--

DROP TABLE IF EXISTS `experiment_berry1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `experiment_berry1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `light` varchar(255) DEFAULT NULL,
  `seed` varchar(255) DEFAULT NULL,
  `flower` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiment_berry1`
--

LOCK TABLES `experiment_berry1` WRITE;
/*!40000 ALTER TABLE `experiment_berry1` DISABLE KEYS */;
INSERT INTO `experiment_berry1` VALUES (2,'light11','seed22','30媛?),(3,'light4','seed4','flower5');
/*!40000 ALTER TABLE `experiment_berry1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experiment_pt99`
--

DROP TABLE IF EXISTS `experiment_pt99`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `experiment_pt99` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `light` varchar(255) DEFAULT NULL,
  `height` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiment_pt99`
--

LOCK TABLES `experiment_pt99` WRITE;
/*!40000 ALTER TABLE `experiment_pt99` DISABLE KEYS */;
INSERT INTO `experiment_pt99` VALUES (1,'20light','300');
/*!40000 ALTER TABLE `experiment_pt99` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `image` (
  `id` int(11) NOT NULL,
  `experiment_name` varchar(255) DEFAULT NULL,
  `experiment_id` int(11) DEFAULT NULL,
  `type` text,
  `path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-17  0:31:26
