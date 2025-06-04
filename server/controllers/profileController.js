import Profile from '../models/Profile.js';

export const setupProfile = async (req, res) => {
  try {
    const { nickname, yearsPlaying, preferredGame, averageBreak } = req.body;
    const userId = req.user._id; // Changed from req.user.id to req.user._id

    // Check if profile already exists
    let profile = await Profile.findOne({ user: userId });
    if (profile) {
      return res.status(400).json({
        success: false,
        message: 'Profile already exists'
      });
    }

    // Create new profile
    profile = await Profile.create({
      user: userId,
      nickname,
      yearsPlaying: Number(yearsPlaying),
      preferredGame,
      averageBreak: averageBreak ? Number(averageBreak) : undefined
    });

    res.status(201).json({
      success: true,
      profile
    });
  } catch (error) {
    console.error('Profile setup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Changed from req.user.id to req.user._id
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    res.status(200).json({
      success: true,
      profile
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};