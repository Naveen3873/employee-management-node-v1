const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

const getAllUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided

    try {
        const users = await User.find({ isAdmin: false })
            .select('-password')
            .skip((page - 1) * limit)
            .limit(limit);

        const totalUsers = await User.countDocuments({ isAdmin: false });

        res.json({
            users,
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


const approveUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isApproved = true;
        await user.save();
        console.log("user---",user);
        const websiteUrl = "http://localhost:3000";
        await sendEmail({
            to: user.email,
            subject: 'Account Approved',
            html: `<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f0f2f5;">
                    <div style="background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); width: 90%; max-width: 400px; text-align: center;">
                        <h4 style="color: #4CAF50; margin-bottom: 20px;">Account Approved Successfully</h4>
                        <p style="color: #555; margin-bottom: 20px;">You can Login to your account with the below link</p>
                        <a href="${websiteUrl}" style="display: inline-block; padding: 12px 24px; border: none; background-color: #4CAF50; color: #fff; border-radius: 5px; text-decoration: none; font-weight: bold; cursor: pointer;">Go to Login</a>
                    </div>
                </body>`
        });
        res.json({ message: 'User approved' });
    } catch (error) {
        console.log("error-0-0--",error);
        res.status(500).json({ message: 'Server error' });
    }
};

const rejectUser = async (req, res) => {
    try {
        console.log("--------[rejectUser---------");
        const user = await User.findByIdAndDelete(req.params.id);
        console.log("user----",user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User rejected' });
    } catch (error) {
        console.error('Error during user removal:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getAllUsers, approveUser, rejectUser };