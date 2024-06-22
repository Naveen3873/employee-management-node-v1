const express = require('express');
const { getAllUsers, approveUser, rejectUser } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/users').get(protect, admin, getAllUsers);
router.route('/approve/:id').put(protect, admin, approveUser);
router.route('/reject/:id').delete(protect, admin, rejectUser);

module.exports = router;