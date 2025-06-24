import Fastify from 'fastify';
import { Product, Category } from './models.js';
import { connect } from './db.js';

const PORT = 3000;
const MONGO_URI = 'mongodb://root:example@localhost:27017/';

const fastify = Fastify({
  logger: true,
});

fastify.get("/api/v1/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (err) {
    return res.status(500).send({ message: 'Internal server error', error: err.message });
  }
});

fastify.get("/api/v1/products", async (req, res) => {
  try {
    const products = await Product.find();
    return {
      data: products,
      count: products.length,
    };
  } catch (err) {
    return res.status(500).send({ message: 'Internal server error', error: err.message });
  }
});

fastify.get("/api/v1/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    return product;
  } catch (err) {
    return res.status(500).send({ message: 'Internal server error', error: err.message });
  }
});

fastify.post("/api/v1/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return product;
  } catch (err) {
    return res.status(500).send({ message: 'Internal server error', error: err.message });
  }
});


const start = async () => {
  try {
    await connect(MONGO_URI);
    await fastify.listen({ port: PORT });
    fastify.log.info(`Server is running on port ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
