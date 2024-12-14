import pool from "../config/dbMysql.config.js";
import ChatMapper from "./chat.mapper.js";

class ChatRepository {
    static async getChat(user_id, user_id_contact, page, per_page) {
        const query = `SELECT * FROM Chats WHERE ((issurer_id = ? AND receiver_id = ?) OR (issurer_id = ? AND receiver_id = ?)) AND active = 1 ORDER BY created_at DESC LIMIT ? OFFSET ?`

        const [rows] = await pool.execute(query, [user_id, user_id_contact, user_id_contact, user_id, per_page, page * per_page])

        return rows.map(row => ChatMapper.mapMessageFromSqlResult(row, user_id))
    }

    static async getChats(user_id, page, per_page) {
        const query = `SELECT *
        FROM (
            SELECT i.username as i_username, r.username as r_username, i.id as i_id, r.id as r_id,
                FIRST_VALUE(c.content) OVER (PARTITION BY c.issurer_id, c.receiver_id  ORDER BY c.created_at DESC) AS content,
                FIRST_VALUE(c.created_at) OVER (PARTITION BY c.issurer_id, c.receiver_id  ORDER BY c.created_at DESC) AS created_at
            FROM Chats as c INNER JOIN Users as i ON c.issurer_id = i.id INNER JOIN Users as r ON c.receiver_id = r.id 
            WHERE (c.issurer_id = ? OR c.receiver_id = ?) AND c.active = 1 
        ) as t
        GROUP BY t.i_id, t.r_id 
        LIMIT ? OFFSET ?`

        const [rows] = await pool.execute(query, [user_id, user_id, per_page, page * per_page])

        return rows.map(row => ChatMapper.mapChatFromSqlResult(row, user_id))
    }

    static async createMessage(message) {
        const {
            issurer_id, 
            receiver_id, 
            content
        } = message

        const query = `INSERT INTO Chats (issurer_id, receiver_id, content, active) VALUES (?, ?, ?, ?)`

        const [result] = await pool.execute(query, [issurer_id, receiver_id, content, true])
        if(result.affectedRows > 0){
            return result.insertId
        }
        else{
            console.log('holi') //TODO check
        }
    }
}

export default ChatRepository
