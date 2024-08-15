import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({
    type: 'INTEGER',
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: 'VARCHAR',
    allowNull: false,
  })
  email: string;

  @Column({
    type: 'VARCHAR',
    allowNull: false,
  })
  password: string;

  @Column({
    type: 'INTEGER',
    allowNull: false,
  })
  role: number;
}
