const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Role = require('../models/role');
const mail = require('../config/mailConfig');
const cloudinaryConfig = require('../config/cloudinaryConfig');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;


cloudinary.config(cloudinaryConfig);

async function register(data, avatar) {
    let salt = bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));

    let hash = await bcrypt.hash(data.password, salt);

    let role = await Role.findOne({name: 'user'});

    let user = await User.findOne({
        $or: [{username: data.username}, {email: data.email}],
    });

    if(!user)
    {
        let userData = {
            username: data.username,
            password: hash,
            email: data.email,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            createdBy: data.username,
            updatedBy: data.username,
            firstName: data.firstName,
            lastName:data.lastName,
            age: data.age,
            isEmailVerified: false,
            isDeleted: false,
            city: data.city,
            role: role._id,
            avatar: ""
        }

        await cloudinary.uploader(avatar, {resource_type: "image"}).
        then(function(file) {userData.avatar = file.url}).
        catch(function(err) {console.log(err)});

        let user = new User(userData);

        let emailToken = jwt.sign(
            {_id: user._id},
            process.env.MAIL_VALIDATION_SECRET
        );

        let verificationLink = `http://localhost:3000/auth/emailverification/${emailToken}`;

        let email = await mail.sendMail({
            from: "CharIt <theleettest@gmail.com>",
            to: `${user.firstName} ${user.lastName} "${user.email}"`,
            subject: "Verify your email",
            text: `Please click on the link to verify your email ${verificationLink}`
        });

        return await user.save();
    } else {
        return {message: "User alredy exist"};
    }
};

async function login(username, password) {
    let user = await User.findOne({username: username}).populate("role").lean();

    if(!user)
    {
        throw {message: "Wrong credentials"}
    };

    let isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw {message: "Wrong credentials"}
    }

    if(!user.isEmailVerified) {
        throw { message: "Email is not verified. Please first verify your email!" };
    }

    let token = jwt.sign(
        {id: user._id, username: user.username, role: user.role.name},
        process.env.USER_SESSION_SECRET
    );

    return token;
}

async function emailVerification(token) {
    let userId;
    await jwt.verify(
        token,
        process.env.USER_SESSION_SECRET,
        function(err, decoded) {
            if(err) {
                throw {err};
            }
            userId = decoded._id;
        }
    );

    let user = await User.findById(userId);
    await user.set({isEmailVerified: true});
    await user.save();
}

module.exports = {

    register,
    login,
    emailVerification
}
