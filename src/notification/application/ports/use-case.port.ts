export interface UseCasePort<input, output>{
    execute(input: input): Promise<output>
}