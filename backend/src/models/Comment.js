import mongoose from 'mongoose';

export const Comment = mongoose.model('Comment', { postId: String, body: String, author: String });