import {Firestore} from '@google-cloud/firestore';
import prepareDocs from '../helpers/prepareDocs';

const firestore = new Firestore();
const collection = firestore.collection('notifications');

export async function getNotifications({shopID, limit, page, sort}) {
  try {
    const querySnapshot = await collection
      .where('shopId', '==', shopID)
      .orderBy('timestamp', sort)
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

export async function addNotifications(notificationList) {
  try {
    await Promise.all(
      notificationList.map(notification => {
        collection.add(notification);
      })
    );
  } catch (e) {
    console.error(e);
  }
}

export async function addOneNotification(notification) {
  try {
    await collection.add(notification);
  } catch (e) {
    console.error(e);
  }
}
