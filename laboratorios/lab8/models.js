import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true },
});

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
});

const Product = mongoose.model('Product', productSchema);
const Category = mongoose.model('Category', categorySchema);

export { Product, Category };
