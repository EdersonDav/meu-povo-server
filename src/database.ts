import { connect as mongooseConnect, connection } from "mongoose";

export const connect = async (): Promise<void> => {
  mongooseConnect(
    process.env.MONGO_URL || "",
    { dbName: process.env.DBNAME },
    (error) => {
      if (error) console.log(error);
      else console.log("DB connected");
    }
  );
};

export const close = (): Promise<void> => connection.close();
