/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "farq09ex2cewt10",
    "created": "2024-05-09 08:34:21.822Z",
    "updated": "2024-05-09 08:34:21.822Z",
    "name": "keyWords",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "kvf9sxav",
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
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("farq09ex2cewt10");

  return dao.deleteCollection(collection);
})
