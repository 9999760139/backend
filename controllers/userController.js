const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc post all user
// @routes post /api/user/register
// @access public
const userRegister = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All feild are mandatory")
    }
    const availableUser = await User.findOne({ email });
    if (availableUser) {
        res.status(400);
        throw new Error("User already exist")
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    if (user) {
        res.status(201).json({ message: "User register successfully", _id: user.id, email: user.email });
    } else {
        throw new Error("All data is not valid");
    }
    res.json("User register successfully")
})


// @desc get all user
// @routes get /api/user/login
// @access public

const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All feilds are mandatory")
    }
    const user = await User.findOne({ email });
    // console.log("user ::", email, user.email)
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                },
            },
            process.env.ACCESS_TOKEN_SECERT || "nitinjangid321",
            { expiresIn: "60m" }
        );
        res.status(200).json({ accessToken });
    }
    else {
        res.status(401);
        throw new Error("Email or password are not valid")
    }
})

// @desc get current user
// @routes get /api/user/current
// @access private
const userCurrent = asyncHandler(async (req, res) => {
    res.json(req.user);
})




module.exports = { userRegister, userLogin, userCurrent };