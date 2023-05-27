import { Pool, QueryResult } from "pg";
import dotenv from 'dotenv';
dotenv.config();
const connectionString = process.env.PG_URI || '';
// elephantsql database
const pool = new Pool({ connectionString });

export const db = {
  query: async (queryStr: string, values?: unknown[]): Promise<QueryResult<any>> => {
    console.log('executed query', queryStr);
    console.log('here is the password --->', process.env.PG_PSWD)
    
    try {
      const result = await pool.query(queryStr, values);
      return result;
    } catch (error) {
      console.error('Error in db query:', error)
      throw error;
    }
  }
};












