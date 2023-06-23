const Project = require('../models/project.model');

exports.create = function (req, res) {
    const new_project = new Project(req.body);
     //console.log(req.body)
    const repository = req.body.repository;
    const team = req.body.team_member;
    // console.log(req.body.team)

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
         
        Project.create(new_project,repository,team,function (err, project) {
           // console.log("new_project",new_project);
            // if (err)
            //     res.send(err);
            // res.json({ error: false, message: "Projects added successfully!", data: project });
            if (err)
            res.send(err);
            if (project === "already exist")
            res.json({ error: false, message:"This Project name already exist with this email!", data: project });
            else
            res.json({ error: false, message: "Projects added successfully!", data: project });
        });
    }
};

exports.delete = function (req, res) {
    Project.delete(req.params.id, function (err, project) {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'Projects successfully deleted' });
    });
};


// exports.update = function(req, res) {
//     if(req.body.constructor === Object && Object.keys(req.body).length === 0){
//         res.status(400).send({ error:true, message: 'Please provide all required field' });
//     }else{
//         Project.update(req.params.id, new Project(req.body), function(err, project) {
//             if (err)
//             res.send(err);
//             res.json({ project: project,error:false, message: 'Project successfully updated' });
//         });
//     }
  
// };


exports.update = function (req, res) {
    const new_project = new Project(req.body);
    const repository = req.body.repository;
    const team = req.body.team_member;
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
        // console.log("if",req.body)
    } else {
        // console.log("else",req.body)

        Project.update(req.body.project_name, new_project, repository,team, function (err) {
            if (err)
                res.send(err);
            res.json({ error: false, message: 'Projects successfully updated' });
            
        });
    }
};


exports.findAll = function (req, res) {
    Project.findAll(function (err, project) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', project);
        res.send(project);
    });
};

// exports.findById = function(req, res) {
//     Project.findById(req.params.id, function(err, project) {
//         if (err)
//         res.send(err);
//         res.json(project);
//     });
// };

// exports.findById = function(req, res) {
//     Project.findById(req.params.project_name, function(err, project) {
//         if (err)
//         res.send(err);
//         res.json(project);
//     });
// };

exports.findBySearch = function(req, res) {
    Project.findBySearch(req.body, function(err, project) {
        if (err)
        res.send(err);
        res.json(project);
    });
};

exports.findProjectsById = function(req, res) {
    Project.findProjectsById(req.params.id, function(err, project) {
        if (err)
        res.send(err);
        res.json(project);
    });
};
exports.findRepositoryById = function(req, res) {
    Project.findRepositoryById(req.params.project_id, function(err, repository) {
        if (err)
        res.send(err);
        res.json(repository);
    });
};
exports.findTeamMemberById = function(req, res) {
    Project.findTeamMemberById(req.params.project_id, function(err, team_member) {
        if (err)
        res.send(err);
        res.json(team_member);
    });
};

exports.findByMultiSearch = function(req, res) {
    Project.findByMultiSearch(req.body, function(err, project) {
        if (err)
        res.send(err);
        res.json(project);
    });
};
