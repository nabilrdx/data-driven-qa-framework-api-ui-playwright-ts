// src/config/environment.ts
import * as dotenv from 'dotenv';
import * as path from 'path';

// 1. Read the environment from the terminal execution string (e.g., ENV=uat)
// If nothing is provided, it falls back to 'qa'
const targetEnv = process.env.ENV || 'qa';

// 2. Resolve the path to the matching file (e.g., ../../.env.uat)
const envFilePath = path.resolve(__dirname, `../../.env.${targetEnv}`);

// 3. Load the variables into Node's process.env context
dotenv.config({ path: envFilePath });

console.log(`RUNNING AUTOMATION ON ENVIRONMENT: [${targetEnv.toUpperCase()}]`);

export class Env {
  /**
   * Fetches an environment string or throws an error if it doesn't exist
   */
  static get(key: string, defaultValue?: string): string {
    const value = process.env[key] || defaultValue;
    if (value === undefined) {
      throw new Error(`Configuration Error: '${key}' missing in .env.${targetEnv}`);
    }
    return value;
  }

  /**
   * Fetches a configuration number (like timeouts)
   */
  static getNumber(key: string, defaultValue: number): number {
    const value = process.env[key];
    return value ? parseInt(value, 10) : defaultValue;
  }
}