import UserController from '../controller/UserController'
import { Context } from 'aws-lambda'

export default async (event: any, context: Context) => {
  try {
    const userId: string = (event.queryStringParameters) ? event.queryStringParameters.userId : false
    const phoneNumber: string = (event.queryStringParameters) ? event.queryStringParameters.phoneNumber : false
    
    let filter: any = {}
    userId && (filter.userId = userId)
    phoneNumber && (filter.phoneNumber = phoneNumber)

    const body = JSON.parse(event.body)
    const userController = new UserController()
    const user = await userController.update(filter, body)

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'User updated successfully',
          data: user,
        }
      ),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: 'failed to update user',
          error: err.message
        }
      )
    }
  }
}
  