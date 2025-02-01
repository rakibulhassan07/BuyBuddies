# BuyBuddies E-Commerce Platform

## Index
- [Introduction](#introduction)
- [Team](#team)
- [Key Features](#key-features)
- [Schema Design](#schema-design)
- [Development Stack](#development-stack)
- [Database Schema (DDL)](#database-schema-ddl)
- [DML Used in Application](#dml-used-in-application)
- [Challenges Faced](#challenges-faced)
- [Screenshots](#screenshots)
- [Installation Guide](#installation-guide)
- [Project Demo](#project-demo)
- [Conclusion](#conclusion)

---

## Introduction
BuyBuddies is a student-driven e-commerce platform designed for seamless and secure online shopping. Built with accessibility and innovation in mind, it provides a smooth user experience with robust security features.

## Team
- **Rakibul Hassan** (https://github.com/rakibulhassan07)
- **Mahathir Mohammad** (`___`)
- **Abdullah Al Noman** (https://github.com/No-man1234)

## Key Features
- **Role-Based Access Control**: Admins, sellers, and customers get tailored dashboards.
- **Dynamic Product Management**: Sellers can add products with images, featuring 3D hover effects.
- **Secure Checkout & Payment**: Integrated with bKash/Nagad for real-time transactions.
- **Real-Time Analytics**: Daily sales and revenue tracking with interactive charts.
- **Seller Empowerment**: Users can request seller status.

## Schema Design
- **Database**: MySQL-based relational database.
- **Entity-Relationship Diagram (ERD)**: Structured for efficient data management.

## Development Stack
- **Frontend**: React.js with CSS animations
- **Backend**: PHP
- **Database**: MySQL
- **Authentication**: Firebase
- **Payment Gateway**: bKash/Nagad

## Database Schema (DDL)
```sql
CREATE DATABASE BuyBuddies;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  photo TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL
);

CREATE TABLE product (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_photo TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_price TEXT NOT NULL,
  product_details TEXT NOT NULL,
  product_quantity TEXT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```
(Full schema available in the repository.)

## DML Used in Application
```sql
-- Insert new user
INSERT INTO users (name, photo, email, password, role) VALUES (?, ?, ?, ?, ?);

-- Insert new product
INSERT INTO product (product_photo, product_name, product_price, product_details, product_quantity, user_id) 
VALUES (?, ?, ?, ?, ?, ?);
```
(Full list available in the repository.)

## Challenges Faced
- **Real-Time Inventory Updates**: Solved using transactional queries.
- **Payment Gateway Integration**: Used PHP cURL with error-handling retries.
- **Role-Based Access Control**: Implemented Firebase authentication.

## Screenshots
Click here: https://github.com/rakibulhassan07/BuyBuddies/tree/main/web-Pic
(See the repository for images showcasing various project features.)

## Installation Guide
```bash
git clone https://github.com/rakibulhassan07/BuyBuddies.git
cd BuyBuddies
```
- Setup MySQL database (`BuyBuddies.sql` file available in the repo).
- Place PHP files in the XAMPP root folder.
- Install frontend dependencies:
```bash
cd frontend  
npm install  
```
- Create a `.env` file with:
```bash
VITE_APIKEY=your-firebase-api-key  
VITE_AUTHDOMAIN=your-firebase-auth-domain  
VITE_IMGBB_API_KEY=your-imgbb-key  
```
- Run the project:
```bash
npm run dev
```

## Project Demo
(YouTube link: https://tinyurl.com/BuyBuddies)

## Conclusion
BuyBuddies is built with React, PHP, and MySQL, combining tech excellence with user-first design. More than just an e-commerce platform, it's a step toward a smarter, more secure shopping experience.

---

For any contributions or issues, feel free to create a pull request or open an issue!
