/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = new Collection({
        "id": "faq_collection",
        "created": "",
        "updated": "",
        "name": "faq",
        "type": "base",
        "system": false,
        "schema": [
            {
                "system": false,
                "id": "field_question",
                "name": "question",
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
                "id": "field_answer",
                "name": "answer",
                "type": "text",
                "required": true,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
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
    const collection = app.findCollectionByNameOrId("faq");
    return app.delete(collection);
});
