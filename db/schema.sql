DROP DATABASE IF EXISTS wine_db;
CREATE DATABASE wine_db;

USE wine_db;

CREATE TABLE wines (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NULL,
  taste BOOLEAN DEFAULT false,
  PRIMARY KEY (id)
);