export interface ConsulClient {
    hostname?: string;
    port?:number;
    proto?:string
    Token:string;
}

export function DefaultConfig():ConsulClient {
    let config: ConsulClient = {} as any
    config.hostname="localhost"
    config.port=8500
    config.proto="http"
    return config        
}