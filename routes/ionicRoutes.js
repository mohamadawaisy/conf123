/**
 * Created by wael on 29/01/2017.
 */

var express= require('express')

var routes=function(){
    var ionicRouter = express.Router();
    var ionicController=require('../controllers/ionicController')();
    ionicRouter.route('/entity/:_id')
        .get(ionicController.getEntityById)
    ionicRouter.route('/entities')
        .get(ionicController.getEntities)
    ionicRouter.route('/categories')
        .get(ionicController.getCategories)
    return ionicRouter;

}
module.exports=routes;
