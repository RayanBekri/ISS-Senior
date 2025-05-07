const db = require('../config/db'); // Adjust path to your DB config file

exports.getAllCompanies = async (req, res) => {
    try {
        const [companies] = await db.query(
            'SELECT user_id , company_name, company_tax_number, approval_status , created_at FROM user WHERE is_company = 1'
        );
        res.status(200).json(companies);
    } catch (err) {
        console.error('Error fetching companies:', err);
        res.status(500).json({ message: 'Server error while fetching companies' });
    }
};

exports.updateCompanyApproval = async (req, res) => {
    const { user_id, approval_status } = req.body;

    // Validate input
    if (!user_id || !approval_status) {
        return res.status(400).json({ message: 'Missing required fields: user_id and approval_status' });
    }

    // Check if approval_status is valid
    const validStatuses = ['pending', 'accepted', 'denied'];
    if (!validStatuses.includes(approval_status)) {
        return res.status(400).json({ message: 'Invalid approval_status. Must be: pending, accepted, or denied' });
    }

    try {
        // Check if the user exists and is a company
        const [user] = await db.query(
            'SELECT user_id FROM user WHERE user_id = ? AND is_company = 1',
            [user_id]
        );

        if (user.length === 0) {
            return res.status(404).json({ message: 'Company not found or not a company account' });
        }

        // Update approval_status
        await db.query(
            'UPDATE user SET approval_status = ? WHERE user_id = ?',
            [approval_status, user_id]
        );

        res.status(200).json({ message: 'Company approval status updated successfully' });
    } catch (err) {
        console.error('Error updating company approval status:', err);
        res.status(500).json({ message: 'Server error while updating approval status' });
    }
};