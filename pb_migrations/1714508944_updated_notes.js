/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bigiq5yqba0wlj1")

  // remove
  collection.schema.removeField("j1b5lwgc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hgulkkhs",
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
  const collection = dao.findCollectionByNameOrId("bigiq5yqba0wlj1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j1b5lwgc",
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
  collection.schema.removeField("hgulkkhs")

  return dao.saveCollection(collection)
})
