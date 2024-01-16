import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../sequelize.databases';
class Login extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public emailRecovery!: string;
  public resetToken!: string;
  public resetTokenExpiry!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
Login.init(
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
      unique: false,
    },
    emailRecovery: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    resetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
      unique: false,
    },
  },
  {
    timestamps: true,
    sequelize,
    paranoid: true,
    modelName: 'login',
    tableName: 'login',
  },
);

export { Login };
