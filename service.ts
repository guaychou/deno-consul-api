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

export class ConsulService implements ServiceConfig {
    ID: string;
    Name: string;
    Port: number;
    Address: string;
    Tags: [string];
    Check: Check;
    constructor(serviceConfig: ServiceConfig) {
        this.ID=serviceConfig.ID
        this.Name=serviceConfig.Name
        this.Port=serviceConfig.Port
        this.Address=serviceConfig.Address
        this.Tags=serviceConfig.Tags
        this.Check=serviceConfig.Check
        this.Check.Name=serviceConfig.Name
    }
}

export interface CatalogService {
    [index: string]: string[];
}