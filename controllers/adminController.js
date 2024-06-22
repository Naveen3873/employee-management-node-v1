const User = require('../models/User');

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
        res.json({ message: 'User approved' });
    } catch (error) {
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