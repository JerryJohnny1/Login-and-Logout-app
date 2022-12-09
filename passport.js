const LocalStrategy = require("passport-local"). Strategy
const bcrypt = require("bcrypt")


function initialize(passport, getUserByEmail, getUserByid){
    const authenticateUsers = async (email, password, done) => {
        const user = getUserByEmail(email)
        if (user == null){
            return done (null, false, {message: "No user detected with that email address"})
        }
        try {
              if (await bcrypt.compare(password, user.password)){
                return done (null, user)
              }else{
                return done(null, false, {message: "password incorrect!"})
              }
        } catch (e) {
               console.log(e);
               return done(e)
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email'},authenticateUsers))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserByid(id))
    })
}

module.exports=initialize