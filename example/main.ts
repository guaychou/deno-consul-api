import { Consul, ConsulClient, ConsulKV, DefaultConfig, ServiceConfig, ConsulService, Check } from "https://raw.githubusercontent.com/guaychou/deno-consul-api/master/mod.ts"

const consulConfig = <ConsulClient>{
    hostname : "localhost",
    port     : 8080,
}
var data = <ConsulKV>{
    Key: "foo",
    Value: "bar"
}
var check = <Check>{}
var service = <ServiceConfig> {
    ID: "test",
    Name: "test-service",
    Port: 8080,
    Address: "127.0.0.1",
    Tags: ["Cuilan"],
    Check: check
}
const newservice= new ConsulService(service);
newservice.Check.HTTP="http://localhost:8080"
newservice.Check.Method="GET"
newservice.Check.Interval="10s"
newservice.Check.DeregisterCriticalServiceAfter="10m"

const consul = new Consul(DefaultConfig());
//await consul.registerService(newservice);

//await consul.getMember();
await consul.putKey(data).then((res:boolean)=>{
  console.log(res)
})

await consul.getValue("foo").then((res:string)=>{
    console.log(res)
})


await consul.getServiceCatalog().then((res)=>{
    console.log(res)
})
