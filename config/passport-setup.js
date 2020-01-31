const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    console.log('I just got called.  I serialize a user');
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('I just got called.  I deserialize a user');
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {

        console.log(profile);
        User.findOne({googleId:profile.id}).then((currentUser)=>{
            if(currentUser){
                console.log('user is the: ' + currentUser);
                done(null, currentUser);
            }else{
                new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    thumbnail: profile._json.picture
                }).save().then((newUser) => {
                    console.log('new user created: ', newUser);
                    done(null, newUser);
                });
            }
        })

        
    })
);