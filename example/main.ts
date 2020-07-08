import { Consul, ConsulClient, ConsulKV, DefaultConfig} from "../mod.ts"

const consulConfig = <ConsulClient>{
    hostname : "localhost",
    port     : 8080,
}
var data = <ConsulKV>{
    Key: "foo",
    Value: "bar"
}
const consul = new Consul(consulConfig);
//const consul = new Consul(DefaultConfig())
await consul.getMember();
await consul.putKey(data)
let result = await consul.getValue("foo")
console.log(result)