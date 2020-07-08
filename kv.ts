export interface ConsulKV {
    Key: string;
    Value: string;
}
export interface ConsulKVArray{
    [index: number]: ConsulKV;
}