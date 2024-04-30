/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7y0zg7hfa2ct7dx")

  // remove
  collection.schema.removeField("mggo9hus")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ofhejd0g",
    "name": "image",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7y0zg7hfa2ct7dx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mggo9hus",
    "name": "image",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "image/jpeg"
      ],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  // remove
  collection.schema.removeField("ofhejd0g")

  return dao.saveCollection(collection)
})
