import supertest from "supertest";
import { User } from "../src/users/user.model";
import { app } from "../src";
import { UpdateUserDto } from "../src/users/updateUser.dto";
import { CreateUserDto } from "../src/users/createUser.dto";

const API = "/api/users";

describe("API tests", () => {
  const user = Object.assign(new User(), {
    username: "John Brown",
    age: 30,
    hobbies: ["nodejs", "ts"],
  });

  afterAll(async () => {
    await app.close();
  });

  test("return an empty array", async () => {
    const expected: any[] = [];

    const response = await supertest(app).get(API);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expected);
  });

  test("create a user", async () => {
    const expected = user;
    const createUserDto = Object.assign(new CreateUserDto(), user);

    const response = await supertest(app)
      .post(API)
      .send(JSON.stringify(createUserDto));

    expect(response.statusCode).toBe(201);
    expect(response.body.id).not.toBe("");

    user.id = response.body.id;
    expect(response.body).toEqual(expected);
  });

  test("update a user", async () => {
    const expected = user;

    user.username = "Alex Brown";
    user.hobbies = ["python"];

    const updateUserDto = Object.assign(new UpdateUserDto(), {
      username: "Alex Brown",
      age: 30,
      hobbies: ["python"],
    });

    const response = await supertest(app)
      .put(`${API}/${user.id}`)
      .send(JSON.stringify(updateUserDto));

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expected);
  });

  test("delete a user", async () => {
    const id = user.id;

    const response = await supertest(app).delete(`${API}/${id}`);

    expect(response.statusCode).toBe(204);
  });

  test("find no user", async () => {
    const id = user.id;
    const expected = {
      code: 404,
      message: `User with id ${id} not found`,
    };

    const response = await supertest(app).get(`${API}/${id}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).not.toBeUndefined;
    expect(response.body).toEqual(expected);
  });
});
