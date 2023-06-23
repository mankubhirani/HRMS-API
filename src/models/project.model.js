const { log } = require('async');
var dbConn = require('./../../config/db.config');

//Employee object create
var Project = function (project) {
    //     this.company_id = project.company_id;
    this.project_name = project.project_name;
    this.project_owner = project.project_owner;
    this.project_owner_email = project.project_owner_email;
    this.status = project.status;
    this.project_start_date = project.project_start_date;
    this.project_end_date = project.project_end_date;
    this.same_projects_date = project.same_projects_date 
    this.project_actual_start_date = project.project_actual_start_date;
    this.project_actual_end_date = project.project_actual_end_date;
    this.client_name = project.client_name;
    this.client_poc1 = project.client_poc1;
    this.client_email_id = project.client_email_id;
    this.client_mo = project.client_mo;
    this.created_at = new Date();
    this.updated_at = new Date();
};

Project.create = function (newProject, repository, team, result) {
    let repositoryValues = [];
    let teamValues = [];

    //console.log("newProject",newProject);
    for (let i = 0; i < repository.length; i++) {
        repositoryValues.push([
            newProject.project_name,
            // newProject.company_id,
            repository[i].repository_type,
            repository[i].new_repository,
            repository[i].remark,
        ])
    }
    //console.log("repositoryValues",repositoryValues);

    for (let i = 0; i < team.length; i++) {
        teamValues.push([
            newProject.project_name,
            // newProject.company_id,
            team[i].team_member,
            team[i].roll_name,
            team[i].from_date,
            team[i].to_date,
            team[i].remark1,
        ])
    }

    // console.log("teamValues",teamValues);
    dbConn.query("Select * from projects where project_owner_email=?",
        [newProject.project_owner_email], function (err, res) {

            if (err || res.length > 0) {
                console.log("error: ", err);
                const msg = "already exist"
                result(err, msg);
            }
            else {
                dbConn.query("INSERT INTO projects SET ?", newProject, function (err, res) {
                    if (err)
                        throw err;
                    console.log("Projects records inserted: " + res.affectedRows);
                    const projectId = res.insertId;

                    dbConn.query("INSERT INTO repository (project_id, project_name, repository_type, new_repository, remark) VALUES ?", [repositoryValues.map(values => [projectId, ...values])], function (err, res) {
                        if (err)
                            throw err;
                        console.log("Repository records inserted: " + res.affectedRows);

                        dbConn.query("INSERT INTO team_member (project_id, project_name, team_member, roll_name, from_date, to_date, remark1) VALUES ?", [teamValues.map(values => [projectId, ...values])], function (err, res) {
                            if (err)
                                throw err;
                            console.log("Team Member records inserted: " + res.affectedRows);

                            result(null, projectId);
                        });
                    });
                });
            }
        });
};




Project.delete = function (id, result) {

    dbConn.query("DELETE FROM projects WHERE id = ?", [id],
        function (err, res) {
            if (err)
                throw err;
            console.log("projects of records deleted: " + res.affectedRows);
            dbConn.query("DELETE FROM repository WHERE project_id = ?", [id],
                function (err, res) {
                    if (err) throw err;
                    console.log("repository of records deleted: " + res.affectedRows);

                });
            dbConn.query("DELETE FROM team_member WHERE project_id = ?", [id],
                function (err, res) {
                    if (err) throw err;
                    console.log("team_member of records deleted: " + res.affectedRows);

                });
            result(null, res);
        });

};



// Project.update = function (id, project, result) {
//     dbConn.query
//         ("UPDATE projects SET project_name=?,project_owner=?,project_owner_email=?,status=?,client_name=?,client_poc1=?,client_poc2=?, cliente_email_id=? WHERE id= ?",
//             [project.project_name, project.project_owner, project.project_owner_email, project.status, project.client_name, project.client_poc1, project.client_poc2, project.cliente_email_id,id],
//             function (err, res) {
//                 if (err) {
//                     console.log("error: ", err);
//                     result(null, err);
//                 } else {
//                     result(null, res);
//                 }
//             });
// };



