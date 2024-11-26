import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({ // Конфиг для подключения к БД
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "cryptDB",
    synchronize: false,
    logging: false,
    entities: ['src/entity/*.ts'],
    migrations: ['src/migrations/*.ts'],
    subscribers: [],
})
