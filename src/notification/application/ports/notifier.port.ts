export interface NotifierPort {
    execute(datas: {message: string}): Promise<boolean>
}