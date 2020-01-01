module.exports = {
    selectUserQuery: `SELECT * FROM users WHERE id = :1`,
    selectByEmail: `SELECT * FROM users WHERE email = :1`,
    selectByUsername: `SELECT * FROM users WHERE username = :1`,
    // ist string in username oder email + Groß-/Kleinschreibung ist egal + keinen user finden, der man selber ist
    // MINUS bereits hinzugefügte Kontakte
    selectByUsernameOrEmail: `
    Select username, email, id FROM (
        Select id 
        FROM users
            MINUS
        SELECT new_contact_id
        FROM contacts_list
        WHERE user_id = :1
        )
    NATURAL JOIN users
    WHERE ( LOWER(username) LIKE LOWER( :2 ) OR LOWER(email) LIKE :3 ) AND id <> :4 AND ROWNUM <= 13`,
    // Get name, email, conatct_date aller User, die ein Kontakt des users sind
    selectUserContacts: `
    SELECT contacts_list.new_contact_id, users.username
    FROM contacts_list
        LEFT OUTER JOIN users
        ON contacts_list.new_contact_id = users.id
    WHERE user_id = :userID
    ORDER BY contacts_list.contact_date DESC`,
    // GET all info about payments and friendship to specific contact
    // Two seperate queries because if no payments exist, information about contact still has to be sent
    selectContactInfo: `
    SELECT users.username, users.email, contacts_list.friendship_id
    FROM users
        INNER JOIN contacts_list
            ON users.id = contacts_list.user_id OR users.id = contacts_list.new_contact_id
    WHERE users.id = :1 AND contacts_list.user_id = :2`,

    selectContactPayments: `
    SELECT payments.id_from, payments.id_to, payments.amount, payments.currency, payments.description, TO_CHAR(payments.p_date, 'dd.mm.yyyy')
    FROM payments
    WHERE (id_from = :1 AND id_to = :2) OR (id_to = :3 AND id_from = :4)
    ORDER BY payments.p_date DESC`,
    selectAllUserPayments: `
    SELECT payments.id_from, payments.id_to, payments.amount, payments.currency, payments.description, TO_CHAR(payments.p_date, 'dd.mm.yyyy'), users.username 
    FROM payments
        LEFT JOIN users
            ON (CASE
                    WHEN payments.id_from = :userID THEN payments.id_to
                    ELSE payments.id_from
                END) = users.id
    WHERE payments.id_from = :userID OR payments.id_to = :userID
    ORDER BY payments.p_date DESC`,

    insertUser: `INSERT INTO users (username, email, password, reg_date) VALUES (:username, :email, :password, SYSDATE)`,
    insertContactQuery: `INSERT INTO contacts_list (user_id, new_contact_id, contact_date) VALUES (:userID, :newContactID, SYSDATE)`,
    insertPaymentQuery: `INSERT INTO payments (id_from, id_to, amount, currency, description, p_date) VALUES (:1, :2, :3, :4, :5, TO_DATE(:6,'YYYY/MM/DD'))`,

    deleteContactQuery: `DELETE FROM contacts_list WHERE user_id = :userID AND new_contact_id = :contactID`
};
