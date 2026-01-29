/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("faq_collection")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number4113142680",
    "max": null,
    "min": 0,
    "name": "order",
    "onlyInt": true,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("faq_collection")

  // update field
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
})
