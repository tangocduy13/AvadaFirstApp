export default function prepareDocs(docs) {
  return docs.map(doc => {
    return {id: doc.id, ...doc.data()};
  });
}
