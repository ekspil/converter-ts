import {CommandExecutor} from "../../core/executor/command.executor";
import {ICommandExecFfmpeg, IFfmegInput} from "./ffmpeg.types";
import {ChildProcessWithoutNullStreams, spawn} from "child_process";
import {StreamLoggerInterface} from "../../core/handlers/stream-logger.interface";
import {FileService} from "../../core/files/file.service";
import {PromptService} from "../../core/prompt/prompt.service";
import {FfmpegBuilder} from "./ffmpeg.builder";
import {StreamHandler} from "../../core/handlers/stream.handler";

export class FfmpegExecutor extends CommandExecutor<IFfmegInput>{
    private fileService: FileService = new FileService()
    private promptService: PromptService = new PromptService()

    constructor(logger: StreamLoggerInterface) {
        super(logger);
    }

    protected build(input: IFfmegInput): ICommandExecFfmpeg {
        const output = this.fileService.getFilePath(input.path, input.name, 'mp4')
        const args = (new FfmpegBuilder(input.path))
            .setResolution({width:input.width, height: input.height})
            .setName("Blabla")
            .build()
        return {command: "ffmpeg", args, output}
    }

    protected processStream(stream: ChildProcessWithoutNullStreams, logger: StreamLoggerInterface): void {
        const handler = new StreamHandler(logger)
        handler.processOutput(stream)
    }

    protected async prompt(): Promise<IFfmegInput> {
        const width = await this.promptService.input<number>('Width', 'number')
        const height = await this.promptService.input<number>('Height', 'number')
        const path = await this.promptService.input<string>('Path', 'input')
        const name = await this.promptService.input<string>('Name', 'input')
        return {
            width,
            height,
            path,
            name
        }
    }

    protected spawn({args, command, output}: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
        this.fileService.deleteFileIfExists(output)
        return spawn(command, args)
    }

}