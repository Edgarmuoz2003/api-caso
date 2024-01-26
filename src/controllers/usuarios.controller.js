import { pool } from '../db.js'  //se importa la conexion de la base de datos
import bcrypt, { hash } from 'bcrypt';  //este modulo es para hashear la contraseña antes de enviarla a la base de datos


//creamos la funcion para registrar los Usuarios
export const storeUser = async(req, res) => {
    const { id, nombre, password } = req.body //estas son los datos que se recibirian desde el formulario del front-end

    //primero verificamos que no haya un usuario con ese id
    try {
        const [rows] = await pool.query(  'SELECT * FROM usuarios WHERE id = ?', [id]) 

      if(rows.length > 0) {
        res.json('El Usuario ya Existe')

        //una vez hecha la verificacion hasheamos el password para enviarlo a la base de datos
      } else {
         bcrypt.hash(password, 12).then( async hash => {
           const password =  hash;

           //aqui realizamos la insercion a la base de datos
           try {
            const [rows] = await pool.query('INSERT INTO usuarios SET id=?, nombre=?, password=?', [id, nombre, password] )
            res.json('Usuario Registrado con Exito')
            
           } catch (error) {
            return res.status(500).json({
                message: "No fue posible Guardar el Usuario"
            })
           }  
        })
      }       
    } catch (error) {
        return res.status(500).json({
            message: "Error al intentar consultar en la base de datos"
        })       
    }
}

//esta es la funcion para loguer al usuario
export const authUser = async (req, res) => {
    const { id, password } = req.body;//recuperamos los datos enviados por el formulario

    try {
        const [userData] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);//hacemos la consulta y verificamos las credenciales

        if (userData.length > 0) {
            for (const element of userData) {
                const isMatch = await bcrypt.compare(password, element.password);
                if (!isMatch) {
                    return res.json('Contraseña Incorrecta');
                }
            }

            // Si llegamos aquí, todas las comparaciones fueron exitosas
            return res.json('Se ha autenticado con éxito');
        } else {
            return res.json('El usuario no Existe');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "No fue posible conectar con la base de datos"
        });
    }
};