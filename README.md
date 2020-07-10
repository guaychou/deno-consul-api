# Deno Consul Client API

This is repo for deno consul client 

Funcional
- KV Store
- Get Members Node
- Service Registration


To Do: 
- Get Service
- TLS consul config
- etc


Feel Free to Contribute thank you

## Example 

Client configuration
```
const consulConfig = <ConsulClient>{
    hostname : "localhost",
    port     : 8080,
}

const consul = new Consul(consulConfig);
```

Get Consul Value 
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

Set Key Value 
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

Register Service and Configuring HealthCheck

```
var check = <Check>{}
var service = <ServiceConfig> {
    ID: "test",
    Name: "test-service",
    Port: 8080,
    Address: "127.0.0.1",
    Tags: ["Cuilan"],
}

const newservice= new ConsulService(service);
newservice.Check.HTTP="http://localhost:8080"
newservice.Check.Method="GET"
newservice.Check.Interval="10s"
newservice.Check.DeregisterCriticalServiceAfter="10m"
await consul.registerService(newservice);

```


Get Consul Catalog 
```
await consul.getServiceCatalog().then((res)=>{
    console.log(res)
})
```