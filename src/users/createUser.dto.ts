import { ValidationError } from "../errors";

export class CreateUserDto {
  username: string;
  age: number;
  hobbies: string[];

  static getCreateUserDto(input: string): CreateUserDto {
    let createUserDto: CreateUserDto;

    try {
      createUserDto = JSON.parse(input);
    } catch (err) {
      throw new ValidationError("Incorrect input data");
    }

    const { username, age, hobbies } = createUserDto;
    if (
      !username ||
      typeof username !== "string" ||
      typeof age !== "number" ||
      !Array.isArray(hobbies) ||
      hobbies.some((item) => typeof item !== "string")
    ) {
      throw new ValidationError("Incorrect input data");
    }

    return createUserDto;
  }
}
