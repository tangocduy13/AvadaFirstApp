import makeRequest from '../helpers/api/makeRequest';

export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };

  getApiData = async () => {
    const shopifyDomain = window.Shopify.shop;
    const {notifications, settings} = await makeRequest(
      `https://localhost:3000/clientApi/shop?shopifyDomain=${shopifyDomain}`
    );
    return {notifications, settings};
  };
}
