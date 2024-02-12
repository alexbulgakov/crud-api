import * as uuid from "uuid";

import { NotFoundError, ValidationError } from "../errors";
import { CreateUserDto } from "./createUser.dto";
import { User } from "./user.model";
import { UsersRepository } from "./users.repository";
import { UpdateUserDto } from "./updateUser.dto";

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

  async update(id: string, input: UpdateUserDto): Promise<User> {
    await this.findOne(id);
    const result = this.usersRepository.update(id, input);
    return result;
  }

  async remove(id: string): Promise<User> {
    await this.findOne(id);
    return this.usersRepository.remove(id);
  }

  validateUserId(id: string) {
    if (!uuid.validate(id)) {
      throw new ValidationError(`User id ${id} is not valid`);
    }
  }
}
