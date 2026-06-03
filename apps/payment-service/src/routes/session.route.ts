import { prisma } from '@kitro/product-db';
import { CartItemsType } from '@kitro/types';
import { Hono } from 'hono';

import { shouldBeUser } from '../middlewares/auth.middleware.js';
import stripe from '../utils/stripe.js';

const sessionRoute = new Hono();

sessionRoute.post('/create-checkout-session', shouldBeUser, async (c) => {
  const { cart }: { cart: CartItemsType } = await c.req.json();
  const userId = c.get('userId');

  const lineItems = await Promise.all(
    cart.map(async (item) => {
      const product = await prisma.product.findUnique({
        where: { id: item.id },
        select: { stripePriceId: true },
      });

      if (!product?.stripePriceId) {
        throw new Error(`Product ${item.id} has no Stripe price — run sync script`);
      }

      return {
        price: product.stripePriceId,
        quantity: item.quantity,
      };
    })
  );

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      client_reference_id: userId,
      mode: 'payment',
      ui_mode: 'elements',
      return_url: 'http://localhost:3002/return?session_id={CHECKOUT_SESSION_ID}',
    });

    console.log(session);

    return c.json({ checkoutSessionClientSecret: session.client_secret });
  } catch (error) {
    console.log(error);
    return c.json({ error });
  }
});

sessionRoute.get('/:session_id', async (c) => {
  const { session_id } = c.req.param();
  const session = await stripe.checkout.sessions.retrieve(session_id as string, {
    expand: ['line_items'],
  });

  return c.json({
    status: session.status,
    paymentStatus: session.payment_status,
  });
});

export default sessionRoute;
