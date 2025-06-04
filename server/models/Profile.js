import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  nickname: {
    type: String,
    required: [true, 'Nickname is required'],
    trim: true
  },
  yearsPlaying: {
    type: Number,
    required: [true, 'Years of playing experience is required'],
    min: 0,
    max: 100
  },
  preferredGame: {
    type: String,
    required: [true, 'Preferred game is required'],
    enum: ['eight-ball', 'nine-ball', 'ten-ball', 'straight']
  },
  averageBreak: {
    type: Number,
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

profileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;