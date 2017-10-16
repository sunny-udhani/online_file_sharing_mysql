-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: dropbox
-- ------------------------------------------------------
-- Server version	5.7.19-log

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
-- Table structure for table `filedetails`
--

DROP TABLE IF EXISTS `filedetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `filedetails` (
  `fileDetailsID` varchar(100) NOT NULL,
  `fileName` varchar(200) NOT NULL,
  `fileCreatedDt` datetime NOT NULL,
  `fileDeletedDt` datetime DEFAULT NULL,
  `fileSharedDt` datetime DEFAULT NULL,
  `fileType` tinyint(4) DEFAULT NULL,
  `filePath` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`fileDetailsID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filedetails`
--

LOCK TABLES `filedetails` WRITE;
/*!40000 ALTER TABLE `filedetails` DISABLE KEYS */;
INSERT INTO `filedetails` VALUES ('12d39bce-b3e9-4215-bbe0-4277c7088422','WES - Apply Online.pdf','2017-10-08 00:00:00',NULL,NULL,0,'./sunny19@yahoo.com'),('474c9294-13b8-47f5-9a79-91ee283c347a','aaj','2017-10-08 00:00:00',NULL,NULL,1,'./sunny19@yahoo.com'),('4c4db1d3-1750-4c32-a776-c47b85813a8e','WES - Apply Online.pdf','2017-10-09 00:00:00',NULL,NULL,0,'./sunny19@yahoo.com/aaj'),('5ad064fb-62c8-441b-a766-f9f7fe157fbc','WES - Apply Online.pdf','2017-10-08 00:00:00',NULL,NULL,0,'./sunny19@yahoo.com'),('6017c87c-b5ae-443c-aa3e-47f41a33a80c','aaj','2017-10-09 00:00:00',NULL,NULL,1,'./sunny19@yahoo.com/aaj'),('9e5e6d5e-92a1-4dc9-b757-8c4d9d72d569','undefined','2017-10-16 00:00:00',NULL,NULL,1,'./sunny19@yahoo.com'),('a4940706-9150-4a20-9fb0-3cc12e11d87f','05-ConnPool.JMeter.Mocha.Security.pdf','2017-10-15 00:00:00',NULL,NULL,0,'./sunny19@yahoo.com'),('bee885cc-6a9a-4579-bff9-5a0d77f537e0','CMPE273-Lab1.pdf','2017-10-16 00:00:00',NULL,NULL,0,'./sunny19@yahoo.com'),('c67971c5-9e54-4420-8139-af6b366888a1','aaj','2017-10-10 00:00:00',NULL,NULL,1,'./sunny19@yahoo.com/aaj/aaj'),('cf026f56-0b19-4930-be78-29827f2914a6','NewFolder','2017-10-16 00:00:00',NULL,NULL,1,'./sunny19@yahoo.com'),('d9c32573-dc2d-45ee-beb1-fed5e3793d24','CMPE273-Lab1-draft.pdf','2017-10-16 00:00:00',NULL,NULL,0,'./sunny19@yahoo.com'),('db80d96d-8932-4b10-a3e3-f8dbafdd1680','World Education Services.pdf','2017-10-09 00:00:00',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `filedetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fileshare`
--

DROP TABLE IF EXISTS `fileshare`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fileshare` (
  `fileShareId` varchar(200) NOT NULL,
  `usersId` varchar(200) NOT NULL,
  `fileDetailsId` varchar(200) NOT NULL,
  `fromUserId` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`fileShareId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='table storing file share details.	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fileshare`
--

LOCK TABLES `fileshare` WRITE;
/*!40000 ALTER TABLE `fileshare` DISABLE KEYS */;
INSERT INTO `fileshare` VALUES ('69f003cd-9d93-4f60-85a3-49be1d51874a','18a2be61-3d0e-414a-86c6-093e9f7173bf','474c9294-13b8-47f5-9a79-91ee283c347a','f04b141f-5062-4965-a07f-dee41744e7c1'),('ced2c6e6-ec5e-4c0f-acb2-7511ef89bcba','18a2be61-3d0e-414a-86c6-093e9f7173bf','474c9294-13b8-47f5-9a79-91ee283c347a','f04b141f-5062-4965-a07f-dee41744e7c1'),('d9c69f37-f208-4693-b5e2-aa978f0d203b','18a2be61-3d0e-414a-86c6-093e9f7173bf','12d39bce-b3e9-4215-bbe0-4277c7088422','f04b141f-5062-4965-a07f-dee41744e7c1');
/*!40000 ALTER TABLE `fileshare` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userfile_relation`
--

DROP TABLE IF EXISTS `userfile_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userfile_relation` (
  `userFile_relationID` varchar(100) NOT NULL,
  `userfile_UserID` varchar(100) DEFAULT NULL,
  `userfile_fileID` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`userFile_relationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userfile_relation`
--

LOCK TABLES `userfile_relation` WRITE;
/*!40000 ALTER TABLE `userfile_relation` DISABLE KEYS */;
INSERT INTO `userfile_relation` VALUES ('13642efe-3738-41e6-9d04-483127ee9790','f04b141f-5062-4965-a07f-dee41744e7c1','474c9294-13b8-47f5-9a79-91ee283c347a'),('1c138b4e-3338-444f-b6ff-6831f733fed7','f04b141f-5062-4965-a07f-dee41744e7c1','db80d96d-8932-4b10-a3e3-f8dbafdd1680'),('27de8e58-ebb9-4232-97bd-098cfa6ea89d','f04b141f-5062-4965-a07f-dee41744e7c1','6017c87c-b5ae-443c-aa3e-47f41a33a80c'),('300e2776-6265-49a2-83c4-4d6f81266744','f04b141f-5062-4965-a07f-dee41744e7c1','4c4db1d3-1750-4c32-a776-c47b85813a8e'),('398d83a4-0469-44bf-bcf3-4b29d6be9b9f','f04b141f-5062-4965-a07f-dee41744e7c1','b1356136-43e8-46c8-b695-8a5a97ae6a3e'),('3a1dfc15-e8f1-40b9-a4cf-ef2f4c686abc','f04b141f-5062-4965-a07f-dee41744e7c1','a38b7e15-6e18-4398-9dbc-52641da7328b'),('41a1e82a-b2c4-40e7-a3b4-699d3969b145','f04b141f-5062-4965-a07f-dee41744e7c1','663fe0fa-bd8c-4a70-a0c2-adc867479bca'),('52fd717a-b95e-42cb-8d0c-51d46fab5b50','f04b141f-5062-4965-a07f-dee41744e7c1','9e5e6d5e-92a1-4dc9-b757-8c4d9d72d569'),('664a02eb-350b-4ca6-8dbf-331edb78848e','f04b141f-5062-4965-a07f-dee41744e7c1','bee885cc-6a9a-4579-bff9-5a0d77f537e0'),('69d1ae83-49cd-4616-accf-e263c608f1da','f04b141f-5062-4965-a07f-dee41744e7c1','12d39bce-b3e9-4215-bbe0-4277c7088422'),('6b065d96-f7c7-4480-91e4-3e3f68a88944','f04b141f-5062-4965-a07f-dee41744e7c1','2ac03f23-1833-44cc-a68a-7153ad8d5133'),('8c04bad8-cf94-4037-b079-6a445ba2a945','f04b141f-5062-4965-a07f-dee41744e7c1','84e13cc4-a64d-4f19-ac29-2ae602a2a00e'),('962e71f4-142e-466c-8f45-57572dc34f64','f04b141f-5062-4965-a07f-dee41744e7c1','01ebb55d-0d37-4b5d-ba49-fd541104d67f'),('9df679af-a3c5-4d01-8d14-5e91d9db01b8','f04b141f-5062-4965-a07f-dee41744e7c1','d9c32573-dc2d-45ee-beb1-fed5e3793d24'),('ac42582c-531d-46a3-a691-1c961a22f3c6','f04b141f-5062-4965-a07f-dee41744e7c1','c1669ec2-c736-4333-9664-d79ebb59bfcb'),('ae655c35-0c5d-42c9-a331-8260c05ea37b','f04b141f-5062-4965-a07f-dee41744e7c1','cf026f56-0b19-4930-be78-29827f2914a6'),('b0b38a94-f74e-4353-8dbe-69e6719b2102','f04b141f-5062-4965-a07f-dee41744e7c1','377a5db8-c5da-4d83-9dd5-c02b76dee02d'),('ba00d496-4085-4050-a084-53dd6e5a0e06','f04b141f-5062-4965-a07f-dee41744e7c1','a4940706-9150-4a20-9fb0-3cc12e11d87f'),('c384b98a-3286-4b26-a1f0-bdbaf365c069','f04b141f-5062-4965-a07f-dee41744e7c1','c67971c5-9e54-4420-8139-af6b366888a1'),('c75d918b-9ceb-4bbc-949a-0e3c62037342','f04b141f-5062-4965-a07f-dee41744e7c1','93415d73-493f-4433-bf88-d529dd4f352b'),('f175b1e8-58ae-4dd5-bb48-c2dd33e701f5','f04b141f-5062-4965-a07f-dee41744e7c1','5ad064fb-62c8-441b-a766-f9f7fe157fbc');
/*!40000 ALTER TABLE `userfile_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userId` varchar(200) NOT NULL,
  `userEmail` varchar(200) NOT NULL,
  `userPassword` varchar(200) NOT NULL,
  `userFirstName` varchar(45) DEFAULT NULL,
  `userLastName` varchar(45) DEFAULT NULL,
  `userWork` varchar(200) DEFAULT NULL,
  `userEducation` varchar(200) DEFAULT NULL,
  `userContact` varchar(14) DEFAULT NULL,
  `userInterests` varchar(250) DEFAULT NULL,
  `userBDate` datetime DEFAULT NULL,
  `userGender` varchar(100) DEFAULT NULL,
  `usersWork` varchar(200) DEFAULT NULL,
  `usersEdu` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userEmail_UNIQUE` (`userEmail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('06550a7c-6c14-494a-8fe6-e5c408d52e67','aaj.sunny@y.com','$2a$10$Z0ik6A7yjS3HslCj/HzXoOilSFY0AUVC15tcU9GqjThhJC1PYnhSC','Sunny','Udhani',NULL,NULL,NULL,NULL,'1212-12-12 00:00:00','male',NULL,NULL),('12674c46-8a7e-4e99-9a52-10953cf73d79','sunnewreiv@outlook.com','$2a$10$CFvitoMnrPsA7/6bUsboP.FJ6yBG30QQWLlmV0K0a5c7KC0YFlkF.','Sunny','Udhani',NULL,NULL,NULL,NULL,'1334-12-12 00:00:00','undefined',NULL,NULL),('177cfeb7-e422-4c9c-a09f-57d48b48de5f','aaj.sunny@yhoo.co','$2a$10$RSgT8wMNEgvBUnry4Vs4bunjS2ppR6ROVka6FeEcF40exVpVkoAr.','Sunny','Udhani',NULL,NULL,NULL,NULL,'1212-12-12 00:00:00','male',NULL,NULL),('18a2be61-3d0e-414a-86c6-093e9f7173bf','sunny15@yahoo.com','$2a$10$yGQLa5SiTe/U47YRaSGs8eVLqKThMOPUr84.42c/1m8JFZp/KorDW','undefined','undefined',NULL,NULL,NULL,NULL,'1212-12-12 00:00:00','undefined',NULL,NULL),('1f60fe24-b839-43cf-b855-f6a8189349de','sunny09@yahoo.com','$2a$10$WiSa1TA48thUdXKoV60H0u2yzr4jn5dW3B86slzSAM5Yv91HNlBe6','Sunny','Udhani',NULL,NULL,NULL,NULL,'1993-12-12 00:00:00','undefined',NULL,NULL),('212b97d2-a046-4d48-8bab-b8a14c9237fb','sjsu@sjsu.edu','$2a$10$.u.x/0.gTn2zOS2ngk5s6..lskWm55SBeySNGIYrKsFqId1mlAAt2','Sunny','Udhani','sjsu','masti',NULL,'singing','1212-12-12 00:00:00','male',NULL,NULL),('3191c312-5565-4612-bd1f-4fe93513f977','sunnysjsu@yahoo.com','$2a$10$gr77.AJS5Ah6tllAh0E0AOFzkr4F0O5haO8kZmxNHry6vzA1H0KOy','Sunny','Udhani',NULL,NULL,NULL,NULL,'1111-12-12 00:00:00','male','sjsu','masti'),('3a478c6f-4ad0-43ed-8dc6-d4d5312f1f65','sunny1@yahoo.com','$2a$10$HDsJkFaofYLHehbisiJ/P.G6ApgoEy5hOLVtguFQ4Nra28wGFvw4.','Sunny','Udhani',NULL,NULL,NULL,NULL,'1212-12-12 00:00:00','male',NULL,NULL),('3a80bfa4-9ced-48d3-b460-d8a2a01f01a4','sunny17@yahoo.com','$2a$10$Ip5VsEwqOgbMnOswKCtVMe.8pmsCBlFuAED7XHQY3N16Spg8SpHEK','undefined','undefined',NULL,NULL,NULL,NULL,'1212-12-12 00:00:00','male',NULL,NULL),('3b66f9d7-8acd-4317-b433-a2ba15929498','sunny7@yahoo.com','$2a$10$5ZqTbKlB9e.stOgHjBZIouYrCTT2ApMz9TWjOaEL9TnoefctByAwi','Sunny','Udhani',NULL,NULL,NULL,NULL,'1212-12-12 00:00:00','male',NULL,NULL),('3c6a868f-fa98-4c52-8f6e-33a3492a0739','sunny.iv09@gmail.com','$2a$10$7hRJuzFJddce/FGSHwkrO.Cd9HuogU9iebzMC40sVklDg9q9byYEK','Sunnykumar','Udhani',NULL,NULL,NULL,NULL,'1992-12-04 00:00:00','male',NULL,NULL),('4ae8d0fd-251a-42d4-9cfa-45be64bc0ed7','aaj1@yahoo.com','$2a$10$h/5XXLgQpl1zuntK26nfhOdkGmMpteKCibtGcDY90L6G4z53djp6a','sunny','udhani','sjsu','undefined',NULL,'undefined','2012-12-12 00:00:00','undefined',NULL,NULL),('4f63a4e0-91c4-4d9f-9b5c-1deabc73eb6f','sunny_9@outlook.com','$2a$10$/pATmkVnaBIJ9/1T9dNLouzpQ0UmUWaT1ZisgLk/f3uYNnX9M6.TC','Sunny','Udhani',NULL,NULL,NULL,NULL,'1997-12-12 00:00:00','undefined',NULL,NULL),('54ba7575-6ae7-4756-9f8b-9a9665e2698f','aaj.sunny@yahoo.com','$2a$10$k2EkjGl36VLcO3xsa.CMLO03oElG26ycliua0vI63DsA2RfDUnhUq','Sunny','Udhani',NULL,NULL,NULL,NULL,'1212-12-12 00:00:00','female',NULL,NULL),('55639005-a7a1-4700-8989-8c40640dc59f','sunny_iv009@outlook.com','$2a$10$kNvup9l5Rdi69K/cHFCCFONWUiu9zM1Iw3LpVfvx.sz/VKXqYL82G','Sunny','Udhani',NULL,NULL,NULL,NULL,'1212-12-12 00:00:00','undefined',NULL,NULL),('56ecd89d-04c6-4500-b23b-ffd6652432d9','aajsunny@yahoo.com','$2a$10$eaSaNOhgBc2ThTcTPy78HO1vCTAUBjAL7MG1IVgeE1RwuiD0X6ME.','Sunny','Udhani',NULL,NULL,NULL,NULL,'1212-12-12 00:00:00','male',NULL,NULL),('598db01a-cb7e-4fee-8861-e7b3f978f63e','sunny.udhani@sjsu.edu','$2a$10$/CDoBs3PO22QCQWxaTthXutXVa3dRGBIgFBMgRch4hwevFKGyvss2','Sunny','Udhani','LTI','SJSU',NULL,'singing','1998-12-12 00:00:00','male',NULL,NULL),('59dd64ce-21df-4e31-9aad-ecb4fd727293','sunn9@outlook.com','$2a$10$jOkLb/VwJQ32hb49FvXb9O0IxXmir1E0qs9qWz4e91rMDGHn3hBRG','Sunny','Udhani',NULL,NULL,NULL,NULL,'1997-12-12 00:00:00','undefined',NULL,NULL),('63cb3df0-ab4d-4dfc-9ced-47aba51d31a7','sunny2@yahoo.com','$2a$10$y.BNVOQW4It4grJwfFOyd.VeyG5OfWMuJNYC4X9pRilGGD3NGzXk.','s','Udhani',NULL,NULL,NULL,NULL,'2121-12-12 00:00:00','male',NULL,NULL),('7145646f-b405-4be3-b735-9ccdcaab89c8','sunny_iv09@outlook.com','$2a$10$.eDcOYt4zi8gMLmh4CkA7uAhzPewEo4cW/C1mIhgFKLIwBy4c9mc.','Sunny','Udhani',NULL,NULL,NULL,NULL,'1212-12-12 00:00:00','undefined',NULL,NULL),('73ff9e98-a39b-4be7-b94c-622e81479eae','aaj.sunny@yahoo.c','$2a$10$eQU7qYeyKqk8THw0lE4OpO0v3qDYy02Ikmi7FgTn1MqEzh.4uR0wm','Sunny','Udhani',NULL,NULL,NULL,NULL,'1993-04-17 00:00:00','male',NULL,NULL),('7c7b4ff9-282e-407a-88ce-2267afdf63d8','sunny18@yahoo.com','$2a$10$HxmShucwe67Dt2VGaCOxoeoVQ4z9AZmGnuIVwfOmNxFxZoGfnWVCO','undefined','undefined',NULL,NULL,NULL,NULL,'1212-12-12 00:00:00','male',NULL,NULL),('88f2262f-93bf-4308-a6cd-019df7c645a6','sunny8@yahoo.com','$2a$10$6OUMe3YYTBpkfOgpSj/c1OX8xn3qdd2T7bACnrBSonizZC8EO/wNO','Sunny','Udhani',NULL,NULL,NULL,NULL,'1212-12-12 00:00:00','male',NULL,NULL),('9a28c1db-44a2-4b8a-a11d-d1e34eed25d4','sunne123reiv@outlook.com','$2a$10$mqEknnG5sOaq5YgVjUmyTe.71SVu66zfWRtNmNFyUf19QEZLCLeVW','Sunny','Udhani',NULL,NULL,NULL,NULL,'1334-12-12 00:00:00','undefined',NULL,NULL),('9fbd26c9-5c5a-46d6-b1e6-3351276747e4','sunny_iv9@outlook.com','$2a$10$462nOCnwRDgLSm65OyEaWufUso9V/A/CsoKHPbQkRx0CJGVCG0pnC','Sunny','Udhani',NULL,NULL,NULL,NULL,'1212-12-12 00:00:00','undefined',NULL,NULL),('a62ae70b-dbfe-4894-81fc-6ec8abad2454','sunny_iv@outlook.com','$2a$10$0YG1uTV42fhWYKwLi9WMienVBE.WYBVHLy5Z.GcY8ILVTeip5oqBm','undefined','Udhani',NULL,NULL,NULL,NULL,'1212-12-12 00:00:00','undefined',NULL,NULL),('b0a54c47-2334-4c0c-aa03-eb979b19393c','sunny_iv009@outlook.c','$2a$10$z6mRj4z6e1RRgZdN7i4i1.hPlZ8WDhAxARgUcs6.xwaX5reUBgbeW','Sunny','Udhani',NULL,NULL,NULL,NULL,'1212-12-12 00:00:00','undefined',NULL,NULL),('b609f97e-5cc3-4644-bab6-bef73b8f395f','aaj.sunny@y.c','$2a$10$bLD2mf2UyYnTuEx9e5wzrOJcFu9MpvJ3rYVnw4G0uqz3C0V3/m8oa','Sunny','Udhani',NULL,NULL,NULL,NULL,'1212-12-12 00:00:00','male',NULL,NULL),('b8b27a12-1f8c-41f3-85c2-dc30826c1f6e','123@123.123','$2a$10$4ZKUvTSq1M.q0nrorXNoM.JG6ILE6XTZvc6CjDteK4Yok0Vt6JC16','Sunny','Udhani',NULL,NULL,NULL,NULL,'1212-12-12 00:00:00','undefined',NULL,NULL),('ba22eeb4-af81-4ae9-854d-f699f41d1b83','aaj.sunny@y.co','$2a$10$uo3FwkrwZ3RRPnNVBpzNweTa5nnx5q9vJ2XCpFw1nAg8ULi2Air6G','Sunny','Udhani',NULL,NULL,NULL,NULL,'1212-12-12 00:00:00','male',NULL,NULL),('cf980b0e-ff62-4120-9ce8-cb0ff083235e','sunny11@yahoo.com','$2a$10$bcrB5w3jjNBvcajlQBMrU.vViFBs76sE4FGHsfsLvckgc4pi2NIy6','undefined','undefined',NULL,NULL,NULL,NULL,'1212-12-12 00:00:00','male',NULL,NULL),('d02f4d66-d16b-485c-853a-a0e5fcf92faf','sunny123@yahoo.com','$2a$10$aW.ZNxdC.EuJW5PosxoAm.gZEcob/CSoXH6vxla3Xjde1lPdPY6PS','sunny','udhani',NULL,NULL,NULL,NULL,'1998-12-12 00:00:00','male',NULL,NULL),('d1e9fa82-e8f3-45b9-a64c-a89eec619898','aaj@yahoo.com','$2a$10$Szp2XW9dT0g/Mib1bkNRu.ASJXnEnwgm7tythSrU8HY4aQgadqNG2','sunny','udhani','undefined','sjsu',NULL,'undefined','2012-12-12 00:00:00','undefined',NULL,NULL),('d2e2e41f-779f-45c0-8ed4-225377427644','aaj.sunny@yahoo.co','$2a$10$7WiB4kvCKnj2OCq8tXi4weRWqeaWJqO1WB/eUsSfhiWkxBw96/ZHC','Sunny','Udhani',NULL,NULL,NULL,NULL,'1212-12-12 00:00:00','male',NULL,NULL),('d60ee77f-0ffa-45b4-9085-55215576aa2d','aaj.sunny@yahoo.in','$2a$10$f0CBAyh28reREeELU7w5eeNaoIVcRxJ1ZxH58/8NMNNHJ.NiWvy9O','Sunny','Udhani',NULL,NULL,NULL,NULL,'1212-12-12 00:00:00','male',NULL,NULL),('eca82355-8c18-4fe0-893a-8a220dca13b7','sunnyv@outlook.com','$2a$10$p9OTxStjjS/6JS8FGBEVP.Vz6z5J0QdXe2VJhElEpYBZ0vtFHpL/6','Sunny','Udhani',NULL,NULL,NULL,NULL,'1993-04-17 00:00:00','undefined',NULL,NULL),('ecad9f39-849d-4a3e-983e-800427b5a6e6','sunny_iv09@yahoo.com','$2a$10$0M7E1HjiQK7Ibf73dgF1ZOcg.g/0mkIsryVMleoW5by2uxpxzPQP2','Sunnykumar','Udhani',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('f00d657e-16af-46ee-b6e5-abb000f3572f','sunny@yahoo.com','$2a$10$X.FUNkkvTs9B6.lHN92t8e5T6dz9610VAqJSTiuuuwydut4K6ZoP.','Sunny','Udhani',NULL,NULL,NULL,NULL,'1212-12-12 00:00:00','male',NULL,NULL),('f04b141f-5062-4965-a07f-dee41744e7c1','sunny19@yahoo.com','$2a$10$dNf6eodCMe6tgU2QQIF8vuF2ds7SHr4cTQfyt6acIgUzTmJxF0lB.','undefined','undefined',NULL,NULL,NULL,NULL,'2112-12-12 00:00:00','male',NULL,NULL),('fefb7688-a5c0-4d43-a1fa-1788f8c21f12','aj.sunny@yahoo.com','$2a$10$Trj2KRiSXvAbIbVISPzfQ.uU0xK7sT2nEBIXajQ9w8daB9o2cWYj2','Sunny','Udhani',NULL,NULL,NULL,NULL,'1212-12-12 00:00:00','male',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-15 21:27:29
