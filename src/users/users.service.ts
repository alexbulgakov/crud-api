import * as uuid from "uuid";

import { NotFoundError, ValidationError } from "../errors";
import { CreateUserDto } from "./createUser.dto";
import { User } from "./user.model";
import { UsersRepository } from "./users.repository";

export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(input: CreateUserDto): Promise<User> {
    return await this.usersRepository.create(input);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }

    return user;
  }

  validateUserId(id: string) {
    if (!uuid.validate(id)) {
      throw new ValidationError("User id is not valid");
    }
  }
}
