const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  
  if (!admin) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Verify the password using bcrypt
  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign(
    { adminId: admin._id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  // Return the token to the client
  res.json({ token });
};