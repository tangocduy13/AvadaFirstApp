import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();
const collection = firestore.collection('settings');

export async function getSettings(shopID) {
  try {
    const settingsDocs = await collection
      .where('shopId', '==', shopID)
      .limit(1)
      .get();
    if (settingsDocs.empty) {
      return null;
    }
    const settingDoc = settingsDocs.docs[0];
    return {id: settingDoc.id, ...settingDoc.data()};
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function updateSettings(data, shopID) {
  try {
    const setting = await getSettings(shopID);
    return collection.doc(setting.id).update(data);
  } catch (e) {
    console.error(e);
    return null;
  }
}
