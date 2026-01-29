/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("faq_collection")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number4113142680",
    "max": null,
    "min": null,
    "name": "order",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("faq_collection")

  // remove field
  collection.fields.removeById("number4113142680")

  return app.save(collection)
})
