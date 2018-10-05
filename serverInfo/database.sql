/*
SQLyog Ultimate v11.11 (32 bit)
MySQL - 5.5.5-10.1.21-MariaDB : Database - digital-mining-corp-au
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`digital-mining-corp-au` /*!40100 DEFAULT CHARACTER SET latin1 */;

/*Table structure for table `bank_verify` */

DROP TABLE IF EXISTS `bank_verify`;

CREATE TABLE `bank_verify` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bank_id` int(11) NOT NULL,
  `amount_one` decimal(25,2) NOT NULL,
  `amount_two` decimal(25,2) NOT NULL,
  `account_verified` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `bank_verify` */

/*Table structure for table `buyer_information` */

DROP TABLE IF EXISTS `buyer_information`;

CREATE TABLE `buyer_information` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `controller_id` int(11) NOT NULL,
  `timestamp` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `buyer_information` */

insert  into `buyer_information`(`id`,`user_id`,`property_id`,`controller_id`,`timestamp`) values (1,1,3,1,1534461744),(2,3,2,2,1534461744);

/*Table structure for table `controller_user` */

DROP TABLE IF EXISTS `controller_user`;

CREATE TABLE `controller_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `controller_access` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `controller_user` */

insert  into `controller_user`(`id`,`user_id`,`controller_access`) values (1,1,1),(2,3,1),(3,4,1);

/*Table structure for table `customer_investment` */

DROP TABLE IF EXISTS `customer_investment`;

CREATE TABLE `customer_investment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `original_investment` decimal(25,2) NOT NULL,
  `live_value` decimal(29,6) NOT NULL,
  `daily_yeild` decimal(29,6) NOT NULL,
  `updated_timestamp` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `customer_investment` */

insert  into `customer_investment`(`id`,`customer_id`,`original_investment`,`live_value`,`daily_yeild`,`updated_timestamp`) values (1,1,400000.00,400154.256589,109.631303,'1533882000'),(2,3,600000.00,604147.356854,165.519823,'1533882000'),(3,4,600000.00,604147.356854,165.519823,'1533882000');

/*Table structure for table `disbursement_information` */

DROP TABLE IF EXISTS `disbursement_information`;

CREATE TABLE `disbursement_information` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `controller_id` int(11) NOT NULL,
  `timestamp` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `disbursement_information` */

insert  into `disbursement_information`(`id`,`user_id`,`property_id`,`controller_id`,`timestamp`) values (1,1,3,2,1534461744),(2,3,2,1,1534461744);

/*Table structure for table `dmc_escrow` */

DROP TABLE IF EXISTS `dmc_escrow`;

CREATE TABLE `dmc_escrow` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `controller_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `buyer_id` int(11) NOT NULL,
  `distribution_id` int(11) NOT NULL,
  `distribution_description` text NOT NULL,
  `distribution_date` int(11) NOT NULL,
  `distribution_value` decimal(25,2) NOT NULL,
  `user_verified` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `transaction_completed` int(11) NOT NULL,
  `completed_date_timestamp` int(11) NOT NULL,
  `document_location` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `dmc_escrow` */

insert  into `dmc_escrow`(`id`,`controller_id`,`seller_id`,`buyer_id`,`distribution_id`,`distribution_description`,`distribution_date`,`distribution_value`,`user_verified`,`property_id`,`transaction_completed`,`completed_date_timestamp`,`document_location`) values (1,1,1,3,1,'Payment',1536461744,1200000.00,1,2,1,0,'transactions/coded_transaction.pdf'),(2,2,3,4,3,'Payment',1536461744,1200000.00,1,2,0,0,'transactions/coded_transaction.pdf'),(3,3,4,1,4,'Payment',1536461744,1200000.00,1,2,0,0,'transactions/coded_transaction.pdf'),(4,1,1,3,1,'Payment',1534461744,1200000.00,1,2,1,0,'transactions/coded_transaction.pdf'),(5,2,3,4,3,'Payment',1534461744,1200000.00,1,2,1,0,'transactions/coded_transaction.pdf'),(6,3,4,1,4,'Payment',1534461744,1200000.00,1,2,1,0,'transactions/coded_transaction.pdf');

