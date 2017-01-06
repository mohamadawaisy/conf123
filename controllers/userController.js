/**
 * Created by wael on 01/01/2017.
 */

var userController=function(){

var post= function(req,res)
{
    res.status(200).send({"message":"working"});
}



return {
    post:post
}
}

module.exports = userController;

