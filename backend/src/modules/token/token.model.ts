import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../user/user.model'; 

@Table({ tableName: 'tokens' })
export class Token extends Model<Token> {
  @Column({
    type: 'INTEGER',
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: 'INTEGER',
    allowNull: false,
  })
  userId: number;

  @Column({
    type: 'VARCHAR(255)',
    allowNull: false,
  })
  refreshToken: string;

  @Column({
    type: 'VARCHAR(255)',
    allowNull: false,
  })
  accessToken: string;

  @BelongsTo(() => User)
  user: User;
}
