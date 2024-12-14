
class ContactRepository {
    static async getContacts(user_id, page, per_page) {
        const query = `SELECT * FROM Users WHERE id = ? AND active = 1 AND verify_email = 1`
    }
}

export default ContactRepository
