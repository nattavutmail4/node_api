const sql = require("./db.js");

//const 
const Music = function(music){
    this.name = music.name,
    this.published = music.published
};

//save
Music.create =(newMusic,result)=>{
    sql.query('INSERT INTO tb_music SET ?', newMusic, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created music: ", { id: res.insertId, ...newMusic });
        result(null, { id: res.insertId, ...newMusic });
    });
}

//search by id
Music.findById = (id,result)=>{
    sql.query(`SELECT * FROM tb_music WHERE id = ${id}`,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if (res.length) {
            Rowdata = res.length;
            console.log("found tutorial: ", res[0]);
            data ={
                "status":'true',
                "message":'Search Successfully',
                "Rowdata":res.length,
                'data':{
                    'response':res[0]
                }
            }
            result(null, data);
            return;
        }
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    })
}
//show all data
Music.getAll = (name,result)=>{
    let query = "SELECT * FROM tb_music";
    if(name){
        query +=`WHERE name LIKE %${name}%`;
    }
    sql.query(query,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(null,err);
            return;
        }
        data = {
            "status":'true',
            "message":'Show data Successfully',
            "Rowdata":res.length,
            'data':{
                'response':res
            }
        }
        result(null,data);
    })
}

//Search by name
Music.findByname =(name,result)=>{
    sql.query(`SELECT * FROM tb_music WHERE name = '${name}' `,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if (res.length) {
            Rowdata = res.length;
            console.log("found tutorial: ", res[0]);
            data ={
                "status":'true',
                "message":'Search Successfully',
                "Rowdata":res.length,
                'data':{
                    'response':res[0]
                }
            }
            result(null, data);
            return;
        }
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    })
}

//Update
Music.updateById = (id,music,result)=>{
    sql.query("UPDATE tb_music SET name = ?,  published = ? WHERE id = ?",
        [music.name, music.published,id],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          if (res.affectedRows == 0) {
            // not found Tutorial with the id
            result({ kind: "not_found" }, null);
            return;
          }
        //   console.log("updated tb_music: ", { id: id, ...music });
          data ={
            "status":'true',
            "message":'Update Successfully',
            'data':{
                'response':music
            }
          }
          result(null,data);
        }
      );
    
}

//delete by id
Music.remove = (id, result) => {
    sql.query("DELETE FROM tb_music WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
    //   console.log("deleted tutorial with id: ", id);
      data ={
        "status":'true',
        "message":'deleted successfully!',
        'data':{
            'response':'deleted Music with id:'+id
        }
      }
      result(null, data);
    });
};

//delete all
Music.removeAll = result => {
    sql.query("DELETE FROM tb_music", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`deleted ${res.affectedRows} tutorials`);
      data ={
        "status":'true',
        "message":'deleted successfully!',
        'data':{
            'response':`deleted ${res.affectedRows} tutorials`
        }
      }
      result(null, data);
    });
};

module.exports = Music;
