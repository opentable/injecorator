import { default as assert } from 'assert';
export function Inject(...params){
    return function(target){
        target.$inject = params;
    };
}

//TODO move injecorator to own package

class Lazy
{
    constructor(factory){
        this.val = null;
        this.factory = factory;
    }
    get instance(){
        if(!this.val)
            this.val = this.factory();
        return this.val;
    }
}

export class IocContainer {
    constructor(){
        this.registry = [];
    }

    regAll(...types){
        types.forEach((t) => this.register(t));
    }

    register(type, provider, allowReplace){
        assert(type != null);

        var entry = this.registry.findIndex((e) => e.type === type);
        if(entry >= 0){
            assert(allowReplace, `provider for type ${type.name || type} already registered. specify allowReplace or fix duplicate registration`);
            this.registry.splice(entry, 1);
        }
        var prov = null;

        if(!provider)
            prov = () => this.create(type);
        else if(typeof provider === 'function')
            prov = () => provider(this);
        else
            prov = () => provider;

        this.registry.push({type: type, lazy: new Lazy(prov)});

    }

    get(type){
        var entry = this.registry.find((e) => e.type === type);
        if(!entry){
            return null;
        }
        return entry.lazy.instance;
    }

    create(type){
        var params = [];
        if(type.$inject){
            params = type.$inject.map((e) => this.get(e));
        }
        if(typeof type === 'function')
            return new type(...params);
        type.$params = params;    
        return type;
    }
}

export let AppIocContainer = new IocContainer();
