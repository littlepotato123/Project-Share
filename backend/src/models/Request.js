import * as mongoose from 'mongoose';

export const Request = mongoose.model('Request', { name: String, description: String });