import mongoose from 'mongoose';

const connect = async (uri) => {
  await mongoose.connect(uri);
};

export { connect };
