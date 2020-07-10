import {ConsulClient} from "./client.ts"
import {ConsulKV, ConsulKVArray} from "./kv.ts"
import {ServiceConfig, CatalogService} from "./service.ts"

export class Consul{
    hostname: string;
    port: number;
    proto: string;
    token: string;
    address: string;

    constructor(consulAddress: ConsulClient){
        this.hostname=consulAddress.hostname || "localhost";
        this.proto=consulAddress.proto || "http";
        this.port=consulAddress.port || 8500;
        this.token=consulAddress.Token;
        this.address=this.setAddress()
    }
    setAddress(){
        return this.proto+"://"+this.hostname+":"+this.port
    }
    getAddress(){
        return this.address
    }
    
    async getMember(){
        try {
            const response = await fetch(this.address+"/v1/agent/members", {
                method: 'GET',
                headers: {
                    'X-Consul-Token': this.token,
                } 
            });
            if (response.body !== null) {
                const body = new Uint8Array(await response.arrayBuffer());
                var asString = new TextDecoder("utf-8").decode(body);
                var asJSON = JSON.parse(asString); 
                console.log(asJSON[0].Name)
                
            }
        }catch(e){
            throw(e)
        }
  }
  
  async putKey(data: ConsulKV):Promise<boolean>{
      try {
        const response = await fetch(this.address+"/v1/kv/"+data.Key,{
            method: 'PUT',
            body: data.Value,
            headers: {
                'X-Consul-Token': this.token,
            } 
        });
        if (response.body !== null) {
            const body = new Uint8Array(await response.arrayBuffer());
            var bodyString = new TextDecoder("utf-8").decode(body);
            return JSON.parse(bodyString)
        }
      }catch(e){
        throw(e)
      }
      return false
  }
  async getValue(data: string) :Promise <string>{
      try {
        const response = await fetch(this.address+"/v1/kv/"+data,{
            method: 'GET',
            headers: {
                'X-Consul-Token': this.token,
            } 
        });
        if (response.body !== null) {
            const body = new Uint8Array(await response.arrayBuffer());
            var bodyString = new TextDecoder("utf-8").decode(body);
            let data: ConsulKVArray = JSON.parse(bodyString)
            return atob(data[0].Value)
        }
      }catch(e){
        throw(e)
      }
      return ""
  }

  async registerService(service: ServiceConfig){
    try{
        const response = await fetch(this.address+"/v1/agent/service/register?replace-existing-checks=true",{
            method: 'PUT',
            headers: {
                'X-Consul-Token': this.token,
            },
            body: JSON.stringify(service)            
        });
        if (response.ok){
            if (response.body!=null) {
                const body = new Uint8Array(await response.arrayBuffer());
                var bodyString = new TextDecoder("utf-8").decode(body);
                console.log(bodyString)
            }
        }
        console.log(JSON.stringify(service))
    }catch(e){
        throw(e)
    }
  }

  async getServiceCatalog():Promise <CatalogService>{
      let bodyjson: CatalogService = {}
      try {
          const response = await fetch(this.address+"/v1/catalog/services",{
              method:'GET',
              headers: {
                'X-Consul-Token': this.token,
              }
            });
            if (response.ok){
                if (response.body!=null){
                    const body = new Uint8Array(await response.arrayBuffer());
                    var bodyString = new TextDecoder("utf-8").decode(body);
                    bodyjson = JSON.parse(bodyString)
                    return bodyjson
                }
            }
          }catch(e){
            throw (e)
          }
           return bodyjson
      }
      
  }