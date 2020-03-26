import {Router} from 'express';
import userController from '../controllers/userController';
import passport from 'passport';
import permit from '../middlewares/permission';
import usercontroller from '../controllers/userController';

const router = Router();

/**
 * @api {get} /user Show all users
 * @apiPermission admin
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
 *     { message: "UsersNotFound", error }
 */
router.get(
  '/user',
  passport.authenticate('jwt', {session: false}),
  permit(['admin', 'support']),
  userController.getUsers,
);

/**
 * @api {get} /user/:email Show one users
 * @apiPermission admin
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {string} email  email of the user param header.
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
router.get(
  '/user/:email',
  passport.authenticate('jwt', {session: false}),
  permit(['admin', 'support']),
  userController.getUser,
);

/**
 * @api {put} /user/:email Update one user
 * @apiPermission admin
 * @apiName UpdateUser
 * @apiGroup User
 * 
 * @apiParam {string} email  email of the user param header.
 * @apiParam {String} name  name of the user.
 * @apiParam {String} lastname  lastname of the user.
 * @apiParam {String} email  email of the user.
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
 *    { message: "UserNotFound", error }
 */
router.put(
  '/user/:email',
  passport.authenticate('jwt', {session: false}),
  permit(['admin', 'support']),
  userController.updateUser,
);

/**
 * @api {delete} /user/:email Delete one users
 * @apiPermission admin
 * @apiName DeleteUser
 * @apiGroup User
 *
 * @apiParam {string} email  email of the user param header.
 *
 * @apiSuccess {String} id id of the user.
 * @apiSuccess {String} name  name of the user.
 * @apiSuccess {String} lastname  lastname of the user.
 * @apiSuccess {String} email  email of the user.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{
 *   "id": "5e6aa3a35c03174a701a675b",
 *   "name": "Juan Carlos",
 *   "lastname": "Cadavid",
 *   "email": "jucacar35@hotmail.com",
 *   "roles": [
 *       "admin",
 *       "customer",
 *       "support"
 *   ]
 *}
 *
 * @apiError UserNotFound validate email.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     { message: "DeleteUserNotFound", error }
 */
router.delete(
  '/user/:email',
  passport.authenticate('jwt', {session: false}),
  permit(['admin', 'support']),
  userController.deleteUser,
);

/**
 * @api {post} /user/signup signup user
 * @apiName signupUser
 * @apiGroup User
 * 
 * @apiParam {String} name  name of the user.
 * @apiParam {String} lastname  lastname of the user.
 * @apiParam {String} email  email of the user.
 * @apiParam {String} password  password of the user.

 * @apiSuccess {String} id id of the user.
 * @apiSuccess {String} name  name of the user.
 * @apiSuccess {String} lastname  lastname of the user.
 * @apiSuccess {String} email  email of the user.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "User created successfully",
 *     "user": {
 *         "user": {
 *             "name": "Juan prueba",
 *             "lastname": "prueba",
 *             "email": "prueba@hotmail.com",
 *             "roles": [
 *                 "customer"
 *             ],
 *             "id": "5e7bf96fd8156984985e7b26"
 *         }
 *     }
 * }
 *
 * @apiError UserNotFound Validate parameters.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *    { message: "Error", error }
 */
router.post('/user/signup', userController.signUp);

/**
 * @api {post} /user/signin signin user
 * @apiName signinUser
 * @apiGroup User
 *
 * @apiParam {string} email  email of the user param header.
 * @apiParam {String} password  password of the user.
 *
 * @apiSuccess {String} token token of the user.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZhYWI5ZWI0Y"
 *   }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *    {
 *   "msg": "Validate Credentials"
 *
 */
router.post('/user/signin', userController.signIn);

/**
 * @api {put} /user/:email Recover password of user
 * @apiName RecoverPassword
 * @apiGroup User
 *
 * @apiParam {string} email  email of the user param header.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * { message: 'Your password generated successfully and was sent to your email address' }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *    { message: "UserNotFound", error }
 */
router.put('/user/recoverpassword/:email', userController.recoverPassword);

/**
 * @api {put} /user/:email Update password of user
 * @apiName UpdatePassword
 * @apiGroup User
 *
 * @apiParam {string} email  email of the user param header.
 * @apiParam {String} password  Current password of the user.
 * @apiParam {String} password  New password of the user.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * { message: 'your pass was changed successfully' }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *    { message: "UserNotFound", error }
 */

router.put('/user/updatepassword/:email', usercontroller.changePassword);

export default router;
