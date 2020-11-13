import mongoose from 'mongoose';

export const Message = mongoose.model('Message', { author: String, body: String, userId: String });