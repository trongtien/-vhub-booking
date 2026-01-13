import { parse } from 'node:path'

export const getCwdRoot = (): string => {
    const cwd = process.cwd()
    const parsedCwd = parse(cwd)
    return parsedCwd.root
}