## Indicina Assessment: How to run the project 

Clone the project from https://github.com/SeunLawalKa/UrlShortener.

Using Git Bash or Shell, navigate to the project root directory.

Type { docker-compose up -d} to run the project.

Type { docker ps -a } to list the running containers details and note the container id of the mysql.

Type { docker exec 8a4c202bb747 mysql -uroot -p%#fcmb@sme -e 'show databases;' } to ensure the database "urlshortener" exists . Replace this id - 8a4c202bb747 with the mysql container id.

If the database does not exist, type  { docker exec 8a4c202bb747 mysql -uroot -p%#fcmb@sme -e 'create database urlshortener;'  } . 

Type { docker exec 8a4c202bb747 mysql -uroot -p%#fcmb@sme urlshortener -e 'CREATE TABLE IF NOT EXISTS `links` (`id` bigint(11) NOT NULL AUTO_INCREMENT,`longurl` text NOT NULL,`shorturl` varchar(50) NOT NULL,`count` int(11) DEFAULT NULL,`urlcode` varchar(20) NOT NULL,PRIMARY KEY (`id`));'  }

Type { docker exec 8a4c202bb747 mysql -uroot -p%#fcmb@sme urlshortener -e 'show tables;' } to ensure the table `links` is created.

Lastly, type http://localhost:5000/ to check the site and test all the api endpoints as stated in the assesment.

## Thank you.