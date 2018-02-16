/**
 * Created by wael on 29/01/2017.
 */

var express= require('express')

var routes=function(){
    var manageRouter = express.Router();
    var manageController=require('../controllers/manageController')();
   // manageRouter.route('/categories')
        //.post(manageController.postCategories)
        //.get(manageController.getCategories)
        //.put(manageController.putCategoryByName)

    manageRouter.route('/confession')
        .post(manageController.postConfession)
        .put(manageController.putConfession)

    //manageRouter.route('/categories/:name')
        //.put(manageController.putCategoryByName)
        //.delete(manageController.deleteCategoryByName)

    manageRouter.route('/getAllConfessions')
        .post(manageController.getAllConfessions)
        .get(manageController.getAllConfessions)



    //manageRouter.route('/entities/:_id')

        //.get(manageController.getEntityById)


    //manageRouter.route('/entity/:_id')
        //.put(manageController.putEntity)
        //.delete(manageController.deleteEntity)

    //manageRouter.route('/image')
        //.put(manageController.removeImage)
    return manageRouter;

}
module.exports=routes;
