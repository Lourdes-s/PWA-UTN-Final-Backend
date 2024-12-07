import pool from "../config/dbMysql.config.js";
import UserMapper from "./user.mapper.js";

class UserRepository {
    static async getUser(userId) {
        const query = `SELECT * FROM Users WHERE id = ? AND active = 1 AND verify_email = 1`

        const [rows] = await pool.execute(query, [userId])
        if(rows.length > 0){
            return UserMapper.mapUserFromSqlResult(rows[0])
        }
        else{
            return undefined
        }
    }

    static async getUserByEmail(email) {
        const query = `SELECT * FROM Users WHERE email = ?`

        const [rows] = await pool.execute(query, [email])
        if(rows.length > 0){
            return UserMapper.mapUserFromSqlResult(rows[0])
        }
        else{
            return undefined
        }
    }

    static async createUser(user) {
        const {
            username, 
            email, 
            password,
            active,
            verify_email
        } = user

        const query = `INSERT INTO Users (username, email, password, active, verify_email) VALUES (?, ?, ?, ?, ?)`

        const [result] = await pool.execute(query, [username, email, password, active, verify_email])
        if(result.affectedRows > 0){
            return result.insertId
        }
        else{
            console.log('holi') //TODO check
        }
    }

    static async updateUser(user) {
        const {
            id,
            username, 
            email, 
            password,
            active,
            verify_email
        } = user

        const query = `UPDATE Users SET username = ?, email = ?, password = ?, active = ?, verify_email = ? WHERE id = ?`

        const [result] = await pool.execute(query, [username, email, password, active, verify_email, id])

        if(result.affectedRows > 0){
            return result.insertId
        }
        else{
            console.log('holi') //TODO check
        }
    }
}

export default UserRepository
