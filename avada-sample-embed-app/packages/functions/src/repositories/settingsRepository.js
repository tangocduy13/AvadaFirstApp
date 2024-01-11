import {Firestore} from '@google-cloud/firestore';
import defaultSettings from '@functions/const/defaultSettings';

const firestore = new Firestore();
const collection = firestore.collection('settings');

export async function getSettings(shopID) {
  try {
    const settingsDocs = await collection.where('shopId', '==', shopID).get();
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

export async function updateSettings({data, shopID}) {
  try {
    const setting = await getSettings(shopID);
    return collection.doc(setting.id).update(data);
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function addDefaultSetting(shopId) {
  try {
    return collection.add({...defaultSettings, shopId});
  } catch (e) {
    console.error(e);
  }
}
