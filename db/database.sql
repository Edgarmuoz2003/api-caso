-- se crea este archivo para respaldar la creacion de la base de datos y sus tablas

-- creacion de la base de datos
CREATE DATABASE casoRegistro;

-- se selecciona la base de datos creada
USE casoRegistro;

-- se crea la tabla
CREATE TABLE usuarios (
    id INT(12) NOT NULL PRIMARY KEY,
    nombre VARCHAR(45) NOT NULL,
    password VARCHAR(225) NOT NULL
);

-- con este comando vemos la estructura de la tabla
DESCRIBE usuarios;