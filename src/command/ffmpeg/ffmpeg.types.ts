import {ICommandExec} from "../../core/executor/command.types";

export interface IResolution {
    width: number,
    height: number
}

export interface IFfmegInput extends IResolution{
    path: string,
    name: string
}

export interface ICommandExecFfmpeg extends ICommandExec {
    output: string
}