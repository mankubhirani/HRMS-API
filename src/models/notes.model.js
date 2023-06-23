'user strict';
var dbConn = require('./../../config/db.config');

//Notes object create
var Notes = function (notes) {
   
    this.email = notes.email;
    this.add_notes = notes.add_notes;
   
    this.status         = notes.status
    this.created_at = new Date();
    this.updated_at = new Date();
    this.company_id = notes.company_id;
    this.empId = notes.empId;
   
   
};
// Notes.create = function (newNotes, result) {
//     let sql = "call hrms.sp_insert_notes(?,?,?,?,?,?)";
//     var values = Object.values(newNotes);
// console.log(values);
//     dbConn.query(sql,values, function (err, res) {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//           } else {
//             console.log("id", res);
//             result(null, res[0]);
//           }
//     });
// };



Notes.create = function (newNotes, result) {    
    dbConn.query("call hrms.sp_insert_notes(?,?,?,?,?,?)", 
    [   
        newNotes.email,
        newNotes.add_notes,
        newNotes.status,
        newNotes.created_at,
        newNotes.company_id, 
        newNotes.empId,
    ],

    function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res.insertId);
           
            
        }
    });  



};









Notes.findByCompanyId = function (email, company_id, result) {
    dbConn.query("call hrms.getbyemail_employeeNotes(?,?);", [email, company_id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};


Notes.findById = function (email, result) {
    dbConn.query("Select * from notes where email = ? ORDER BY created_at DESC", email, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
Notes.findAll = function (result) {
    dbConn.query("Select * from notes", function (err, res) {
        if (err) {
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
// Notes.update = function(id, note, result){
//   dbConn.query("UPDATE Notes SET add_notes=? WHERE id = ?", [note.add_notes,id], function (err, res) {
//         if(err) {
//             console.log("error: ", err);
//             result(null, err);
//         }else{   
//             result(null, res);
//         }
//     }); 
// };


Notes.update = function (id, note, result) {
    console.log("note", note);

    dbConn.query("call hrms.sp_update_notes_by_id(?,?,?,?,?,?)",
        [ 
            
            note.add_notes,       
            note.email,
        note.company_id,
        note.empId,
        new Date(),
        id

        ],
        function (err, res) {

            if (err) {

                console.log("error: ", err);

                result(null, err);

            } else {

                result(null, res);

            }

        })

}

Notes.delete = function (id, result) {
    dbConn.query("call hrms.delete_employeeNotes(?);", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};



module.exports = Notes;
