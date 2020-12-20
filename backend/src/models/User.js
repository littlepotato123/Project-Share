import mongoose from 'mongoose';

export const User = mongoose.model('User', { handle: String, password: String, imageUrl: String, supporters: Number, bio: String, liked: Array, supported: Array, supporting: Array, points: Number, awards: Array });