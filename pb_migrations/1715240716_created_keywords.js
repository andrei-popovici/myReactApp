/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "4kr1zfty7apwn4w",
    "created": "2024-05-09 07:45:16.694Z",
    "updated": "2024-05-09 07:45:16.694Z",
    "name": "keywords",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "w0eq2a4r",
        "name": "content",
        "type": "text",
        "required": false,
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
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("4kr1zfty7apwn4w");

  return dao.deleteCollection(collection);
})
