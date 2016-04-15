Injecorator
===================

A simple decorater based dependecy injection framework for nodejs es6 projects

## Installation

```bash
$ npm install injecorator --save
```

## Usage

usage requiring [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy)  with babel 6

```javascript
import {Inject, IocContainer } from 'injecorator';

const staticObject = { staticdep: true };

@Inject(staticObject)
class One
{
    constructor(staticOb){
        this.static = staticOb;
        this.isReallyOne = true;
    }
}

@Inject(staticObject, One)
class Two
{
    constructor(staticOb, oneCls){
        this.static = staticOb;
        this.one = oneCls;
        this.isReallyTwo = true;
    }    
}

const ioc = new IocContainer();
ioc.regAll(staticObject, One, Two);
const two = ioc.get(Two);
console.log(two);
```

Without using javascript decorators set a static property $inject on the object that contains an array of dependencies
```javascript
class Three
{
    constructor(two){
        this.two = two;
        this.isReallyThree = true;
    }     
}
Three.$inject = [Two];
```

Registering an extension or replacement depency
```javascript
const ioc = new IocContainer();
ioc.regAll(staticObject, Two);
ioc.register(One, { isReallyOne: false });
const two = ioc.get(Two);
expect(two.one.isReallyOne).to.be.equal(false);
```

Registering a factory method as a value provider. The argument passed to this method is an instance of the ioc container
```javascript
class OneDerived extends One
{
    constructor(staticOb){
        super(staticOb);
        this.isDerivedOne = true;
    }
}

const ioc = new IocContainer();
ioc.register(OneDerived);
ioc.register(One, (iocArg) => iocArg.get(OneDerived));

const one = ioc.get(One);
expect(one.isReallyOne && one.isDerivedOne).to.be.equal(true);
```
 
