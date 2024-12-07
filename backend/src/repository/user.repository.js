import pool from "../config/dbMysql.config.js";
import UserMapper from "./user.mapper.js";

class UserRepository {
    static async getUser(userId) {
        
    }

    static async createUser(user) {
        const {
            username, 
            email, 
            password,
            active,
            verify_email
        } = user

        const query = `
        INSERT INTO Users (username, email, password, active, verify_email) 
        VALUES (?, ?, ?, ?, ?)
        `

        const [result] = await pool.execute(query, [username, email, password, active, verify_email])
        if(result.affectedRows > 0){
            return result.insertId
        }
        else{
            console.log('holi')
            //Pueden manejar el error
            //throw 
        }
    }
}

export default UserRepository
