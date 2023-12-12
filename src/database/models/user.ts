import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public emailRecovery!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    emailRecovery: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize,
    paranoid: true,
    modelName: 'user',
  },
);
export { User };
