import {Request, Response} from 'express';
import {getRepository, getCustomRepository} from 'typeorm';
import {User} from '../entities/mg/User';
import {UserRepository} from '../repositories/userRepository';
import {UserCredentials} from '../entities/mg/User-Credentials';
import validator from '../services/validator';
import {hashPassword, comparePassword} from '../services/hash.password.bcrypt';
import jwtauth from '../services/jwt-auth';
import mailer from '../services/mailer';

class userController {
  public async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await getCustomRepository(
        UserRepository,
        process.env.CONNECTION_MG,
      ).find();

      return res.json(users);
    } catch (error) {
      return res.status(500).json({message: 'GetUsers Not Found', error});
    }
  }

  public async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const email = req.params.email;

      const user = (await getCustomRepository(
        UserRepository,
        process.env.CONNECTION_MG,
      ).findByEmail(email)) as User;
      return res.json(user);
    } catch (error) {
      return res.status(404).json({message: 'UserNotFound', error});
    }
  }

  public async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const email = req.params.email;
      const user = (await getCustomRepository(
        UserRepository,
        process.env.CONNECTION_MG,
      ).findByEmail(email)) as User;

      if (user) {
        getCustomRepository(UserRepository, process.env.CONNECTION_MG).merge(
          user,
          req.body,
        );

        const result = await getCustomRepository(
          UserRepository,
          process.env.CONNECTION_MG,
        ).save(user);
        return res.json(result);
      }

      return res.status(404).json({message: 'Not user found'});
    } catch (error) {
      return res.status(404).json({message: 'UpdateUserNotFound', error});
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const email = req.params.email;

      const user = (await getCustomRepository(
        UserRepository,
        process.env.CONNECTION_MG,
      ).findByEmail(email)) as User;
      const Credentials = await getRepository(
        UserCredentials,
        process.env.CONNECTION_MG,
      ).find({userId: user.id});

      if (user) {
        const result = (await getCustomRepository(
          UserRepository,
          process.env.CONNECTION_MG,
        ).remove(user)) as User;
        await getRepository(UserCredentials, process.env.CONNECTION_MG).remove(
          Credentials,
        );

        if (result) {
          return res.json({
            message:
              'The user ' + user.name + ' ' + user.lastname + ' was deleted ',
            data: {result},
          });
        }

        return res.status(404).json({message: 'Not user was deleted'});
      }

      return res.status(404).json({message: 'Not user found'});
    } catch (error) {
      return res.status(404).json({message: 'DeleteUserNotFound', error});
    }
  }

  public async signUp(req: Request, res: Response): Promise<Response> {
    try {
      const validateCredentials = await validator.validateCredentials(
        req.body.email,
        req.body.password,
      );

      if (validateCredentials) {
        return res.status(400).json({message: validateCredentials});
      }

      const user = new User();
      user.name = req.body.name;
      user.lastname = req.body.lastname;
      user.email = req.body.email;
      user.roles = ['customer'];
      await getCustomRepository(UserRepository, process.env.CONNECTION_MG).save(
        user,
      );

      const userCredentials = new UserCredentials();
      userCredentials.password = req.body.password;
      userCredentials.userId = user.id;
      await getRepository(UserCredentials, process.env.CONNECTION_MG).save(
        userCredentials,
      );

      return res.json({message: 'User created successfully', user: {user}});
    } catch (error) {
      return res.status(404).json({message: 'Error', error});
    }
  }

  public async signIn(req: Request, res: Response): Promise<Response> {
    try {
      const providedEmail = req.body.email;
      const providedPass = req.body.password;
      const validateCredentials = await comparePassword(
        providedPass,
        providedEmail,
      );

      if (!validateCredentials) {
        return res.status(404).json({message: 'Validate Credentials'});
      }

      const token = await jwtauth.createToken(validateCredentials);

      return res.json({token: token});
    } catch (error) {
      return res.status(404).json({message: 'Error', error});
    }
  }

  public async recoverPassword(req: Request, res: Response): Promise<Response> {
    try {
      const email = req.params.email;
      const user = (await getCustomRepository(
        UserRepository,
        process.env.CONNECTION_MG,
      ).findByEmail(email)) as User;

      const newCredentials = new UserCredentials();
      newCredentials.password = await hashPassword(
        Math.random().toString(36).slice(-8),
        10,
      );
      newCredentials.userId = user.id;
      const currentCredentials = (await getRepository(
        UserCredentials,
        process.env.CONNECTION_MG,
      ).findOne({userId: user.id})) as UserCredentials;

      if (user) {
        getRepository(UserCredentials, process.env.CONNECTION_MG).merge(
          currentCredentials,
          newCredentials,
        );

        await getRepository(UserCredentials, process.env.CONNECTION_MG).save(
          currentCredentials,
        );

        await mailer.sendEmail(newCredentials.password, user.email);

        return res.json({
          message:
            'Your password generated successfully and was sent to your email address',
        });
      }

      return res.status(404).json({message: 'Not user found'});
    } catch (error) {
      return res.status(404).json({message: 'UpdateUserNotFound', error});
    }
  }

  public async changePassword(req: Request, res: Response): Promise<Response> {
    try {
      const email = req.params.email;
      const oldPassword = req.body.oldPassword;
      const newPassword = req.body.newPassword;

      const user: User | any = await getCustomRepository(
        UserRepository,
        process.env.CONNECTION_MG,
      ).findByEmail(email);

      if (!user) {
        return res.status(404).json({message: 'Not user found'});
      }

      const comparedPassword = await comparePassword(oldPassword, user.email);

      if (!comparedPassword) {
        return res.status(404).json({message: 'Invalid Password'});
      }

      const newCredentials = new UserCredentials();
      newCredentials.password = newPassword;
      newCredentials.userId = user.id;

      const currentCredentials = (await getRepository(
        UserCredentials,
        process.env.CONNECTION_MG,
      ).findOne({userId: user.id})) as UserCredentials;

      getRepository(UserCredentials, process.env.CONNECTION_MG).merge(
        currentCredentials,
        newCredentials,
      );

      await getRepository(UserCredentials, process.env.CONNECTION_MG).save(
        currentCredentials,
      );

      return res.json({message: 'your pass was changed successfully'});
    } catch (error) {
      return res.status(404).json({message: 'UpdateUserNotFound', error});
    }
  }
}

const usercontroller = new userController();
export default usercontroller;
