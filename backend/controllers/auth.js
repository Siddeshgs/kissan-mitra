const User = require("../models/user");
const Farmer = require("../models/farmer");
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check
const { errorHandler } = require("../helpers/dbErrorHandler");
const logger = require("../logger/index");

const JWT_SECRET = process.env.JWT_SECRET || "kisaan_secret_key_123";

exports.signup = (req, res) => {
    const user = new User(req.body);
    user.save((err, savedUser) => {
        if (err) {
            const msg = errorHandler(err) || err.message || "Failed to create user. Please ensure MongoDB is connected.";
            return res.status(400).json({
                error: msg
            });
        }
        logger.info("successfully signed up");

        if (req.body.role == 1) {
            const farm = {
                _id: savedUser._id,
                name: savedUser.name
            };
            const farmerDoc = new Farmer(farm);
            farmerDoc.save((err) => {
                if (err) {
                    console.log("Farmer profile save error:", err);
                }
            });
        }

        savedUser.salt = undefined;
        savedUser.hashed_password = undefined;
        return res.json({
            user: savedUser
        });
    });
};

exports.signin = (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err) {
            return res.status(500).json({
                error: "Database error / MongoDB not reachable: " + err.message
            });
        }
        if (!user) {
            return res.status(400).json({
                error: "User with that email does not exist. Please signup first."
            });
        }
        // if user is found make sure the username and password match
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match."
            });
        }
        // generate a signed token with user id and secret
        const token = jwt.sign({ _id: user._id }, JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie("t", token, { expire: new Date() + 9999 });
        // return response with user and token to frontend client
        const { _id, name, email, location, role } = user;
        logger.info("successfully login");
        return res.json({ token, user: { _id, email, name, location, role } });
    });
};

exports.signout = (req, res) => {
    res.clearCookie("t");
    logger.info("Signout successfully");
    res.json({ message: "Signout successfully" });
};

exports.requireSignin = expressJwt({
    secret: JWT_SECRET,
    algorithms: ["HS256"], 
    userProperty: "auth",
});


exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: "Access denied"
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Farmer resourse! Access denied"
        });
    }
    next();
};
