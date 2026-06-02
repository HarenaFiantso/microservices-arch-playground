import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const categories = [
    { name: '361°', slug: '361' },
    { name: 'Adidas', slug: 'adidas' },
    { name: 'ANTA', slug: 'anta' },
    { name: 'Converse', slug: 'converse' },
    { name: 'Jordan', slug: 'jordan' },
    { name: 'Li-Ning', slug: 'li-ning' },
    { name: 'New Balance', slug: 'new-balance' },
    { name: 'Nike', slug: 'nike' },
    { name: 'Puma', slug: 'puma' },
    { name: 'Under Armour', slug: 'under-armour' },
  ];

  await prisma.category.createMany({
    data: categories,
  });

  const products = [
    {
      name: 'Adidas Harden Vol. 9',
      shortDescription: 'James Harden signature basketball shoe.',
      description:
        'Built for elite scoring and quick directional changes with responsive cushioning and premium traction.',
      price: 180,
      sizes: ['40', '41', '42', '43', '44', '45'],
      colors: ['black', 'white', 'red'],
      images: {
        black: '/products/adidas-harden-vol9-black.png',
        white: '/products/adidas-harden-vol9-white.png',
        red: '/products/adidas-harden-vol9-red.png',
      },
      categorySlug: 'adidas',
    },
    {
      name: 'Adidas Dame 9',
      shortDescription: 'Damian Lillard signature sneaker.',
      description: 'Designed for explosive guards seeking comfort, stability, and confidence in clutch moments.',
      price: 160,
      sizes: ['40', '41', '42', '43', '44', '45'],
      colors: ['green'],
      images: {
        green: '/products/adidas-dame9-green.png',
      },
      categorySlug: 'adidas',
    },
    {
      name: 'Nike Sabrina 2',
      shortDescription: 'Sabrina Ionescu signature basketball shoe.',
      description: 'Lightweight and versatile performance shoe suitable for guards and wings.',
      price: 130,
      sizes: ['40', '41', '42', '43', '44'],
      colors: ['white', 'pink'],
      images: {
        white: '/products/sabrina2-white.png',
        pink: '/products/sabrina2-pink.png',
      },
      categorySlug: 'nike',
    },
    {
      name: 'Nike G.T. Cut 3',
      shortDescription: 'Elite basketball performance sneaker.',
      description: 'Features ZoomX cushioning and exceptional court feel for quick movements.',
      price: 190,
      sizes: ['40', '41', '42', '43', '44', '45'],
      colors: ['black', 'white', 'orange'],
      images: {
        black: '/products/gtcut3-black.png',
        white: '/products/gtcut3-white.png',
        orange: '/products/gtcut3-orange.png',
      },
      categorySlug: 'nike',
    },
    {
      name: 'Air Jordan 39',
      shortDescription: 'Latest flagship Air Jordan basketball shoe.',
      description: 'Combines premium materials with modern performance technology.',
      price: 200,
      sizes: ['40', '41', '42', '43', '44', '45'],
      colors: ['black', 'white'],
      images: {
        black: '/products/aj39-black.png',
        white: '/products/aj39-white.png',
      },
      categorySlug: 'jordan',
    },
    {
      name: 'Curry 12',
      shortDescription: 'Stephen Curry signature sneaker.',
      description: 'Built around speed, grip, and stability for sharpshooters and playmakers.',
      price: 150,
      sizes: ['40', '41', '42', '43', '44', '45'],
      colors: ['black', 'white', 'blue'],
      images: {
        black: '/products/curry12-black.png',
        white: '/products/curry12-white.png',
        blue: '/products/curry12-blue.png',
      },
      categorySlug: 'under-armour',
    },
    {
      name: 'Puma MB.04',
      shortDescription: 'LaMelo Ball signature basketball shoe.',
      description: 'Unique design with responsive cushioning and aggressive traction.',
      price: 140,
      sizes: ['40', '41', '42', '43', '44'],
      colors: ['purple', 'lime', 'black'],
      images: {
        purple: '/products/mb04-purple.png',
        lime: '/products/mb04-lime.png',
        black: '/products/mb04-black.png',
      },
      categorySlug: 'puma',
    },
    {
      name: 'ANTA KT 10',
      shortDescription: 'Klay Thompson signature sneaker.',
      description: 'Reliable stability and comfort designed for two-way players.',
      price: 150,
      sizes: ['40', '41', '42', '43', '44', '45'],
      colors: ['white', 'gold', 'black'],
      images: {
        white: '/products/kt10-white.png',
        gold: '/products/kt10-gold.png',
        black: '/products/kt10-black.png',
      },
      categorySlug: 'anta',
    },
    {
      name: 'Li-Ning Way of Wade 11',
      shortDescription: 'Premium Dwyane Wade signature sneaker.',
      description: 'High-performance basketball shoe featuring advanced cushioning technology.',
      price: 225,
      sizes: ['40', '41', '42', '43', '44', '45'],
      colors: ['orange'],
      images: {
        orange: '/products/wow11-orange.png',
      },
      categorySlug: 'li-ning',
    },
    {
      name: '361° BIG3 6.0 Pro',
      shortDescription: 'Aaron Gordon signature basketball shoe.',
      description: 'Balanced cushioning, support, and traction for high-level competition.',
      price: 140,
      sizes: ['40', '41', '42', '43', '44', '45'],
      colors: ['orange', 'white', 'black'],
      images: {
        orange: '/products/big3pro-orange.png',
        white: '/products/big3pro-white.png',
        black: '/products/big3pro-black.png',
      },
      categorySlug: '361',
    },
  ];

  await prisma.product.createMany({
    data: products,
  });

  console.log(`Seeded ${categories.length} categories`);
  console.log(`Seeded ${products.length} products`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
