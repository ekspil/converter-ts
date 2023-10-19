import {StreamLoggerInterface} from "./stream-logger.interface";
import {ChildProcessWithoutNullStreams} from "child_process";

export class StreamHandler {
    constructor(private logger: StreamLoggerInterface) {}
    processOutput(stream: ChildProcessWithoutNullStreams){
        stream.stdout.on("data", (data: any) => {
            this.logger.log(data)
        })
        stream.stdout.on("error", (data: any) => {
            this.logger.error(data)
        })
        stream.stdout.on("close", (data: any) => {
            this.logger.end()
        })
    }
}