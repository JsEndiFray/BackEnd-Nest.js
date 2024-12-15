import {Column, DataType, Model, Table} from "sequelize-typescript";

@Table(
    {
        tableName: 'users', // Nombre de la tabla en la base de datos
        timestamps: true, // Agrega automáticamente `createdAt` y `updatedAt`
    }
)
export class User extends Model<User> {

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    lastname: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        validate:{ min: 18, max: 100}
    })
   age: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    phone: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    email: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.ENUM('admin', 'user', 'employee'), // Roles disponibles
        allowNull: false,
        defaultValue: 'user', // Rol por defecto
    })
    role: 'admin' | 'user' | 'employee'; // Define el tipo como unión de roles

}
