import {Firestore} from '@google-cloud/firestore';
import prepareDocs from '../helpers/prepareDocs';

const firestore = new Firestore();
const collection = firestore.collection('notifications');

export async function getNotifications() {
  try {
    const snapshot = await collection.get();
    if (snapshot.empty) {
      return null;
    } else {
      return prepareDocs(snapshot.docs);
    }
  } catch (e) {
    console.error(e);
    return null;
  }
}
