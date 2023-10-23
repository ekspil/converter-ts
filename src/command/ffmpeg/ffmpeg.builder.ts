import {IResolution} from "./ffmpeg.types";
import {ICommandExec} from "../../core/executor/command.types";

export class FfmpegBuilder {
    private command: string = 'ffmpeg'
    private args: Map<string, string> = new Map()

    constructor(public path: string) {
        this.args.set('-i', this.path)
        this.args.set('-c:v', 'libx264')
    }

    setResolution(data: IResolution): FfmpegBuilder {
        this.args.set('-s', `${data.width}x${data.height}`)
        return this
    }

    setName(name: string): FfmpegBuilder {
        this.args.set('', name)
        return this
    }

    build(): string[]{
        const buildString: string[] = []
        this.args.forEach((value, key) => {
            buildString.push(key, value)
        })
        return buildString
    }


}