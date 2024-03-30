import { getCookie, hasCookie, setCookie } from 'cookies-next';

export const getCookieCart = (): { [id: string]: number } => {
  if (hasCookie('cart')) {
    const cookieCart = JSON.parse((getCookie('cart') as string) ?? '{}');
    return cookieCart;
  }
  return {};
};

export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart();

  if (cookieCart[id]) {
    cookieCart[id] += 1;
  } else {
    cookieCart[id] = 1;
  }

  // Es lo mismo pero es una soluciön mas concisa:
  // cookieCart[id] = (cookieCart[id] || 0) + 1;

  setCookie('cart', JSON.stringify(cookieCart));
};

export const removeProductFromCart = (id: string) => {
  const cookieCart = getCookieCart();
  delete cookieCart[id];
  setCookie('cart', JSON.stringify(cookieCart));
};

export const removeSingleItemFromCart = (id: string) => {
  const cookieCart = getCookieCart();

  if (!cookieCart[id]) return;
  if (cookieCart[id]) {
    cookieCart[id] -= 1;
    if (cookieCart[id] === 0) {
      delete cookieCart[id];
    }
  }

  // Es lo mismo pero es una soluciön mas concisa:
  // if (cookieCart[id]) {
  //   cookieCart[id]--;
  //   !cookieCart[id] && delete cookieCart[id];
  // }
  setCookie('cart', JSON.stringify(cookieCart));
};
