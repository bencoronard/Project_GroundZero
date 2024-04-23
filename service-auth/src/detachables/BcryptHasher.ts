import bcrypt from 'bcrypt';
import { Hasher } from '../entities/Hasher';

export class BcryptHasher implements Hasher {
  private saltRounds: number;

  constructor(saltRounds: number) {
    this.saltRounds = saltRounds;
  }

  async hash(plainText: string): Promise<string> {
    try {
      return await bcrypt.hash(plainText, this.saltRounds);
    } catch (error) {
      throw error;
    }
  }
  async compare(cipherText1: string, cipherText2: string): Promise<boolean> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }
}
