import pool from "../config/dbMysql.config.js";

class ContactRepository {
    static async getContacts(user_id, page, per_page) {
        const query = `SELECT username, email
        FROM Contacts as c INNER JOIN Users as u ON c.user_id_contact = u.id 
        WHERE c.user_id = ? AND c.active = 1 AND u.active = 1 ORDER BY username LIMIT ? OFFSET ?`
        
        const [rows] = await pool.execute(query, [user_id, per_page, page * per_page])

        return rows
    }

    static async postContacts(contact) {
        const {
            user_id, 
            user_id_contact
        } = contact

        const query = `INSERT INTO Contacts (user_id, user_id_contact) VALUES (?, ?)`

        const [result] = await pool.execute(query, [user_id, user_id_contact])
        if(result.affectedRows > 0){
            return result.insertId
        }
        else{
            console.log('holi') //TODO check
        }
    }
}

export default ContactRepository
