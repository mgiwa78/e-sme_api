import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class SMEToken {
  static async toHash(SME_Token: string) {
    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptAsync(SME_Token, salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}`;
  }

  static async compare(storedToken: string, suppliedToken: string) {
    const [hashedToken, salt] = storedToken.split(".");
    const buf = (await scryptAsync(suppliedToken, salt, 64)) as Buffer;

    return buf.toString("hex") === hashedToken;
  }
}
