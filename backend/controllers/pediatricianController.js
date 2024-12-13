const db = require('../config/db');
const User = require('../models/userModel');

const getUserData = (req, res) => {
    const { id } = req.user;

    const query = `
    SELECT u.email, p.firstname, p.middlename, p.lastname
    FROM users u 
    JOIN pediatricians p ON u.id = p.user_id 
    WHERE u.id = ?
    `;

    db.execute(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching user data:', err);
            return res.status(500).json({ message: 'Error fetching user data' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userData = results[0];
        res.json({
            email: userData.email,
            name: `${userData.firstname} ${userData.middlename} ${userData.lastname}`.trim(),
        });
    });
};

module.exports = { getUserData };
