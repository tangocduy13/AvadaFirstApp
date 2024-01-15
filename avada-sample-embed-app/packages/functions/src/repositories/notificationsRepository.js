import {Firestore} from '@google-cloud/firestore';
import prepareDocs from '../helpers/prepareDocs';

const firestore = new Firestore();
const collection = firestore.collection('notifications');

export async function getNotifications({shopID}) {
  try {
    const querySnapshot = await collection
      .where('shopId', '==', shopID)
      .orderBy('timestamp', 'desc')
      // .offset((parseInt(page) - 1) * parseInt(limit))
      // .limit(parseInt(limit))
      .get();

    if (querySnapshot.empty) {
      return null;
    } else {
      return prepareDocs(querySnapshot.docs);
    }
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function addOneNotification(notification) {
  try {
    await collection.add(notification);
  } catch (e) {
    console.error(e);
  }
}
