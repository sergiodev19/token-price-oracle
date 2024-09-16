import bcrypt from 'bcryptjs';

/**
 * Generates a hashed version of the provided password.
 * @param password - The plain text password to be hashed.
 * @returns A promise that resolves to the hashed password.
 */
export const generatePasswordHash = async (password: string): Promise<string> => {
  // Determine the number of salt rounds from environment variable or default to 10
  const rounds = process.env.BCRYPT_SALT_ROUNDS ? Number(process.env.BCRYPT_SALT_ROUNDS) : 10;
  // Generate a salt with the specified number of rounds
  const salt = await bcrypt.genSalt(rounds);
  // Hash the password with the generated salt
  return bcrypt.hashSync(password, salt);
};

/**
 * Compares a plain text password with a hashed password to check if they match.
 * @param password - The plain text password to compare.
 * @param hash - The hashed password to compare against.
 * @returns A promise that resolves to a boolean indicating if the passwords match.
 */
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  // Compare the plain text password with the hashed password
  return await bcrypt.compare(password, hash);
};
