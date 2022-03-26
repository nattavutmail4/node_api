module.exports = app => {
    const music = require("../controllers/music.controller.js");
  
    var router = require("express").Router();
  
    // Create a new music
    router.post("/create", music.create);
    // Retrieve all music
    router.get("/", music.findAll);

    // Retrieve all name
    router.get('/name',music.findName);

    //Retrieve a single music with id
    router.get("/:id", music.findOne);

    router.put("/:id", music.update);

    // Delete a music with id
    router.delete("/:id", music.delete);

    // Delete all music
    router.delete("/", music.deleteAll);
    
    app.use('/api/music', router);
  };
  