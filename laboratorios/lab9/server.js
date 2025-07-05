import Stripe from 'stripe';
import Fastify from 'fastify';
import FastifyStatic from '@fastify/static';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = Fastify({
    logger: true,
});

app.register(FastifyStatic, {
  root: path.join(dirname(fileURLToPath(import.meta.url)), 'client'),
  prefix: '/',
})


const PORT = process.env.PORT ?? 3000;

app.get('/', (req, res) => {
    return res.sendFile('index.html');
});

app.get('/success', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    console.log({ session });
    return res.sendFile('success.html');
});

app.get('/canceled', (req, res) => {
    return res.sendFile('cancel.html');
});

app.get('/health', (req, res) => res.send('OK'));

app.post('/api/v1/products', async (req, res) => {
    try {
        const { name, amount } = req.body;
        const price = await stripe.prices.create({
          currency: 'usd',
          unit_amount: amount,
          product_data: {
            name,
          },
        });
        return {
            price
        }
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send({ error: 'Failed to create product' });
    }
})

app.post('/api/v1/create-checkout-session', async (req, res) => {
  try {
    const domainURL = req.headers.origin || 'http://localhost:3000';
    const { quantity, price } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price,
          quantity,
        },
      ],
      success_url: `${domainURL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/canceled?session_id={CHECKOUT_SESSION_ID}`,
    });

    return {
      url: session.url
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send({ error: 'Failed to create checkout session' });
  }
});


const start = async () => {
    try {
        await app.listen({ port: PORT });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
