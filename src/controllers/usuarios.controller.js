import { pool } from '../db.js'
import bcrypt, { hash } from 'bcrypt';

export const getUsuario = async(req, res) => {
    const result = await pool.query('SELECT 1+1 AS result')
    res.json(result)

}

export const storeUser = async(req, res) => {
    const { id, nombre, password } = req.body

    try {
        const [rows] = await pool.query(  'SELECT * FROM usuarios WHERE id = ?', [id]) 

      if(rows.length > 0) {
        res.json('El Usuario ya Existe')
      } else {
         bcrypt.hash(password, 12).then( async hash => {
           const password =  hash;
           
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