export interface StreamLoggerInterface {
    log(...args: any[]): void
    end(): void
    error(...args: any[]): void
}