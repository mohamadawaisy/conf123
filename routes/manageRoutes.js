/**
 * Created by wael on 29/01/2017.
 */

var express= require('express')

var routes=function(){
    var manageRouter = express.Router();
    var manageController=require('../controllers/manageController')();
    manageRouter.route('/categories')
        .post(manageController.postCategories)
        .get(manageController.getCategories)


    manageRouter.route('/categories/:name')
        .put(manageController.putCategoryByName)
        .delete(manageController.deleteCategoryByName)

    manageRouter.route('/entities')
        .post(manageController.postEntity)
        .get(manageController.getAllEntities)



    manageRouter.route('/entities/:_id')

        .get(manageController.getEntityById)


    manageRouter.route('/entity/:_id')
        .get(manageController.putEntity)
        .delete(manageController.deleteEntity)

    return manageRouter;

}
module.exports=routes;
