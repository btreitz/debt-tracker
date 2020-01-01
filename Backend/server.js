const express = require('express');

const app = express();
const port = 3000;

const cookieSession = require('cookie-session');

const bodyParser = require('body-parser');

const passport = require('passport');

const publicRoot = '/Users/basti/OneDrive/Documents/Medieninformatik/Sonstige Dinge/Programme/Debt-Tracking Web-App/Web-App/debtTracker/Frontend/dist';
app.use(express.static(publicRoot));

app.use(bodyParser.json());
// Create cookie to save user session
app.use(cookieSession({
  name: 'mysession',
  keys: ['vueauthrandomkey'],
  maxAge: 24 * 60 * 60 * 1000, // Stunden * Minuten * Sekunden * Millisekunden = 24 hours
  sameSite: 'lax' // Cookie wird nur bei genau der Domain gesendet oder bei Link zu dieser Domain ( nicht bei ähnlicher Domain)
}));

app.use(passport.initialize());
app.use(passport.session());

require('./api/routes.js')(app, passport);

// Start local server
app.listen(port, () => {
  console.log("Web-App is listening on port " + port)
});
