DROP DATABASE IF EXISTS musemur;
CREATE DATABASE musemur;
USE musemur;

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
    id_user INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_first_name VARCHAR(30) NOT NULL,
    user_surname VARCHAR(40) NOT NULL,
    username VARCHAR(255) NOT NULL,
    user_phone INT(9),
    user_email VARCHAR(50),
    user_dni VARCHAR(9) NOT NULL UNIQUE,
    user_pswrd VARCHAR(20) NOT NULL CHECK(
        LENGTH(user_pswrd)>=8 AND
        user_pswrd REGEXP '[0-9]' AND
        user_pswrd REGEXP '[A-Z]' AND
        user_pswrd REGEXP '[a-z]'
    ),
    user_rol TINYINT(1)
);

DROP TABLE IF EXISTS museos;

CREATE TABLE museos (
    id_museo INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    museum_name VARCHAR(30),
    museum_city VARCHAR(30),
    museum_loc VARCHAR(100),
    museum_desc VARCHAR(200),
    museum_hour VARCHAR(20)
);

DROP TABLE IF EXISTS exposiciones;

CREATE TABLE exposiciones (
    id_expo INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_museo INT UNSIGNED,
    expo_title VARCHAR(100),
    expo_desc VARCHAR(255),
    FOREIGN KEY (id_museo) REFERENCES museos(id_museo) ON DELETE CASCADE
);

DROP TABLE IF EXISTS reservas;

CREATE TABLE reservas (
    id_reserva INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_user INT UNSIGNED,
    id_museo INT UNSIGNED,
    reserva_date DATE,
    reserva_hour TIME,
    reserva_people INT(20),
    FOREIGN KEY (id_user) REFERENCES usuarios(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_museo) REFERENCES museos(id_museo) ON DELETE CASCADE
);

DROP TABLE IF EXISTS chatbox;

CREATE TABLE chatbox (
    id_que INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_museo INT UNSIGNED,
    cb_que VARCHAR(50),
    cb_res VARCHAR(50),
    FOREIGN KEY (id_museo) REFERENCES museos(id_museo)
);

-- Datos Demo
COMMIT; 
INSERT INTO usuarios VALUES (0, 'DemoAdmin', 'Musemur', 'DemoAdminMusemur', 654879856, 'demo@gmail.com', '12345678d', 'Demo2024', 1);
INSERT INTO usuarios VALUES (0, 'DemoUser', 'Musemur', 'DemoUserMusemur', 654879856, 'demo@gmail.com', '87654321p', 'Demo2024', 0);

INSERT INTO museos VALUES (0, 'Museo Salzillo', 'Murcia', 'Calle Salzillo', '', '10:00-22:00');
INSERT INTO museos VALUES (0, 'Teatro Romano', 'Cartagena', 'Calle Romano', '', '10:00-22:00');

INSERT INTO reservas VALUES (0, 1, 2, '2024-06-11', '09:00:00', 5);
INSERT INTO reservas VALUES (0, 2, 1, '2024-06-12', '10:40:00', 6);

INSERT INTO chatbox VALUES (0, 1, '¿Qué horarios tiene?', 'De 8:00 a.m. a 9:00 p.m');
INSERT INTO chatbox VALUES (0, 2, '¿Qué horarios tiene?', 'De 10:00 a.m. a 10:00 p.m');

INSERT INTO admin VALUES (1, 1);