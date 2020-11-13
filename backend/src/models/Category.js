import mongoose from 'mongoose';

export const Category = mongoose.model('Category', { title: String });