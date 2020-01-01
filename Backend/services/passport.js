const LocalStrategy   = require('passport-local').Strategy;
const passport = require('passport');
const registration = require('./registration');
const login = require('./login');
const { startConnection, closeConnection, sqlStatement } = require('../databaseAccess/databaseOperations');
const { selectUserQuery } = require('../config/sqlQueries');

/*
 * Passport.js local strategy, custom sign up
 * Validate input data and create new User
 */
passport.use('local-signup',
    new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        (req, username, password, done) => {
        const email = req.body.email.toLowerCase();
        registration.validateRegisterData(req.body.username, email, req.body.password, req.body.confPassword)
            .then(result => {
                done(null, result.value, {message: result.msg});
                if (result.value) {
                    // Hash password and save to Database
                    registration.createUser(req.body.username, email, req.body.password);
                }
            })
            .catch(() => console.log('Something went wrong'));
    })
);

/*
 * Passport.js local strategy, custom login
 * Check if data is correct
 */
passport.use('local-login',
    new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, done) => {
            console.log('Authentication started');
            login.checkLoginDb(email.toLowerCase(), password)
                .then(result => {
                    done(null, result.value, {message: result.msg});
                })
                .catch(err => {
                    console.log(err)
                })
        }
    ));


// De-/Serialization based on ID
passport.serializeUser((user, done) => {
    done(null, user[0])
});


/*
 * Find user to deserialize
 * Database access
 */
passport.deserializeUser(async (id, done) => {
    await startConnection();
    sqlStatement(selectUserQuery, [id])
        .then(rows => {
            let user = rows.rows[0];
            done(null, user)
        })
        .catch(err => {
            done(err, null)
        })
        .finally(() => {
            closeConnection();
        })
});
