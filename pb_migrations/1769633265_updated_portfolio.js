/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("portfolio_collection")

  // add field
  collection.fields.addAt(6, new Field({
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
  const collection = app.findCollectionByNameOrId("portfolio_collection")

  // remove field
  collection.fields.removeById("number4113142680")

  return app.save(collection)
})
