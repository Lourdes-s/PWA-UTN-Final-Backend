import Chat from "../model/chat.model.js"

class ChatMapper {
    static mapMessageFromSqlResult(result, user_id) {
        return new Chat(
            null,
            result.content, 
            result.created_at, 
            result.issurer_id === user_id
        )
    }

    static mapChatFromSqlResult(result, user_id) {
        const isIssurer = result.issurer_id === user_id
        return new Chat(
            isIssurer ? result.r.username : result.i.username,
            result.content, 
            result.created_at, 
            isIssurer
        )
    }
}

export default ChatMapper