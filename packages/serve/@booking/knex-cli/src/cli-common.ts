import { Debug } from "./debug-console";

export function arg(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index > -1 ? process.argv[index + 1] : undefined;
}

export function parseArgs(args: string[]): Record<string, string | undefined> {
  const result: Record<string, string | undefined> = {};
  Debug.Log(`==> Parsing args`);
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i] ;
    
    const match = arg?.match(/^--(\w+[-\w]*)=?(.*)$/);
    if (match) {
      const key = match[1] as string;
      const value = match[2] || args[i + 1];
      result[key] = value;

      Debug.Log(`   -> key: ${key}, value: ${value}`);
      
      // Skip next arg if it was used as value
      if (!match[2] && i + 1 < args.length && args[i + 1] && !args[i + 1]?.startsWith('--')) {
        i++;
      }
    }
  }
  
  return result;
}

