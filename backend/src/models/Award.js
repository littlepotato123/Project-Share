import mongoose from 'mongoose';

export const Award = mongoose.model('Award', { title: String, points: Number });