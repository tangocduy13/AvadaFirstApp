export function prepareNotification({shop, order, product}) {
  const shipping_address = order?.shipping_address;
  if (!shipping_address) return {};

  return {
    city: shipping_address.city,
    country: shipping_address.country,
    firstName: shipping_address.first_name,
    productId: product.id,
    productImage: product.image.src,
    productName: product.title,
    shopId: shop.id,
    shopifyDomain: shop.shopifyDomain,
    timestamp: order.created_at
  };
}