Project.update = function (project_name, project, repository,team, result) {
    let repositoryValues = [];
    let teamValues=[];


    for (let i = 0; i < repository.length; i++) {
        repositoryValues.push([
            // newProject.employee_id,
            // project_name.project_name,
            repository[i].repository_type,
            repository[i].new_repository,
            repository[i].remark,
        ])
    }
    for (let i = 0; i < team.length; i++) {
        teamValues.push([
            //  project_name.project_name,
            team[i].team_member,
            team[i].roll_name,
            team[i].from_date,
            team[i].to_date,
            team[i].remark1,
        ])
    }

    dbConn.query("UPDATE projects SET project_name=?,project_owner=?,project_owner_email=?,status=?,client_name=?,client_poc1=?,cliente_email_id=?,client_mo=? WHERE project_name= ?", [project.project_name, project.project_owner, project.project_owner_email, project.status, project.client_name, project.client_poc1,project.cliente_email_id,project.client_mo,project_name],
        function (err, res) {
            if (err)
                throw err;
            console.log("project of records updated: " + res.affectedRows);

            for (let i = 0; i < repository.length; i++) {
                dbConn.query("UPDATE repository SET repository_type=?, new_repository=?, remark=? where project_name=?", [repository[i].repository_type, repository[i].new_repository, repository[i].remark, project_name],
                    function (err, res) {
                        if (err) throw err;
                        console.log("repository of records inserted: " + res.affectedRows);
                    });
            }

            for (let i = 0; i < team.length; i++) {
                dbConn.query("UPDATE team_member SET team_member=?, roll_name=?,from_date=?, to_date=?, remark1=? where project_name=?", [team[i].team_member,team[i].roll_name,team[i].from_date, team[i].to_date, team[i].remark1, project_name],
                    function (err, res) {
                        if (err) throw err;
                        console.log("team_member of records inserted: " + res.affectedRows);
                    });
            }
            result(null, res.insertId);
        });

};

Project.findAll = function (result) {
    dbConn.query("Select * from projects", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('project : ', res);
            result(null, res);
        }
    });
};


Project.findBySearch = function (params, result) {
    let project_name = params.project_name;
    let project_owner = params.project_owner;
    let status = params.status;
    var sql = 'SELECT * FROM projects WHERE project_name = ? AND project_owner = ? AND status = ?';
    dbConn.query(sql, [project_name, project_owner, status], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Project.findByMultiSearch = function (params, result) {
    let project_name  = params.project_name;
    let project_owner = params.project_owner;
    let status = params.status;
    var sql = 'SELECT * FROM projects WHERE project_name = ? OR project_owner = ? OR status = ? ';
    dbConn.query(sql, [project_name, project_owner, status], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

// Project.findById = function (id, result) {
//     dbConn.query("Select * from projects where id = ? ", id, 

//     function (err, res) {             
//         if(err) {
//             console.log("error: ", err);
//             result(err, null);
//         }
//         else{
//             result(null, res);
//         }
//     });   
// };


// Project.findById = function (project_name, result) {
//     dbConn.query("SELECT * FROM projects inner join repository on projects.project_name = repository.project_name inner join team_member on projects.project_name = team_member.project_name where projects.project_name = ? ", project_name,

//         function (err, res) {
//             if (err) {
//                 console.log("error: ", err);
//                 result(err, null);
//             }
//             else {
//                 result(null, res);
//             }
//         });
// };



// Project.findAll = function (result) {

//     dbConn.query("Select * from projects",
//         function (err, res) {
//             if (err)
//                 throw err;

//             dbConn.query("Select * from repository",
//                 function (err, res) {
//                     if (err) throw err;
//                     // console.log("repository of records deleted: " + res.affectedRows);

//                 });
//             result(null, res);
//         });
// };


Project.findProjectsById = function (id, result) {
    dbConn.query("Select * from projects where id = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Project.findRepositoryById = function (id, result) {
    dbConn.query("Select * from repository where project_id = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Project.findTeamMemberById = function (id, result) {
    dbConn.query("Select * from team_member where project_id = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

module.exports = Project;
