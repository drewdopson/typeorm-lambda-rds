import { Database } from "../connection/connection"
import User from '../entity/User'

export default class UserController {
  db: any
  constructor(){
  }

  async dbConnect (){
    const database = new Database()
    console.log('CONNECTING TO DB')
    const connect = await database.getConnection()
    this.db = connect.getRepository(User)
    console.log('DB CONNECTED!!')

  }

  create (data: any){
    return new Promise(async (resolve, reject) => {
      if(!this.db) {
        await this.dbConnect()
      }
      let user: any = this.db.create()
      user.firstName = data.firstName,
      user.lastName = data.lastName,
      user.phoneNumber = data.phoneNumber

      await this.db.save(user)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  get (filter: any){
    return new Promise(async (resolve, reject)=> {
      if(!this.db) {
        await this.dbConnect()
      }
      await this.db.find(filter)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }
    

  update (filter: any, data: any){
    return new Promise(async (resolve, reject)=> {
      if(!this.db) {
        await this.dbConnect()
      }
      let updates: any = this.db.create()
      updates.firstName = data.firstName,
      updates.lastName = data.lastName
      await this.db.update(filter, updates)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  remove (filter: any){
    return new Promise(async (resolve, reject)=> {
      if(!this.db) {
        await this.dbConnect()
      }
      if(Object.keys(filter).length === 0) {
        const users = await this.db.find()
        filter = users.map(u => u.userId)
      }
      console.log(filter)
      await this.db.delete(filter)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }
}