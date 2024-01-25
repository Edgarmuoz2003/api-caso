import { createPool } from "mysql2/promise";  //este /promise se pone para que deje trabajar con promesas
import {  //aqui importamos las variables de entorno creadas en el archivo config
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_PORT,
    DB_DATABASE
} from './config.js'


//esta es la conexion a la base de datos
export const pool = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE

})