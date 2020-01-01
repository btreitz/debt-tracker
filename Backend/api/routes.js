require('../services/passport');
const { validationRulesLogin, validationRulesRegistration, validate } = require('../services/validator.js');
const { searchInDb } = require('../services/searchContact');
const { insertContact, deleteContact, getUserContacts, getContactInformation } = require('../services/contactOperations');
const { addPayment, getUserPayments } = require('../services/paymentOperations');


module.exports = function(app, passport) {

    /*
     * Check if user is authenticated
     * if not -> send error and do not resume functions
     */
    const authMiddleware = (req, res, next) => {
        if (!req.isAuthenticated()) {
            res.status(401).send('You are not authenticated')
        } else {
            return next()
        }
    };

    /*
     * Route only dedicated to check if user is authenticated
     */
    app.get("/api/checkAuthenticated", authMiddleware, (req, res, next) => {
        res.json({ isAuthenticated : true, message: 'User already has session'})
    });

    /*
     * Validate Registration input with express-validator
     * Custom local-registration passport.js authentication
     */
    app.post("/api/register", validationRulesRegistration(), validate, (req, res) => {
        passport.authenticate('local-signup', function(err, user, info){
            console.log(info.message);
            if (user) {
                console.log('## Registration successful ##');
                res.status(200).json({message: info.message})
            } else {
                console.log('~~ Registration unsuccessful ~~');
                res.status(422).json({message: info.message})
            }
        })(req,res);
    });

    /*
     * Validate Login input with express-validator
     * Custom local-login passport.js authentication
     */
    app.post("/api/login", validationRulesLogin(), validate, (req, res) => {
        passport.authenticate('local-login', function(err, user, info){
            console.log(info.message);
            if (user) {
                console.log('## Login successful ##');
                // serialization call
                req.login(user, (err) => {
                    res.status(200).json({message: info.message})
                });
            } else {
                console.log('~~ Login unsuccessful ~~');
                res.status(422).json({message: info.message})
            }
        })(req,res);
    });

    /*
     * Terminate session of user
     */
    app.get('/api/logout', function(req, res){
        // aktuelles User-Objekt wird "null" gesetzt
        req.logout();
        return res.send();
    });

    /*
     * Send id, username, email of user in session
     */
    app.get("/api/user", authMiddleware, (req, res) => {
        res.status(200).json({id: req.user[0], username: req.user[1], email: req.user[2]});
    });

    /*
     * Send users who contain searchInformation in email or username
     */
    app.get("/api/searchResult", authMiddleware, (req, res) => {
        searchInDb(req.query.searchInformation, req.user[0])
            .then(result => {
                if (result.err) {
                    res.status(400).json({users: result.users, message: result.message})
                }
                res.status(200).json({users: result.users, message: result.message})
            });
    });

    /*
     * Insert a new contact into the contacts_list of user, by on contactID and userID
     */
    app.post("/api/addContact", authMiddleware, (req, res) => {
        insertContact(req.user[0], req.body.contactID)
            .then(result => {
                if (result.err) {
                    res.status(400).json({ message: result.message })
                }
                res.status(200).json({ message: result.message })
            });
    });

    /*
     * Delete a contact from the user's contacts_list, by contactID and userID
     */
    app.post("/api/deleteContact", authMiddleware, (req, res) => {
        console.log(req.user[0], req.body.contactID);
        deleteContact(req.user[0], req.body.contactID)
            .then(result => {
                if (result.err) {
                    res.status(400).json({ message: result.message })
                }
                res.status(200).json({ message: result.message })
            });
    });

    /*
     * Send all contacts this user has in the contacts_list
     */
    app.get("/api/contacts", authMiddleware, (req, res) => {
        getUserContacts(req.user[0])
            .then(result => {
               if (!result.contacts) {
                   res.status(400).json({ contacts: [], message: result.message })
               }
                res.status(200).json({ contacts: result.contacts, message: result.message })
            });
    });

    /*
     * Send detailed information about a specific contact and the payments between th user and the contact
     */
    app.get('/api/contactInformation', authMiddleware, (req, res) => {
        getContactInformation(req.user[0], req.query.ID)
            .then(result => {
                if (!result.contact) {
                    res.status(400).json({ contact: null, payments: result.payments, message: 'Contact could not be found' })
                }
                res.status(200).json({ contact: result.contact, payments: result.payments, message: result.message })
            });
    });

    /*
     * Insert a new Payment between the user and a specific contact into the database
     */
    app.post('/api/addPayment', authMiddleware, (req, res) => {
        if (req.body.receive) {
            addPayment(req.body.contactID, req.user[0], req.body.amount, req.body.currency, req.body.description, req.body.date)
                .then(result => {
                    if (result.err) {
                        res.status(400).json({ message: result.message })
                    }
                    res.status(200).json({ message: result.message })
                });
        } else {
            addPayment(req.user[0], req.body.contactID, req.body.amount, req.body.currency, req.body.description, req.body.date)
                .then(result => {
                    if (result.err) {
                        res.status(400).json({ message: result.message })
                    }
                    res.status(200).json({ message: result.message })
                });
        }
    });

    /*
     * Send all payments, from and to the user
     */
    app.get('/api/allUserPayments', authMiddleware, (req, res) => {
        getUserPayments(req.user[0])
            .then(result => {
                res.status(200).json({ payments: result.payments, message: result.message })
            });
    });

};
