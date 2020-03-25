import bcrypt from 'bcrypt';
import {getCustomRepository, getRepository} from 'typeorm';
import {UserRepository} from '../repositories/userRepository';
import {UserCredentials} from '../entities/mg/User-Credentials';
import {User} from '../entities/mg/User';

export async function hashPassword(
  password: string,
  rounds: number,
): Promise<string> {
  const salt = await bcrypt.genSalt(rounds);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(
  providedPass: string,
  email: string,
): Promise<any> {
  var validateEmail: User | any = await getCustomRepository(
    UserRepository,
    process.env.CONNECTION_MG,
  ).findByEmail(email);

  if (!validateEmail) {
    return false;
  }

  var currentPass: any = await getRepository(
    UserCredentials,
    process.env.CONNECTION_MG,
  ).findOne({userId: validateEmail.id});

  if (!currentPass) {
    return false;
  }

  const passwordIsMatched = await bcrypt.compare(
    providedPass,
    currentPass.password,
  );

  if (!passwordIsMatched) {
    return false;
  }

  return validateEmail;
}
