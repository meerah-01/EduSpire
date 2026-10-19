
import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/test', (req, res) => {
  res.json({
    message: 'Authentication route is working',
  });
});

// Register route
router.post('/register', registerUser);
// Login route
router.post('/login', loginUser);

router.get('/profile', authenticateToken, (req, res) => {
  res.json({
    message: 'You are authenticated',
    user: req.user
  });
});

export default router;