/*Table structure for table `escrow_property_information` */

DROP TABLE IF EXISTS `escrow_property_information`;

CREATE TABLE `escrow_property_information` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `property_address1` text NOT NULL,
  `property_address2` text NOT NULL,
  `property_city` text NOT NULL,
  `property_state` text NOT NULL,
  `property_postcode` text NOT NULL,
  `property_country` text NOT NULL,
  `added_timestamp` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `escrow_property_information` */

insert  into `escrow_property_information`(`id`,`property_address1`,`property_address2`,`property_city`,`property_state`,`property_postcode`,`property_country`,`added_timestamp`) values (1,'4 Ellis street','','Mountain Creek','QUEENSLAND','4557','Australia',1534461744),(2,'27 Godfrey Street','','Mountain Creek','QUEENSLAND','4557','Australia',1534461744),(3,'4 Ellis street','','Mountain Creek','QUEENSLAND','4557','Australia',1534461744),(4,'27 Godfrey Street','','Mountain Creek','QUEENSLAND','4557','Australia',1534461744),(5,'4 Ellis street','','Mountain Creek','QUEENSLAND','4557','Australia',1534461744),(6,'27 Godfrey Street','','Mountain Creek','QUEENSLAND','4557','Australia',1534461744);

/*Table structure for table `escrow_transaction` */

DROP TABLE IF EXISTS `escrow_transaction`;

CREATE TABLE `escrow_transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `controller_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `transaction_started_timestamp` int(11) NOT NULL,
  `transaction_cancelled_timestamp` int(11) NOT NULL,
  `transaction_completed_timestamp` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `escrow_transaction` */

/*Table structure for table `financial_info` */

DROP TABLE IF EXISTS `financial_info`;

CREATE TABLE `financial_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `bank_name` text NOT NULL,
  `account_name` text NOT NULL,
  `bsb_number` text NOT NULL,
  `account_number` text NOT NULL,
  `account_verified` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `financial_info` */

/*Table structure for table `pending_transactions` */

DROP TABLE IF EXISTS `pending_transactions`;

CREATE TABLE `pending_transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `transaction_timestamp` int(11) NOT NULL,
  `transaction_type` text NOT NULL,
  `pending_value` decimal(25,2) NOT NULL,
  `transaction_document` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `pending_transactions` */

insert  into `pending_transactions`(`id`,`customer_id`,`property_id`,`transaction_timestamp`,`transaction_type`,`pending_value`,`transaction_document`) values (1,1,1,1534291000,'Buy Shares',50000.00,'transactions/coded_transaction.pdf'),(2,1,2,1534291000,'Buy Shares',40000.00,'transactions/coded_transaction.pdf'),(3,3,3,1534291000,'Buy Shares',50000.00,'transactions/coded_transaction.pdf'),(4,3,4,1534291000,'Buy Shares',40000.00,'transactions/coded_transaction.pdf'),(5,4,5,1534291000,'Buy Shares',50000.00,'transactions/coded_transaction.pdf'),(6,4,6,1534291000,'Buy Shares',40000.00,'transactions/coded_transaction.pdf'),(7,1,2,1534294000,'Sell Shares',-10000.00,'transactions/coded_transaction.pdf'),(8,3,4,1534294000,'Sell Shares',-10000.00,'transactions/coded_transaction.pdf'),(9,4,6,1534294000,'Sell Shares',-10000.00,'transactions/coded_transaction.pdf');

/*Table structure for table `property_information` */

DROP TABLE IF EXISTS `property_information`;

