const express=require('express')
const router=express.Router()
const passport=require('passport')


//Route for home page
router.get('/', (req, res) => {
    res.render('home')
})


//Route for userProfile
router.get('/userProfile', (req, res) => {
    res.render('userProfile')
})

//Route for sign up
router.get('/register', (req, res) => {
    res.render('register')
})
router.post('/register', (req, res) => {
    const newUser = new User({ username: req.body.username })
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("register") 
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/login")
        });
    });
});

// Route for login
router.get('/login', (req, res) => {
    res.render('login')
})

// router.post login structure('/login',middleware, callback)
router.post('/login', passport.authenticate('local',
    {
        successRedirect: "/farms",
        failureRedirect: "/login"
    }),
    (req, res) => {
    })


//Route for logout
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})



module.exports =router