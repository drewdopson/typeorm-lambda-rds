import { Connection, ConnectionManager, ConnectionOptions, createConnection, getConnectionManager } from 'typeorm'
import User from '../entity/User'
export class Database {
    private connectionManager: ConnectionManager

    constructor() {
        this.connectionManager = getConnectionManager()
    }

    public async getConnection(): Promise<Connection> {
        const CONNECTION_NAME = `default`

        let connection: Connection

        if (this.connectionManager.has(CONNECTION_NAME)) {
            connection = await this.connectionManager.get(CONNECTION_NAME)

            if (!connection.isConnected) {
                connection = await connection.connect()
            }
        }
        else {
            const connectionOptions: ConnectionOptions = {
              "name": "default",
              "type": "postgres",
              "host":"",
              "port": 5432,
              "username": "postgres",
              "password": "",
              "database": "PeakEraser",
              "entities": [User],
              "logging": true,
              "synchronize": true,
            }
            
            connection = await createConnection(connectionOptions)
        }

        return connection
    }
}