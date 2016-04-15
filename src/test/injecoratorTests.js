import {Inject, IocContainer } from '../injecorator';
import * as chai from 'chai';

let expect = chai.expect;
chai.config.includeStack = true;

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

describe('Injecorator default provider tests', () => {
    
    it('Should deep create dependencies', (done) => {
        const ioc = new IocContainer();
        ioc.regAll(staticObject, One, Two);
        const two = ioc.get(Two);
        expect(two.one.isReallyOne).to.be.ok;
        
        done();
    });
    
    it('Should allow substitution of one type for another that matches', (done) => {
        const ioc = new IocContainer();
        ioc.regAll(staticObject, Two);
        ioc.register(One, { isReallyOne: false });
        const two = ioc.get(Two);
        expect(two.one.isReallyOne).to.be.equal(false);
        
        done();
    });
    
    it('Should throw assertion error on duplicate registration', (done) => {
        const ioc = new IocContainer();
        ioc.register(One);
        expect(() => ioc.register(One, { isReallyOne: false })).to.throw(/already registered./);
        
        done();
    });
    
    it('Should allow replacing registration with a flag registration', (done) => {
        const ioc = new IocContainer();
        
        ioc.register(One);
        expect(ioc.get(One).isReallyOne).to.be.equal(true);
        
        ioc.register(One, { isReallyOne: false }, true);
        expect(ioc.get(One).isReallyOne).to.be.equal(false);
        
        done();
    });
    
    it('Should allow a factory function to be passed as value provider', (done) => {
        const ioc = new IocContainer();
        ioc.register(One, (iocArg) => { return { factoryCalled: true, iocArg }; });
        let one = ioc.get(One);
        expect(one.factoryCalled).to.be.ok;
        expect(one.iocArg).to.equal(ioc);
        
        done();
    });
    
    it('Should return null on get for unregistered type', (done) => {
        const ioc = new IocContainer();
        let one = ioc.get(One);
        expect(one).to.be.null;
        
        done();
    });
});