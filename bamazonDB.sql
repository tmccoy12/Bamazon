DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
  itemid INT NOT NULL AUTO_INCREMENT,
  productname VARCHAR(100) NOT NULL,
  departmentname VARCHAR(45) NOT NULL,
  price decimal(10,4) NOT NULL,
 stockquantity INT (10) NOT NULL,
  PRIMARY KEY (itemid)
);

Insert INTO products(ProductName, DepartmentName,Price,StockQuantity)
Values ("Anchor Man","Movies", 15.99, 22),
	("Taken", "Movies", 19.99, 15),
    ("Dumbo","Movies", 14.99, 10),
    ("TV", "Electronics", 450.00, 75),
    ("blueray player", "Electronics", 75.00, 20),
    ("recliner","furniture", 275.99, 25),
    ("couch","furniture", 325.00, 33),
    ("bed", "furniture",725.00, 15),
    ("dining table","furniture", 259.99, 22),
    ("shelf","furniture", 82.99, 45);
    

Select * from products;