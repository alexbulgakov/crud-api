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
    const isUsernameValid = typeof username === "string";
    const isAgeValid = typeof age === "number";
    const areHobbiesValid =
      Array.isArray(hobbies) &&
      hobbies.every((item) => typeof item === "string");

    if (!username || !isUsernameValid || !isAgeValid || !areHobbiesValid) {
      throw new ValidationError("Incorrect input data");
    }

    return createUserDto;
  }
}
