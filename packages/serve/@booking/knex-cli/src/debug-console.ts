export class Debug {
    static Log(message: string) {
        console.log(`[LOG]: ${message}`);
    }

    static Error(message: string) {
        console.log(`[ERROR]: ${message}`);
    }
}