CREATE TABLE `property_information` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `property_address1` text NOT NULL,
  `property_address2` text NOT NULL,
  `property_city` text NOT NULL,
  `property_state` text NOT NULL,
  `property_postcode` text NOT NULL,
  `property_country` text NOT NULL,
  `jointly_owned` int(11) NOT NULL,
  `current_mv` decimal(25,2) NOT NULL,
  `current_equity` decimal(25,2) NOT NULL,
  `debt_balance` decimal(25,2) NOT NULL,
  `eq_share_swap` decimal(6,2) NOT NULL,
  `pending_share_buy` decimal(25,2) NOT NULL,
  `pending_share_sell` decimal(25,2) NOT NULL,
  `property_mortgaged` int(11) NOT NULL,
  `image_location` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `property_information` */

insert  into `property_information`(`id`,`customer_id`,`property_address1`,`property_address2`,`property_city`,`property_state`,`property_postcode`,`property_country`,`jointly_owned`,`current_mv`,`current_equity`,`debt_balance`,`eq_share_swap`,`pending_share_buy`,`pending_share_sell`,`property_mortgaged`,`image_location`) values (1,1,'4 Ellis street','','Mountain Creek','QUEENSLAND','4557','Australia',1,605000.00,605000.00,0.00,0.00,0.00,0.00,0,'property_images/house1.jpg'),(2,1,'27 Godfrey Street','','Mountain Creek','QUEENSLAND','4557','Australia',0,360000.00,200000.00,160000.00,0.00,0.00,0.00,1,'property_images/house2.jpg'),(3,3,'4 Ellis street','','Mountain Creek','QUEENSLAND','4557','Australia',1,605000.00,605000.00,0.00,0.00,0.00,0.00,0,'property_images/house1.jpg'),(4,3,'27 Godfrey Street','','Mountain Creek','QUEENSLAND','4557','Australia',0,360000.00,200000.00,160000.00,0.00,0.00,0.00,1,'property_images/house2.jpg'),(5,4,'4 Ellis street','','Mountain Creek','QUEENSLAND','4557','Australia',1,605000.00,605000.00,0.00,0.00,0.00,0.00,0,'property_images/house1.jpg'),(6,4,'27 Godfrey Street','','Mountain Creek','QUEENSLAND','4557','Australia',0,360000.00,200000.00,160000.00,0.00,0.00,0.00,1,'property_images/house2.jpg');

/*Table structure for table `property_sale_price` */

DROP TABLE IF EXISTS `property_sale_price`;

CREATE TABLE `property_sale_price` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `property_id` int(11) NOT NULL,
  `property_value` decimal(25,2) NOT NULL,
  `timestamp` int(11) NOT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `property_sale_price` */

/*Table structure for table `real_estate` */

DROP TABLE IF EXISTS `real_estate`;

CREATE TABLE `real_estate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `re_name` text NOT NULL,
  `re_address` text NOT NULL,
  `re_phone` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `real_estate` */

insert  into `real_estate`(`id`,`re_name`,`re_address`,`re_phone`) values (1,'ABC Real Estate','123 Main Street Mytown','(+61) 2123 1234'),(2,'My Estate Agent','123 High Street Your Town','(+61) 2321 4321');

/*Table structure for table `seller_information` */

DROP TABLE IF EXISTS `seller_information`;

CREATE TABLE `seller_information` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `controller_id` int(11) NOT NULL,
  `timestamp` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `seller_information` */

insert  into `seller_information`(`id`,`user_id`,`property_id`,`controller_id`,`timestamp`) values (1,1,2,1,1534461744),(2,3,3,2,1534461744);

/*Table structure for table `transaction_details` */

DROP TABLE IF EXISTS `transaction_details`;

CREATE TABLE `transaction_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `timestamp` int(11) NOT NULL,
  `transaction_description` text NOT NULL,
  `transaction_value` decimal(25,2) NOT NULL,
  `account_balance` decimal(25,2) NOT NULL,
  `pdf_location` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

/*Data for the table `transaction_details` */

