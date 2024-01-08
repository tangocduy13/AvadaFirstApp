import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();
const collection = firestore.collection('Notifications');

export async function() {
  const docs = await collection.doc().get();
  if(!docs.exists) {
    return null;
  } else {
    docs.forEach(doc => {

    })
  }
}
