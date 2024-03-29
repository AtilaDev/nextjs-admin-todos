import { products, type Product } from '@/app/products/data/products';
import { ItemCard } from '@/shopping-cart';
import { cookies } from 'next/headers';

interface ProductInCart {
  product: Product;
  quantity: number;
}

export const metadata = {
  title: 'Carrito de compras',
  description: 'SEO Title',
};

const getProductsInCart = (cart: { [id: string]: number }): ProductInCart[] => {
  const productInCart: ProductInCart[] = [];

  for (const id of Object.keys(cart)) {
    const product = products.find((product) => product.id === id);
    if (product) {
      productInCart.push({ product, quantity: cart[id] });
    }
  }

  return productInCart;
};

export default function CartPage() {
  const cookieStore = cookies();
  const cart = JSON.parse(cookieStore.get('cart')?.value ?? '{}') as {
    [id: string]: number;
  };
  const productsInCart = getProductsInCart(cart);

  return (
    <div>
      <h1 className='text-5xl'>Productos en el carrito</h1>
      <hr className='mb-2' />
      <div className='flex flex-col sm:flex-row gap-2 w-full'>
        <div className='flex flex-col gap-2 w-full sm:w-8/12'>
          {productsInCart.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>
      </div>
    </div>
  );
}
