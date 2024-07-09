CREATE DATABASE Sales

use Sales

CREATE TABLE Users(
	Id INT PRIMARY KEY IDENTITY(1,1),
	UserName varchar(50) NOT NULL,
	Email varchar(50) NOT NULL,
	Password varchar(255) NOT NULL,
	Role varchar(50) NOT NULL)

CREATE TABLE Tasks (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Title VARCHAR(50) NOT NULL,
    Status VARCHAR(50) NOT NULL,
    Description VARCHAR(100) NOT NULL,
    CreatedAt DateTime NOT NULL,
    UpdatedAt DateTime NOT NULL,
    UserId INT NOT NULL,
    CONSTRAINT FK_User_Tasks FOREIGN KEY (UserId) REFERENCES Users(Id)
);
