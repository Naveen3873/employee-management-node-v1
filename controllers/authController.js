const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { name, email, phone, description, profilePhoto, password, salary } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            phone,
            description,
            profilePhoto,
            password,
            salary
        });

        // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        // console.log("user create token response----------",token);
        // await sendEmail({
        //     to: user.email,
        //     subject: 'Email Confirmation',
        //     html: `<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f0f2f5;">
        //             <div style="background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); width: 90%; max-width: 400px; text-align: center;">
        //                 <h4 style="color: #4CAF50; margin-bottom: 20px;">Account Created Successfully</h4>
        //                 <p style="color: #555; margin-bottom: 20px;">Your account has been created successfully. You can wait for an admin approval.</p>
        //                 <div style="text-align: left; margin-bottom: 20px;">
        //                     <p style="color: #555; margin: 5px 0;">Username: <strong style="color: #000;">${email}</strong></p>
        //                     <p style="color: #555; margin: 5px 0;">Password: <strong style="color: #000;">${password}</strong></p>
        //                 </div>
        //             </div>
        //         </body>`
        // });

        // res.status(201).json({ token });
        res.status(201).json({ message: 'Wait for an admin approval!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (!user.isApproved) {
            return res.status(403).json({ message: 'Your account is not approved yet' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        let { isAdmin} = user;
        res.json({ isAdmin,token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, loginUser };