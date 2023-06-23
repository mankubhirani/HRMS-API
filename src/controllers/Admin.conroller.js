const admin = require('../models/Admin.model');

exports.findAll = function(req, res) {
    admin.findAll(function(err, admin) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', admin);
    res.send(admin[0]);
  });
};



// exports.delete = function(req, res) {
//     AddWorkingDay.delete( req.params.id, function(err, employee) {
//     if (err)
//     res.send(err);
//     res.json({ error:false, message: 'AddWorkingDay successfully deleted' });
//   });
// };