var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('./models/user.js');

passport.use(new GoogleStrategy({
    clientID: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLI_SECRET,
    callbackURL: process.env.OAUTH_CALLBACK
},
    function (request, accessToken, refreshToken, profile, done) {
        User.findOne({ oauthID: profile.id }, function (err, user) {
            if (err) {
                console.log(err);  // handle errors!
            }
            if (!err && user !== null) {
                done(null, user);
            } else {
                user = new User({
                    oauthID: profile.id,
                    name: profile.displayName,
                    created: Date.now()
                });
                user.save(function (err) {
                    if (err) {
                        console.log(err);  // handle errors!
                    } else {
                        console.log("saving user ...");
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
    console.log('deserializeUser: ' + user);
    done(null, user);
});