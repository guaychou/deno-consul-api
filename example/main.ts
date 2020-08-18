import { Consul, ConsulClient, ConsulKV, ClientDefaultConfig, ServiceConfig, ConsulService, Check } from "../mod.ts"

const consulConfig = <ConsulClient>{
    hostname : "localhost",
    port     : 8080,
}
var data = <ConsulKV>{
    Key: "foo",
    Value: "testing"
}
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
await consul.getMember();
await consul.putKey(data).then((res:boolean)=>{
  console.log(res)
})

await consul.getValue("foo").then((res:string)=>{
    console.log(res)
})

await consul.getServiceCatalog().then((res)=>{
    console.log(res)
})
