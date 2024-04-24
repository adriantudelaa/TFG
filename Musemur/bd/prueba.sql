drop database if exists prueba;
create database prueba;
use prueba;

drop table if exists usuarios;

create table usuarios (
id_usuario INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
nom_usu varchar(20)not null,
ape_usu varchar(40),
tel_usu int(9),
email_usu varchar(20),
dni_usu varchar(9) not null unique,
contraseña_usu varchar(20) not null check(length(contraseña)>=8 and
										contraseña regexp '[0-9]' and
										contraseña regexp '[A-Z]' and
										contraseña regexp '[a-z]'),
rol ENUM('user','admin'));

drop table if exists museos;

create table museos (
id_museo INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
nom_mus varchar(30),
loc_mus varchar(30),
ubi_mus varchar(100),
hor_mus varchar(10),
imh_mus blob
);

drop table if exists reservas;

create table reservas(
id_reserva INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
museo_res varchar(15),
nom_res varchar(15),
fech_reserva date,
hora_res time,
num_personas int (20),
precio_res float
);

drop table if exists chatbox;

create table chatbox(
id_pregunta INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
id_museo int unsigned,
preg_cb varchar(50),
res_cb varchar(50),
FOREIGN KEY (id_museo) references museos(id_museo));

drop table if exists admin;

create table admin (
id_admin INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
id_museo INT UNSIGNED,
FOREIGN KEY (id_museo) references museos(id_museo));

-- Crear un disparador para validar el rol del administrador
DELIMITER $$
CREATE TRIGGER check_admin_role 
BEFORE INSERT ON admin
FOR EACH ROW
BEGIN
    DECLARE admin_role ENUM('user', 'admin');
    SELECT rol INTO admin_role FROM usuarios WHERE id_usuario = NEW.id_admin;
    IF admin_role != 'admin' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El administrador debe tener el rol de admin';
    END IF;
END$$
DELIMITER ;