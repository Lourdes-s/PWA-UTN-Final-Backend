import User from "../model/user.model.js"

class UserMapper {
    static mapUserFromSqlResult(result) {
        return new User(
            result.id,
            result.username,
            result.email,
            result.password,
            result.active,
            result.verify_email,
            result.created_at
        )
    }
}

export default UserMapper