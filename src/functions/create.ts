import UserController from '../controller/UserController'
import { Context } from 'aws-lambda';

export default async (event: any, context: Context) => {
  try {
    const body = JSON.parse(event.body)
    const userController = new UserController()
    const user = await userController.create(body)

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'User created successfully',
          data: user,
        }
      )
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: 'failed to created user',
          error: err.message
        }
      )
    }
  }
};
