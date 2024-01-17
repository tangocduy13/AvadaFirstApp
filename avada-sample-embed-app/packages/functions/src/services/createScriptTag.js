export async function createScriptTag(shopify) {
  const listScriptTags = await shopify.scriptTag.list();

  await Promise.all(
    listScriptTags.map(async scripttag => {
      await shopify.scriptTag.delete(scripttag.id);
    })
  );

  await shopify.scriptTag.create({
    event: 'onload',
    src: `https://localhost:3000/scripttag/avada-sale-pop.min.js`
  });
}
