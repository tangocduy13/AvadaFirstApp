export async function getNotification({shopify, shop, orderData}) {
  // thông tin đơn hàng
  const shipping_address = orderData.shipping_address;
  const firstName = shipping_address.first_name;
  const city = shipping_address.city;
  const country = shipping_address.country;
  const timestamp = orderData.created_at;

  // thông tin sản phẩm
  const productId = orderData.line_items[0].product_id;
  const product = await shopify.product.get(productId);
  const productImage = product.image.src;
  const productName = product.title;

  // thông tin shop
  const shopId = shop.id;
  const shopifyDomain = shop.shopifyDomain;

  return {
    city,
    country,
    firstName,
    productId,
    productImage,
    productName,
    shopId,
    shopifyDomain,
    timestamp
  };
}
