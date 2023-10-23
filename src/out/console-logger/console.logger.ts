import {StreamLoggerInterface} from "../../core/handlers/stream-logger.interface";

export class ConsoleLogger implements StreamLoggerInterface {
    private static logger: ConsoleLogger
    private constructor() {
    }


    public static getInstance(){
        if(!ConsoleLogger.logger){
            ConsoleLogger.logger = new ConsoleLogger()
        }
        return ConsoleLogger.logger
    }

    end(): void {
        console.log("Выполнение задачи окончено")
    }

    error(...args: any[]): void {
        console.log(`Error: ${args.join(":")}`)
    }

    log(...args: any[]): void {
        console.log(`Log: ${args.join(":")}`)
    }

}