# Deno Consul Client API

This is unonfficially repository of [Consul by Hashicorp](https://www.consul.io/) client for Deno

Funcional
- KV Store
- Get Members Node
- Service Registration
- Get Service
- Support Consul Token

To Do: 
- TLS consul config
- etc


Feel Free to Contribute thank you

## Example 

### How to Import 

#### Latest version import
```
import { Consul, ConsulClient, ConsulKV, ClientDefaultConfig, ServiceConfig, ConsulService, Check } from "https://deno.land/x/consul/mod.ts"
```

#### Safe Import 
```
import { Consul, ConsulClient, ConsulKV, ClientDefaultConfig, ServiceConfig, ConsulService, Check } from "https://deno.land/x/consul@v0.0.2/mod.ts"
```

#### Client configuration
```
const consulConfig = <ConsulClient>{
    hostname : "localhost",
    port     : 8080,
}

const consul = new Consul(consulConfig);
```

#### Get Consul Value 
```
const consulConfig = <ConsulClient>{
    hostname : "localhost",
    port     : 8080,
}

const consul = new Consul(consulConfig);
await consul.getValue("foo").then((res:string)=>{
    console.log(res)
})
```
#### Set Key Value 
```
const consulConfig = <ConsulClient>{
    hostname : "localhost",
    port     : 8080,
}

const consul = new Consul(consulConfig);
var data = <ConsulKV>{
    Key: "foo",
    Value: "bar"
}
await consul.putKey(data).then((res:boolean)=>{
    console.log(res)
})
```

#### Register Service and Configuring HealthCheck

```
var check = <Check>{
    HTTP : "http://localhost:8080",
    Method: "GET",
    Interval: "10s",
    DeregisterCriticalServiceAfter: "5m"

}
var service = <ServiceConfig> {
    ID: "test",
    Name: "test-service",
    Port: 8080,
    Address: "127.0.0.1",
    Tags: ["Cuilan"],
    Check: check
}
const newservice= new ConsulService(service);
const consul = new Consul(ClientDefaultConfig());
await consul.registerService(newservice.serviceConf);
```


#### Get Consul Catalog 
```
await consul.getServiceCatalog().then((res)=>{
    console.log(res)
})
```
