-- Comandos en mysql para crear la Base de Datos
CREATE DATABASE web;
USE web;

-- Tabla USERS
CREATE TABLE users (
        id INT NOT NULL AUTO_INCREMENT,
        user VARCHAR(20) NOT NULL,
        name VARCHAR(100),
        email VARCHAR(50) NOT NULL,
        password VARCHAR(30) NOT NULL,
        phone INT,
        adress TEXT,
        user_avatar TEXT,
        fecha_registro DATETIME NOT NULL DEFAULT current_timestamp,
        PRIMARY KEY(id)
);

-- Table EVENTOS
CREATE TABLE events (
        id INT NOT NULL AUTO_INCREMENT,
        event_name VARCHAR(150) NOT NULL,
        adress VARCHAR(250) NOT NULL,
        description TEXT,
        phone INT,
        event_date DATETIME NOT NULL,
        event_time TEXT NOT NULL,
        user_id INT NOT NULL,
        PRIMARY KEY(id)
);

-- Tabla RESERVAS
CREATE TABLE bookings (
        id INT NOT NULL AUTO_INCREMENT,
        user_name VARCHAR(100),
        bk_date DATETIME NOT NULL,
        bk_time TEXT NOT NULL,
        phone INT,
        user_id INT NOT NULL,
        PRIMARY KEY(id)
);
