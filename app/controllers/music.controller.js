const SqlString = require('mysql/lib/protocol/SqlString');
const Music = require('../models/music.model.js');

// บันทึกข้อมูล
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
       res.status(400).send({
           message:"Content can not be empty!"
       });
    }

    //Create a Music
    const music = new Music({
        name: req.body.name,
        published: req.body.published || false
    });
    Music.create(music,(err,data)=>{
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

//ค้นหาแบบ ไอดี
exports.findOne =(req,res)=>{
    Music.findById(req.params.id,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Not found Tutorial with id ${req.params.id}.`
                });
            }else{
                res.status(500).send({
                    message: "Error retrieving Tutorial with id " + req.params.id
                });
            }
        }else{
            res.status(200).send(data); 
        }
    })
}

//ค้นหาแบบชื่อ
exports.findName = (req,res)=>{
    const name = req.body.name;
    Music.findByname(name,(err,data)=>{
        if(err){
            res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving  music"
            });
        }else{
            res.status(200).send(data);  
        }
    })
}
//ดึงข้อมูลทั้งหมด
exports.findAll = (req,res)=>{
    const  name = req.query.name;
    Music.getAll(name,(err,data)=>{
        if(err){
            res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving  music"
            });
        }else{
            res.status(200).send(data);  
        }
    })
}


//update 
exports.update = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message:'Content can not be empty!'
        });
    }

    console.log(req.body);
    Music.updateById(
        req.params.id,
        new Music(req.body),
        (err,data)=>{
            if(err){
                if (err.kind === "not_found") {
                    res.status(404).send({
                      message: `Not found Tutorial with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                      message: "Error updating Tutorial with id " + req.params.id
                    });
                }
            }else{
                res.status(200).send(data);
            }
        }
    );
}


// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    Music.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Tutorial with id " + req.params.id
          });
        }
      } else res.send(data);
    });
};


// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Music.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      else res.send(data);
    });
};


