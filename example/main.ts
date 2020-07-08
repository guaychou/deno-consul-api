import { Consul, ConsulClient, ConsulKV } from "../mod.ts"

const consulConfig = <ConsulClient>{
    hostname : "localhost",
    port     : 8080,
}
var data = <ConsulKV>{
    Key: "foo",
    Value: "bar"
}
const consul = new Consul(consulConfig);
await consul.getMember();
await consul.putKey(data)
let result = await consul.getValue("foo")
console.log(result)