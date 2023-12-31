const jwt = require('jsonwebtoken');
const dbConn = require('./../../config/db.config').promise();

exports.getUser = async (req,res,next) => {

    try{

        if(
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ){
            return res.status(422).json({
                message: "Please provide the token",
            });
        }

        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, 'the-super-strong-secrect');

        const [row] = await dbConn.execute(
           
            // "SELECT `InviteUserId`,`FirstName`,`LastName`,`Email`,`createdDate` ,`createdBy` FROM `users` WHERE `InviteUserId`=?",
            "SELECT `InviteUserId`,`FirstName`,`LastName`,`Email`,`createdDate` ,`createdBy` FROM `invite_users` WHERE `InviteUserId`=?",
            [decoded.InviteUserId]
        );

        if(row.length > 0){
            return res.json({
                user:row[0]
            });
        }

        res.json({
            message:"No user found"
        });
        
    }
    catch(err){
        next(err);
    }
}