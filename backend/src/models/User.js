import mongoose from 'mongoose';

export const User = mongoose.model('User', { handle: String, email: String, password: String, imageUrl: String, supporters: Number, bio: String });