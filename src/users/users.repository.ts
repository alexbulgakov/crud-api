import { EventEmitter } from "node:events";
import * as uuid from "uuid";
import cluster from "cluster";
import { User } from "./user.model";

const UNEXPECTED_ERROR = "Unexpected error, try again later";

export class UsersRepository extends EventEmitter {
  private readonly users: User[] = [];

  private async requestData(obj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const result = process.send(obj);
      if (!result) {
        reject(new Error(UNEXPECTED_ERROR));
      }
      this.once(obj.cmd, (msg) => {
        resolve(msg["data"]);
      });
    });
  }

  async create(input: Partial<User>): Promise<User> {
    if (cluster.isWorker) {
      const obj = {
        cmd: "create",
        data: [input],
      };

      return this.requestData(obj);
    }

    const user = Object.assign(new User(), { id: uuid.v4(), ...input });
    this.users.push(user);
    return user;
  }

  async find(): Promise<User[]> {
    if (cluster.isWorker) {
      const obj: any = {
        cmd: "find",
        data: [],
      };

      return this.requestData(obj);
    }

    return Promise.resolve(this.users);
  }

  async findOne(id: string): Promise<User> {
    if (cluster.isWorker) {
      const obj = {
        cmd: "findOne",
        data: [id],
      };
      return this.requestData(obj);
    }
    return Promise.resolve(this.users.find((item) => item.id === id));
  }
}
