/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = new Collection({
        "id": "portfolio_collection",
        "created": "",
        "updated": "",
        "name": "portfolio",
        "type": "base",
        "system": false,
        "schema": [
            {
                "system": false,
                "id": "field_title",
                "name": "title",
                "type": "text",
                "required": true,
                "presentable": true,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "field_image",
                "name": "image",
                "type": "file",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "mimeTypes": [
                        "image/jpeg",
                        "image/png",
                        "image/gif",
                        "image/webp"
                    ],
                    "thumbs": ["100x100", "300x300"],
                    "maxSelect": 1,
                    "maxSize": 5242880,
                    "protected": false
                }
            },
            {
                "system": false,
                "id": "field_websiteUrl",
                "name": "websiteUrl",
                "type": "url",
                "required": true,
                "presentable": false,
                "unique": false,
                "options": {
                    "exceptDomains": [],
                    "onlyDomains": []
                }
            },
            {
                "system": false,
                "id": "field_tags",
                "name": "tags",
                "type": "json",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "maxSize": 2000000
                }
            },
            {
                "system": false,
                "id": "field_description",
                "name": "description",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "field_order",
                "name": "order",
                "type": "number",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": 0,
                    "max": null,
                    "noDecimal": true
                }
            }
        ],
        "indexes": [],
        "listRule": "",
        "viewRule": "",
        "createRule": "",
        "updateRule": "",
        "deleteRule": "",
        "options": {}
    });

    return app.save(collection);
}, (app) => {
    const collection = app.findCollectionByNameOrId("portfolio");
    return app.delete(collection);
});
