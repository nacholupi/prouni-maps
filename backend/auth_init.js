var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('./models/user.js');

passport.use(new GoogleStrategy({
    clientID: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLI_SECRET,
    callbackURL: process.env.OAUTH_CALLBACK,
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
},
    function (request, accessToken, refreshToken, profile, done) {
        console.log(profile);
        User.findOne({ oauthID: profile.id }, { _id: 0, }, function (err, user) {
            if (!err && user !== null) {
                console.log(err);
                done(null, user);
            } else {
                now = Date.now();
                user = new User({
                    oauthID: profile.id,
                    name: profile.displayName,
                    created: now,
                    email: profile.email
                });

                if (user.oauthID == process.env.SUPER_USER_PROFILE_ID) {
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