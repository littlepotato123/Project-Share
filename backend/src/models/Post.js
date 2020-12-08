import mongoose from 'mongoose';

export const Post = mongoose.model('Post', { title: String, date: String, author: String, category: String, likes: Number, body: String })