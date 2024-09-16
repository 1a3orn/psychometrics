const getFailMsg = (key: string): string => `Environment variable ${key} is not set`;

/**
 * Given a key, return the value from
 * the environment variables
 * and throw an error if the key is not found
 */

export const getStrCfg = (key: string, defaultValue?: string, enums?: string[]): string => {
  const value = process.env[key] ?? defaultValue;

  if (!value) {
    //throw new Error(getFailMsg(key));
    return "";
  }

  if (enums && !enums.includes(value)) {
    throw new Error(`Env var ${key} is not one of the allowed values: ${enums.join(", ")}`);
  }

  return value;
};

/**
 * Given a key, return the value from
 * the environment variables
 * and throw an error if the key is not found
 * or the value is not a number
 */
export const getIntCfg = (key: string, defaultValue?: number): number => {
  const value = getStrCfg(key, defaultValue?.toString());

  const asInt = parseInt(value);
  if (isNaN(asInt)) throw new Error(`Env var ${key} is not a number`);

  return asInt;
};

/**
 * Given a key, return the value from
 * the environment variables
 * and throw an error if the key is not found
 * or the value is not a boolean
 */
export const getBoolCfg = (key: string, defaultValue?: boolean): boolean => {
  return getStrCfg(key, defaultValue?.toString()).toLowerCase() === "true";
};
