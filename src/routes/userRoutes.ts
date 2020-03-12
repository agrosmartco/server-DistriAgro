import { Router } from "express"
import userController from "../controllers/userController"
import passport from "passport"
import permit from "../middlewares/permission"


const router = Router();

/**
 * @api {get} /user Show all users
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiSuccess {String} id id of the user.
 * @apiSuccess {String} name  name of the user.
 * @apiSuccess {String} lastname  lastname of the user.
 * @apiSuccess {String} email  email of the user.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
        "id": "5e69157f10972e52447829d2",
        "name": "Juan Carlos",
        "lastname": "Cadavid",
        "email": "jucacar33@hotmail.com"
    }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     { message: "UserNotFound", error }
 */
router.get('/user',passport.authenticate('jwt', { session: false }),permit(["admin","customer"]) ,userController.getUsers);
router.post('/user/signup', userController.signUp);
router.post('/user/signin', userController.signIn);

export default router;