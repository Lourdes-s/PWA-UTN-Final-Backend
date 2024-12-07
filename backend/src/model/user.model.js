class User {
    constructor(id, username, email, password, active, verify_email, created_at) {
        this.id = id
        this.username = username
        this.email = email
        this.password = password
        this.active = active 
        this.verify_email = verify_email
        this.created_at = created_at 
    }

    static createUserLogin(username, email, password, active, verify_email) {
        return new User(null, username, email, password, active, verify_email, null)
    }
}

export default User