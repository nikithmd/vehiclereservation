-- MySQL dump 10.13  Distrib 8.0.18, for osx10.14 (x86_64)
--
-- Host: localhost    Database: carrentalsystem
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `driver_license` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `first_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `last_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `expiry_date` date DEFAULT NULL,
  `phone_number` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`driver_license`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES ('A-123456-1234-13','Shareen','Ali','2020-10-22','5149746135'),('A-654321-1234-13','Munish','Sehdev','2022-03-11','5149746135');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `driver_license` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `license_plate` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT NULL,
  `duedate` timestamp NULL DEFAULT NULL,
  `type` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `startdate` timestamp NULL DEFAULT NULL,
  `cancelled` int(11) DEFAULT NULL,
  `vehicle_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `driver_license_idx` (`driver_license`),
  KEY `driver_license_id` (`driver_license`),
  KEY `license_plate_idx` (`license_plate`),
  CONSTRAINT `driver_license` FOREIGN KEY (`driver_license`) REFERENCES `clients` (`driver_license`),
  CONSTRAINT `license_plate` FOREIGN KEY (`license_plate`) REFERENCES `vehicles` (`license_plate`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (2,'A-123456-1234-13','ABC PQR','2019-11-17 02:57:07','2019-09-25 04:00:00','Rent','2019-09-23 04:00:00',0,1);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `password` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `type` int(2) DEFAULT NULL,
  `first_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `last_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `token` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('admin','$2b$10$Ocz2UL8ZJ9V1dHxyaBuLXOGjmyNEC.1CUHUo45a6Ncrj4ifF8AAxa',0,'Admin','Admin','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiYWRtaW4iLCJ0eXBlIjowLCJmaXJzdF9uYW1lIjoiQWRtaW4iLCJsYXN0X25hbWUiOiJBZG1pbiIsInRva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjFjMlZ5SWpwN0luVnpaWEp1WVcxbElqb2lZV1J0YVc0aUxDSjBlWEJsSWpvd0xDSm1hWEp6ZEY5dVlXMWxJam9pUVdSdGFXNGlMQ0pzWVhOMFgyNWhiV1VpT2lKQlpHMXBiaUlzSW5SdmEyVnVJam9pWlhsS2FHSkhZMmxQYVVwSlZYcEpNVTVwU1hOSmJsSTFZME5KTmtscmNGaFdRMG81TG1WNVNqRmpNbFo1U1dwd04wbHVWbnBhV0VwMVdWY3hiRWxxYjJsWlYxSjBZVmMwYVV4RFNqQmxXRUpzU1dwdmQweERTbTFoV0VwNlpFWTVkVmxYTVd4SmFtOXBVVmRTZEdGWE5HbE1RMHB6V1ZoT01GZ3lOV2hpVjFWcFQybEtRbHBITVhCaWFVbHpTVzVTZG1FeVZuVkphbTlwV2xoc1MyRkhTa2haTW14UVlWVndTbFpZY0VwTlZUVndVMWhPU21Kc1NURlpNRTVLVG10c2NtTkdhRmRSTUc4MVRHMVdOVk5xUm1wTmJGbzFVMWR3ZDA0d2JIVldibkJoVjBWd01WZFdZM2hpUld4eFlqSnNXbFl4U2pCWlZtTXdZVlY0UkZOcVFteFhSVXB6VTFkd2RtUXdlRVJUYlRGb1YwVndObHBGV1RWa1ZteFlUVmQ0U21GdE9YQlZWbVJUWkVkR1dFNUhiRTFSTUhCNlYxWm9UMDFHWjNsT1YyaHBWakZXY0ZReWJFdFJiSEJJVFZoQ2FXRlZiSHBUVnpWVFpHMUZlVlp1VmtwaGJUbHdWMnhvYzFNeVJraFRhMmhhVFcxNFVWbFdWbmRUYkZwWlkwVndUbFpVVm5kVk1XaFBVMjFLYzFOVVJscE5SVFZMVkcxMGMyTnRUa2RoUm1SU1RVYzRNVlJITVZkT1ZrNXhVbTF3VG1KR2J6RlZNV1IzWkRBMGQySklWbGRpYmtKb1ZqQldkMDFXWkZkWk0yaHBVbGQ0ZUZscVNuTlhiRmw0VTJwQ1dsWnRUWGRaVmxZMFVrWk9jVkZ0ZUZoU1ZYQjZWVEZrZDJSdFVYZGxSVkpVWWxSR2IxWXdWbmRPYkhCR1YxUldhMVp0ZUZsVVZtUTBVMjFHZEU5WVFsWldiVkpVV2tWa1IxZEZOVWhpUlRGU1RVaENObFl4V205VU1ERkhXak5zVDFZeWFIQldha1pYWTBaUmVXSkZkRkppU0VKSlZGWm9RMkZYUmxaaVNIQlVWbnBXVkZwSE1VWmxWbHAxVm10d2FHSnJTWGhYYTFwclRrZE5lVmRzVW10TmJYaHZWbXBDV21ReFRsaGpTRnBzVWxSV1ZsZFVUbmRWUmxwSFVtcE9WVll6UWxOYVZWWTBVa1pPZEdWSGVGUlNWVnAzVmtSS2QxSnJNVlpPVkZwVlZrWmFVRlZyVmtkT2JGSldWV3RrVUZWNlZrUldWbVF3WVd4R2MxbDZVbXBTVmxwSlZHeG9VMVZHU2paaVJXUnFZV3MxVDFsclZtOWliRmwzWTBaT2FXRnNXbk5XYlhoTFRsVTVSbEp0ZEdsaGJGcDBWRmMxUTAxV1JYbGtTRXBLWW1wQ2VsTlhNWE5oUjFKRVUxUmFUbFpHVlhwVVdIQnlUVlV4Y1ZaVVZsQlJNMlJ3VjJ4b2IyUXdiSEZpTTJoUFZrZE9ObFF4VWxabFZUVnhWbFJTYlZWVE5XbE5hM2N4VVRGTk1GTnViRWRpTVd4WlkwYzFlbUp0V1RWVE1tZDBVVzVaZEdJd05VVk9iVnA0VEZkb05WWkhiRXRoUlRsTVdteHNla2x1TUhOSmJXeG9aRU5KTmsxVVZUTk5lbXN5VDBSbmQwMURkMmxhV0doM1NXcHZlRTVVWTNwUFZGazBUMFJaZDJaUkxqTlZhRm93Um5GdWNFOVVTbkF5UWtWUGRITmZVbkZ4UW10TGVFcEJNVmMxVGtSaGRFOVVVMWRIZHpnaWZTd2lhV0YwSWpveE5UY3pPVGN6TVRFeExDSmxlSEFpT2pFMU56TTVOek14TnpGOS5DOC1kWkdMaks3SXNCeGl6Ml9OdVJvWWdjTVFPY3VDNldWWk8yakRkVUg4In0sImlhdCI6MTU3Mzk3NjYyMCwiZXhwIjoxNTczOTc2NjgwfQ.rPFpQeAeFr8nrLLYkHqDpb9NAE6oYPoKUuG22_GlPKo'),('djmunish','$2b$10$TjUoftGnkjMSYSo3ErEAKOO9.XifIgur1bQKuturPDDzM.aS2KAvW',1,'Munish','Sehdev','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZGptdW5pc2giLCJ0eXBlIjoxLCJmaXJzdF9uYW1lIjoiTXVuaXNoIiwibGFzdF9uYW1lIjoiU2VoZGV2IiwidG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKMWMyVnlJanA3SW5WelpYSnVZVzFsSWpvaVpHcHRkVzVwYzJnaUxDSjBlWEJsSWpveExDSm1hWEp6ZEY5dVlXMWxJam9pVFhWdWFYTm9JaXdpYkdGemRGOXVZVzFsSWpvaVUyVm9aR1YySWl3aWRHOXJaVzRpT2lKbGVVcG9Za2RqYVU5cFNrbFZla2t4VG1sSmMwbHVValZqUTBrMlNXdHdXRlpEU2prdVpYbEtNV015Vm5sSmFuQTNTVzVXZWxwWVNuVlpWekZzU1dwdmFWcEhjSFJrVnpWd1l6Sm5hVXhEU2pCbFdFSnNTV3B2ZUV4RFNtMWhXRXA2WkVZNWRWbFhNV3hKYW05cFZGaFdkV0ZZVG05SmFYZHBZa2RHZW1SR09YVlpWekZzU1dwdmFWVXlWbTlhUjFZeVNXbDNhV1JIT1hKYVZ6UnBUMjAxTVdKSGVEbE1RMHB3V1ZoUmFVOXFSVEZPZWswMVRYcFpOVTVFVFhOSmJWWTBZME5KTmsxVVZUTk5lbXQ2VG5wQmQwMHpNQzVYY0VWMlZrWllNRVZLVTAxclltdHZTMXBtTlU5VmRXdGFZekp1Y0dSSlUzaDRVM2R5Y1hoWU9VNVJJbjBzSW1saGRDSTZNVFUzTXprek9UYzJNQ3dpWlhod0lqb3hOVGN6T1RNNU9ESXdmUS5KTThqbUpQcHNYU0xpd2JHOWtIbWtzdjFwWmdqckJjX2VBQWVuZTh5R0U4In0sImlhdCI6MTU3Mzk3MzA5OCwiZXhwIjoxNTczOTczMTU4fQ.4IzS7uD3eBSz_3JYJAOwJKmzv8MRPsRbXN-rkXViOrs'),('shareenali','$2b$10$FgqF575WSYkSvImsJSaRvO/tEsVrUq.ibAqmn7w6mRs/5lkpn9DYC',1,'Shareen','Ali',NULL),('sukesh','$2b$10$7mtzoOtl2lOCUyw9/Ghjre.vndt6Qf8kFbnaKWaCT.E/Vuh8mukM6',0,'Sukesh','M',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicles` (
  `license_plate` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `type` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `make` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `model` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `year` int(4) DEFAULT NULL,
  `color` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `license_plate_UNIQUE` (`license_plate`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicles`
--

LOCK TABLES `vehicles` WRITE;
/*!40000 ALTER TABLE `vehicles` DISABLE KEYS */;
INSERT INTO `vehicles` VALUES ('ABC PQR','SUV','Nissan','Rouge',2018,'Silver',1),('ABC XYZ','SUV','Nissan','Rouge',2017,'Black',2),('XYZ PQR','SUV','Nissan','Rouge',2016,'Black',3),('AC1 2C4','Sports','Audi','R8',2017,'White',4),('C3F A3G','SUV','BMW','X5',2017,'White',5),('GFE 34G','Sedan','BMW','M3',2018,'Blue',6),('EFV 4E3','Sedan','Audi','A4',2019,'Grey',7),('FF5 E2A','Sedan','Audi','A6',2019,'Orange',8),('GH3 12K','Sedan','Audi','RS 3',2018,'Silver',9),('ABF 22L','SUV','Subaru','Forester',2019,'Black',10);
/*!40000 ALTER TABLE `vehicles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-17 23:41:12
