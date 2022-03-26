const Tutorial = require("../models/tutorial.model.js");


//create and Save new Tutorial
exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message:'Content Can not be empty'
        });
    }

   // Create a Tutorial เรียกใช้  Const
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published || false
    });

    //Save tutorial in the database
    Tutorial.create(tutorial,(err,data)=>{
        if(err)
         res.status(500).send({
             message:
             err.message || "Some error occurred while creating the Tutorial."
         });
         else 
         res.status(200).send({
            "status":'true',
            "message":'create data Success',
            'data':{
                'response':data
            }
         });
    })

}