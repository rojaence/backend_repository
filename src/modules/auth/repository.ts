import { IUser } from "../../interfaces/Auth.interface";
import fs from 'fs/promises'
import path from 'path'

const dataFilePath = path.join('src', 'data', 'users.json')

export default class AuthRepository {

  async readUsers(): Promise<IUser[] | Array<IUser>> {
    try {
      const data = await fs.readFile(dataFilePath, 'utf-8')
      return JSON.parse(data)
    } catch (error) {
      return []
    }
  }

  async writeUsers(users: IUser[]): Promise<void> {
    try {
      await fs.writeFile(dataFilePath, JSON.stringify(users, null, 2), { encoding: "utf-8" })
    } catch (error) {
      if (error instanceof Error) {
        console.log('Ha ocurrido un error al guardar los datos')
        console.log(error.message)
      }
    }
  }

  async createUser(user: IUser): Promise<IUser> {
    const users = await this.readUsers()
    users.push(user)
    await this.writeUsers(users)
    return user
  }

  async findByUserName(username: string) {
    const users = await this.readUsers()
    return users.find(u => u.username.toLocaleLowerCase() === username.toLocaleLowerCase())
  }

}