insert  into `transaction_details`(`id`,`customer_id`,`timestamp`,`transaction_description`,`transaction_value`,`account_balance`,`pdf_location`) values (1,1,1529064000,'Share Swap',100000.00,100000.00,'transactions/coded_transaction.pdf'),(2,1,1529150400,'Interest',32.20,100032.20,'transactions/coded_transaction.pdf'),(3,1,1529150500,'Share Swap',200000.00,300032.20,'transactions/coded_transaction.pdf'),(4,1,1529236800,'Interest',83.52,300115.72,'transactions/coded_transaction.pdf'),(5,1,1529323200,'Interest',83.53,300199.25,'transactions/coded_transaction.pdf'),(6,1,1529409600,'Interest',83.53,300282.78,'transactions/coded_transaction.pdf'),(7,1,1529496000,'Interest',83.54,300366.32,'transactions/coded_transaction.pdf'),(8,3,1529064000,'Share Swap',100000.00,100000.00,'transactions/coded_transaction.pdf'),(9,3,1529150400,'Interest',32.20,100032.20,'transactions/coded_transaction.pdf'),(10,3,1529150500,'Share Swap',200000.00,300032.20,'transactions/coded_transaction.pdf'),(11,3,1529236800,'Interest',83.52,300115.72,'transactions/coded_transaction.pdf'),(12,3,1529323200,'Interest',83.53,300199.25,'transactions/coded_transaction.pdf'),(13,3,1529409600,'Interest',83.53,300282.78,'transactions/coded_transaction.pdf'),(14,3,1529496000,'Interest',83.54,300366.32,'transactions/coded_transaction.pdf'),(15,4,1529064000,'Share Swap',100000.00,100000.00,'transactions/coded_transaction.pdf'),(16,4,1529150400,'Interest',32.20,100032.20,'transactions/coded_transaction.pdf'),(17,4,1529150500,'Share Swap',200000.00,300032.20,'transactions/coded_transaction.pdf'),(18,4,1529236800,'Interest',83.52,300115.72,'transactions/coded_transaction.pdf'),(19,4,1529323200,'Interest',83.53,300199.25,'transactions/coded_transaction.pdf'),(20,4,1529409600,'Interest',83.53,300282.78,'transactions/coded_transaction.pdf'),(21,4,1529496000,'Interest',83.54,300366.32,'transactions/coded_transaction.pdf');

/*Table structure for table `userinfo` */

DROP TABLE IF EXISTS `userinfo`;

CREATE TABLE `userinfo` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_fname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_lname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_dob` date NOT NULL,
  `user_address` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_city` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_state` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_country` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_postcode` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_unique` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_pincode` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_forget` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_lastLogin` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_verified` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `userinfo` */

insert  into `userinfo`(`user_id`,`user_fname`,`user_lname`,`user_email`,`user_dob`,`user_address`,`user_city`,`user_state`,`user_country`,`user_postcode`,`user_unique`,`user_password`,`user_pincode`,`user_forget`,`user_lastLogin`,`user_verified`) values (1,'VeeR','Hunter','veerhunter127@gmail.com','2018-08-08','9 AIRLINE ROAD CARGO AGENTS BUILDING D SINGAPORE 819827','Sydney','Sidney','Australia','123456','313213','bdc87b9c894da5168059e00ebffb9077','1234','374492','11:24 am On Wednesday 22 August 2018 (GMT+0100)',1),(3,'Robert','Ablinger','robert@traxprint.com','1968-09-25','1 main st','Altona','Vic','Australia','3028','123123123','81dc9bdb52d04dc20036dbd8313ed055','1234',NULL,'2:05 pm On Wednesday 22 August 2018 (GMT+1000)',1),(4,'Thomas','Mcalister','thomas@digitalminingcorpaustralia.com','1977-08-16','9 curtis street','Mountain creek','Queeenslamd','Australia','4557','123123123','eabaf8c8e38d186f5d9055492851bcbf','1234',NULL,'4:38 pm On Wednesday 22 August 2018 (GMT+1000)',0),(5,'Robert','Ablinger','info@traxprint.com','2018-09-25','1 main st','Altona','Vic','Australia','3028','123123123','5d41402abc4b2a76b9719d911017c592','1122',NULL,'',0);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
