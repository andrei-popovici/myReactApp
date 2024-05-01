/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7y0zg7hfa2ct7dx")

  // remove
  collection.schema.removeField("bpemtwyz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ihifsfea",
    "name": "user",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7y0zg7hfa2ct7dx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bpemtwyz",
    "name": "user",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("ihifsfea")

  return dao.saveCollection(collection)
})
