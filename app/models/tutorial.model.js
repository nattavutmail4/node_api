const sql = require('./db.js'); //import connection database


// constructor เรียกใช้งาน 
const Tutorial = function(tutorial) {
    this.title = tutorial.title;
    this.description = tutorial.description;
    this.published = tutorial.published;
  };
  



// modules create data
Tutorial.create = (newTutorial,result)=>{
    sql.query("INSERT INTO tutorials SET ? ", newTutorial,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }

        console.log("Create tutorial: ",{id: res.insertId, ...newTutorial});
        result(null,{id:res.insertId, ...newTutorial})
    });
};


module.exports = Tutorial;

