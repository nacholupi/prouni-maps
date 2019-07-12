var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('./models/user.js');

passport.use(new GoogleStrategy({
    clientID: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLI_SECRET,
    callbackURL: process.env.OAUTH_CALLBACK_HOST + '/auth/login/callback' ,
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
},
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ oauthID: profile.id }, { _id: 0, }, function (err, user) {
            if (!err && user !== null) {
                done(null, user);
            } else {
                theEmail = (profile.emails && profile.emails[0]) ? profile.emails[0].value : undefined;
                now = Date.now();
                user = new User({
                    oauthID: profile.id,
                    name: profile.displayName,
                    created: now,
                    email: theEmail
                });

                if (user.email == process.env.SUPER_USER_MAIL) {
                    user.role = 'ADMIN'
                }
                user.save(function (err) {
                    if (!err) {
                        console.log('saving user ...');
                        done(null, user);
                    }
                });
            }
        });
    }
));

// serialize and deserialize
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});