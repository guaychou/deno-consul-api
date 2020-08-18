export interface ServiceConfig {
    ID: string;
    Name: string;
    Port: number;
    Address: string;
    Tags: [string];
    Check: Check;
}

export interface Check {
    Name: string;
    ID: string;
    Interval: string;
    Notes: string;
    DeregisterCriticalServiceAfter: string;
    Shell: string;
    TCP: string;
    HTTP: string;
    Method: string;
    Header: string;
}

export class ConsulService {
    serviceConf: ServiceConfig;
    constructor(serviceConfig: ServiceConfig) {
        this.serviceConf=serviceConfig
    }
}
export interface CatalogService {
    [index: string]: string[];
}