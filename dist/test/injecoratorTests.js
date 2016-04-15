'use strict';

var _dec, _class, _dec2, _class2;

var _injecorator = require('../injecorator');

var _chai = require('chai');

var chai = _interopRequireWildcard(_chai);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

let expect = chai.expect;
chai.config.includeStack = true;

const staticObject = { staticdep: true };

let One = (_dec = (0, _injecorator.Inject)(staticObject), _dec(_class = class One {
    constructor(staticOb) {
        this.static = staticOb;
        this.isReallyOne = true;
    }
}) || _class);
let OneDerived = class OneDerived extends One {
    constructor(staticOb) {
        super(staticOb);
        this.isDerivedOne = true;
    }
};
let Two = (_dec2 = (0, _injecorator.Inject)(staticObject, One), _dec2(_class2 = class Two {
    constructor(staticOb, oneCls) {
        this.static = staticOb;
        this.one = oneCls;
        this.isReallyTwo = true;
    }
}) || _class2);
let Three = class Three {
    constructor(two) {
        this.two = two;
        this.isReallyThree = true;
    }
};

Three.$inject = [Two];

describe('Injecorator default provider tests', () => {

    it('Should deep create dependencies', done => {
        const ioc = new _injecorator.IocContainer();
        ioc.regAll(staticObject, One, Two);
        const two = ioc.get(Two);
        expect(two.one.isReallyOne).to.be.ok;

        done();
    });

    it('Should allow substitution of one type for another that matches', done => {
        const ioc = new _injecorator.IocContainer();
        ioc.regAll(staticObject, Two);
        ioc.register(One, { isReallyOne: false });
        const two = ioc.get(Two);
        expect(two.one.isReallyOne).to.be.equal(false);

        done();
    });

    it('Should allow a factory method to be used as a value provider', done => {
        const ioc = new _injecorator.IocContainer();
        ioc.regAll(staticObject, Two, OneDerived);
        ioc.register(One, iocArg => iocArg.get(OneDerived));
        const two = ioc.get(Two);
        expect(two.one.isReallyOne && two.one.isDerivedOne).to.be.equal(true);
        expect(two.one.static).to.be.ok;
        done();
    });

    it('Should throw assertion error on duplicate registration', done => {
        const ioc = new _injecorator.IocContainer();
        ioc.register(One);
        expect(() => ioc.register(One, { isReallyOne: false })).to.throw(/already registered./);

        done();
    });

    it('Should allow replacing registration with a flag registration', done => {
        const ioc = new _injecorator.IocContainer();

        ioc.register(One);
        expect(ioc.get(One).isReallyOne).to.be.equal(true);

        ioc.register(One, { isReallyOne: false }, true);
        expect(ioc.get(One).isReallyOne).to.be.equal(false);

        done();
    });

    it('Should allow a factory function to be passed as value provider', done => {
        const ioc = new _injecorator.IocContainer();
        ioc.register(One, iocArg => {
            return { factoryCalled: true, iocArg };
        });
        let one = ioc.get(One);
        expect(one.factoryCalled).to.be.ok;
        expect(one.iocArg).to.equal(ioc);

        done();
    });

    it('Should return null on get for unregistered type', done => {
        const ioc = new _injecorator.IocContainer();
        let one = ioc.get(One);
        expect(one).to.be.null;

        done();
    });

    it('Should inject dependencies defined by static $type', done => {
        const ioc = new _injecorator.IocContainer();
        ioc.regAll(staticObject, One, Two, Three);
        let three = ioc.get(Three);
        expect(three.two).to.be.ok;

        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L2luamVjb3JhdG9yVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOztBQUNBOztJQUFZOzs7O0FBRVosSUFBSSxTQUFTLEtBQUssTUFBTDtBQUNiLEtBQUssTUFBTCxDQUFZLFlBQVosR0FBMkIsSUFBM0I7O0FBRUEsTUFBTSxlQUFlLEVBQUUsV0FBVyxJQUFYLEVBQWpCOztJQUdBLGNBREwseUJBQU8sWUFBUCxpQkFDRCxNQUFNLEdBQU4sQ0FDQTtBQUNJLGdCQUFZLFFBQVosRUFBcUI7QUFDakIsYUFBSyxNQUFMLEdBQWMsUUFBZCxDQURpQjtBQUVqQixhQUFLLFdBQUwsR0FBbUIsSUFBbkIsQ0FGaUI7S0FBckI7Q0FGSjtJQVFNLGFBQU4sTUFBTSxVQUFOLFNBQXlCLEdBQXpCLENBQ0E7QUFDSSxnQkFBWSxRQUFaLEVBQXFCO0FBQ2pCLGNBQU0sUUFBTixFQURpQjtBQUVqQixhQUFLLFlBQUwsR0FBb0IsSUFBcEIsQ0FGaUI7S0FBckI7Q0FGSjtJQVNNLGVBREwseUJBQU8sWUFBUCxFQUFxQixHQUFyQixtQkFDRCxNQUFNLEdBQU4sQ0FDQTtBQUNJLGdCQUFZLFFBQVosRUFBc0IsTUFBdEIsRUFBNkI7QUFDekIsYUFBSyxNQUFMLEdBQWMsUUFBZCxDQUR5QjtBQUV6QixhQUFLLEdBQUwsR0FBVyxNQUFYLENBRnlCO0FBR3pCLGFBQUssV0FBTCxHQUFtQixJQUFuQixDQUh5QjtLQUE3QjtDQUZKO0lBU00sUUFBTixNQUFNLEtBQU4sQ0FDQTtBQUNJLGdCQUFZLEdBQVosRUFBZ0I7QUFDWixhQUFLLEdBQUwsR0FBVyxHQUFYLENBRFk7QUFFWixhQUFLLGFBQUwsR0FBcUIsSUFBckIsQ0FGWTtLQUFoQjtDQUZKOztBQU9BLE1BQU0sT0FBTixHQUFnQixDQUFDLEdBQUQsQ0FBaEI7O0FBRUEsU0FBUyxvQ0FBVCxFQUErQyxNQUFNOztBQUVqRCxPQUFHLGlDQUFILEVBQXNDLFFBQVU7QUFDNUMsY0FBTSxNQUFNLCtCQUFOLENBRHNDO0FBRTVDLFlBQUksTUFBSixDQUFXLFlBQVgsRUFBeUIsR0FBekIsRUFBOEIsR0FBOUIsRUFGNEM7QUFHNUMsY0FBTSxNQUFNLElBQUksR0FBSixDQUFRLEdBQVIsQ0FBTixDQUhzQztBQUk1QyxlQUFPLElBQUksR0FBSixDQUFRLFdBQVIsQ0FBUCxDQUE0QixFQUE1QixDQUErQixFQUEvQixDQUFrQyxFQUFsQyxDQUo0Qzs7QUFNNUMsZUFONEM7S0FBVixDQUF0QyxDQUZpRDs7QUFXakQsT0FBRyxnRUFBSCxFQUFxRSxRQUFVO0FBQzNFLGNBQU0sTUFBTSwrQkFBTixDQURxRTtBQUUzRSxZQUFJLE1BQUosQ0FBVyxZQUFYLEVBQXlCLEdBQXpCLEVBRjJFO0FBRzNFLFlBQUksUUFBSixDQUFhLEdBQWIsRUFBa0IsRUFBRSxhQUFhLEtBQWIsRUFBcEIsRUFIMkU7QUFJM0UsY0FBTSxNQUFNLElBQUksR0FBSixDQUFRLEdBQVIsQ0FBTixDQUpxRTtBQUszRSxlQUFPLElBQUksR0FBSixDQUFRLFdBQVIsQ0FBUCxDQUE0QixFQUE1QixDQUErQixFQUEvQixDQUFrQyxLQUFsQyxDQUF3QyxLQUF4QyxFQUwyRTs7QUFPM0UsZUFQMkU7S0FBVixDQUFyRSxDQVhpRDs7QUFxQmpELE9BQUcsOERBQUgsRUFBbUUsUUFBVTtBQUN6RSxjQUFNLE1BQU0sK0JBQU4sQ0FEbUU7QUFFekUsWUFBSSxNQUFKLENBQVcsWUFBWCxFQUF5QixHQUF6QixFQUE4QixVQUE5QixFQUZ5RTtBQUd6RSxZQUFJLFFBQUosQ0FBYSxHQUFiLEVBQWtCLFVBQVksT0FBTyxHQUFQLENBQVcsVUFBWCxDQUFaLENBQWxCLENBSHlFO0FBSXpFLGNBQU0sTUFBTSxJQUFJLEdBQUosQ0FBUSxHQUFSLENBQU4sQ0FKbUU7QUFLekUsZUFBTyxJQUFJLEdBQUosQ0FBUSxXQUFSLElBQXVCLElBQUksR0FBSixDQUFRLFlBQVIsQ0FBOUIsQ0FBb0QsRUFBcEQsQ0FBdUQsRUFBdkQsQ0FBMEQsS0FBMUQsQ0FBZ0UsSUFBaEUsRUFMeUU7QUFNekUsZUFBTyxJQUFJLEdBQUosQ0FBUSxNQUFSLENBQVAsQ0FBdUIsRUFBdkIsQ0FBMEIsRUFBMUIsQ0FBNkIsRUFBN0IsQ0FOeUU7QUFPekUsZUFQeUU7S0FBVixDQUFuRSxDQXJCaUQ7O0FBK0JqRCxPQUFHLHdEQUFILEVBQTZELFFBQVU7QUFDbkUsY0FBTSxNQUFNLCtCQUFOLENBRDZEO0FBRW5FLFlBQUksUUFBSixDQUFhLEdBQWIsRUFGbUU7QUFHbkUsZUFBTyxNQUFNLElBQUksUUFBSixDQUFhLEdBQWIsRUFBa0IsRUFBRSxhQUFhLEtBQWIsRUFBcEIsQ0FBTixDQUFQLENBQXdELEVBQXhELENBQTJELEtBQTNELENBQWlFLHFCQUFqRSxFQUhtRTs7QUFLbkUsZUFMbUU7S0FBVixDQUE3RCxDQS9CaUQ7O0FBdUNqRCxPQUFHLDhEQUFILEVBQW1FLFFBQVU7QUFDekUsY0FBTSxNQUFNLCtCQUFOLENBRG1FOztBQUd6RSxZQUFJLFFBQUosQ0FBYSxHQUFiLEVBSHlFO0FBSXpFLGVBQU8sSUFBSSxHQUFKLENBQVEsR0FBUixFQUFhLFdBQWIsQ0FBUCxDQUFpQyxFQUFqQyxDQUFvQyxFQUFwQyxDQUF1QyxLQUF2QyxDQUE2QyxJQUE3QyxFQUp5RTs7QUFNekUsWUFBSSxRQUFKLENBQWEsR0FBYixFQUFrQixFQUFFLGFBQWEsS0FBYixFQUFwQixFQUEwQyxJQUExQyxFQU55RTtBQU96RSxlQUFPLElBQUksR0FBSixDQUFRLEdBQVIsRUFBYSxXQUFiLENBQVAsQ0FBaUMsRUFBakMsQ0FBb0MsRUFBcEMsQ0FBdUMsS0FBdkMsQ0FBNkMsS0FBN0MsRUFQeUU7O0FBU3pFLGVBVHlFO0tBQVYsQ0FBbkUsQ0F2Q2lEOztBQW1EakQsT0FBRyxnRUFBSCxFQUFxRSxRQUFVO0FBQzNFLGNBQU0sTUFBTSwrQkFBTixDQURxRTtBQUUzRSxZQUFJLFFBQUosQ0FBYSxHQUFiLEVBQWtCLFVBQVk7QUFBRSxtQkFBTyxFQUFFLGVBQWUsSUFBZixFQUFxQixNQUF2QixFQUFQLENBQUY7U0FBWixDQUFsQixDQUYyRTtBQUczRSxZQUFJLE1BQU0sSUFBSSxHQUFKLENBQVEsR0FBUixDQUFOLENBSHVFO0FBSTNFLGVBQU8sSUFBSSxhQUFKLENBQVAsQ0FBMEIsRUFBMUIsQ0FBNkIsRUFBN0IsQ0FBZ0MsRUFBaEMsQ0FKMkU7QUFLM0UsZUFBTyxJQUFJLE1BQUosQ0FBUCxDQUFtQixFQUFuQixDQUFzQixLQUF0QixDQUE0QixHQUE1QixFQUwyRTs7QUFPM0UsZUFQMkU7S0FBVixDQUFyRSxDQW5EaUQ7O0FBNkRqRCxPQUFHLGlEQUFILEVBQXNELFFBQVU7QUFDNUQsY0FBTSxNQUFNLCtCQUFOLENBRHNEO0FBRTVELFlBQUksTUFBTSxJQUFJLEdBQUosQ0FBUSxHQUFSLENBQU4sQ0FGd0Q7QUFHNUQsZUFBTyxHQUFQLEVBQVksRUFBWixDQUFlLEVBQWYsQ0FBa0IsSUFBbEIsQ0FINEQ7O0FBSzVELGVBTDREO0tBQVYsQ0FBdEQsQ0E3RGlEOztBQXFFakQsT0FBRyxvREFBSCxFQUF5RCxRQUFVO0FBQy9ELGNBQU0sTUFBTSwrQkFBTixDQUR5RDtBQUUvRCxZQUFJLE1BQUosQ0FBVyxZQUFYLEVBQXlCLEdBQXpCLEVBQThCLEdBQTlCLEVBQW1DLEtBQW5DLEVBRitEO0FBRy9ELFlBQUksUUFBUSxJQUFJLEdBQUosQ0FBUSxLQUFSLENBQVIsQ0FIMkQ7QUFJL0QsZUFBTyxNQUFNLEdBQU4sQ0FBUCxDQUFrQixFQUFsQixDQUFxQixFQUFyQixDQUF3QixFQUF4QixDQUorRDs7QUFNL0QsZUFOK0Q7S0FBVixDQUF6RCxDQXJFaUQ7Q0FBTixDQUEvQyIsImZpbGUiOiJpbmplY29yYXRvclRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIElvY0NvbnRhaW5lciB9IGZyb20gJy4uL2luamVjb3JhdG9yJztcbmltcG9ydCAqIGFzIGNoYWkgZnJvbSAnY2hhaSc7XG5cbmxldCBleHBlY3QgPSBjaGFpLmV4cGVjdDtcbmNoYWkuY29uZmlnLmluY2x1ZGVTdGFjayA9IHRydWU7XG5cbmNvbnN0IHN0YXRpY09iamVjdCA9IHsgc3RhdGljZGVwOiB0cnVlIH07XG5cbkBJbmplY3Qoc3RhdGljT2JqZWN0KVxuY2xhc3MgT25lXG57XG4gICAgY29uc3RydWN0b3Ioc3RhdGljT2Ipe1xuICAgICAgICB0aGlzLnN0YXRpYyA9IHN0YXRpY09iO1xuICAgICAgICB0aGlzLmlzUmVhbGx5T25lID0gdHJ1ZTtcbiAgICB9XG59XG5cbmNsYXNzIE9uZURlcml2ZWQgZXh0ZW5kcyBPbmVcbntcbiAgICBjb25zdHJ1Y3RvcihzdGF0aWNPYil7XG4gICAgICAgIHN1cGVyKHN0YXRpY09iKTtcbiAgICAgICAgdGhpcy5pc0Rlcml2ZWRPbmUgPSB0cnVlO1xuICAgIH1cbn1cblxuQEluamVjdChzdGF0aWNPYmplY3QsIE9uZSlcbmNsYXNzIFR3b1xue1xuICAgIGNvbnN0cnVjdG9yKHN0YXRpY09iLCBvbmVDbHMpe1xuICAgICAgICB0aGlzLnN0YXRpYyA9IHN0YXRpY09iO1xuICAgICAgICB0aGlzLm9uZSA9IG9uZUNscztcbiAgICAgICAgdGhpcy5pc1JlYWxseVR3byA9IHRydWU7XG4gICAgfSAgICBcbn1cblxuY2xhc3MgVGhyZWVcbntcbiAgICBjb25zdHJ1Y3Rvcih0d28pe1xuICAgICAgICB0aGlzLnR3byA9IHR3bztcbiAgICAgICAgdGhpcy5pc1JlYWxseVRocmVlID0gdHJ1ZTtcbiAgICB9ICAgICBcbn1cblRocmVlLiRpbmplY3QgPSBbVHdvXTtcblxuZGVzY3JpYmUoJ0luamVjb3JhdG9yIGRlZmF1bHQgcHJvdmlkZXIgdGVzdHMnLCAoKSA9PiB7XG4gICAgXG4gICAgaXQoJ1Nob3VsZCBkZWVwIGNyZWF0ZSBkZXBlbmRlbmNpZXMnLCAoZG9uZSkgPT4ge1xuICAgICAgICBjb25zdCBpb2MgPSBuZXcgSW9jQ29udGFpbmVyKCk7XG4gICAgICAgIGlvYy5yZWdBbGwoc3RhdGljT2JqZWN0LCBPbmUsIFR3byk7XG4gICAgICAgIGNvbnN0IHR3byA9IGlvYy5nZXQoVHdvKTtcbiAgICAgICAgZXhwZWN0KHR3by5vbmUuaXNSZWFsbHlPbmUpLnRvLmJlLm9rO1xuICAgICAgICBcbiAgICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICAgIFxuICAgIGl0KCdTaG91bGQgYWxsb3cgc3Vic3RpdHV0aW9uIG9mIG9uZSB0eXBlIGZvciBhbm90aGVyIHRoYXQgbWF0Y2hlcycsIChkb25lKSA9PiB7XG4gICAgICAgIGNvbnN0IGlvYyA9IG5ldyBJb2NDb250YWluZXIoKTtcbiAgICAgICAgaW9jLnJlZ0FsbChzdGF0aWNPYmplY3QsIFR3byk7XG4gICAgICAgIGlvYy5yZWdpc3RlcihPbmUsIHsgaXNSZWFsbHlPbmU6IGZhbHNlIH0pO1xuICAgICAgICBjb25zdCB0d28gPSBpb2MuZ2V0KFR3byk7XG4gICAgICAgIGV4cGVjdCh0d28ub25lLmlzUmVhbGx5T25lKS50by5iZS5lcXVhbChmYWxzZSk7XG4gICAgICAgIFxuICAgICAgICBkb25lKCk7XG4gICAgfSk7XG4gICAgXG4gICAgaXQoJ1Nob3VsZCBhbGxvdyBhIGZhY3RvcnkgbWV0aG9kIHRvIGJlIHVzZWQgYXMgYSB2YWx1ZSBwcm92aWRlcicsIChkb25lKSA9PiB7XG4gICAgICAgIGNvbnN0IGlvYyA9IG5ldyBJb2NDb250YWluZXIoKTtcbiAgICAgICAgaW9jLnJlZ0FsbChzdGF0aWNPYmplY3QsIFR3bywgT25lRGVyaXZlZCk7XG4gICAgICAgIGlvYy5yZWdpc3RlcihPbmUsIChpb2NBcmcpID0+IGlvY0FyZy5nZXQoT25lRGVyaXZlZCkpO1xuICAgICAgICBjb25zdCB0d28gPSBpb2MuZ2V0KFR3byk7XG4gICAgICAgIGV4cGVjdCh0d28ub25lLmlzUmVhbGx5T25lICYmIHR3by5vbmUuaXNEZXJpdmVkT25lKS50by5iZS5lcXVhbCh0cnVlKTtcbiAgICAgICAgZXhwZWN0KHR3by5vbmUuc3RhdGljKS50by5iZS5vaztcbiAgICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICAgIFxuICAgIGl0KCdTaG91bGQgdGhyb3cgYXNzZXJ0aW9uIGVycm9yIG9uIGR1cGxpY2F0ZSByZWdpc3RyYXRpb24nLCAoZG9uZSkgPT4ge1xuICAgICAgICBjb25zdCBpb2MgPSBuZXcgSW9jQ29udGFpbmVyKCk7XG4gICAgICAgIGlvYy5yZWdpc3RlcihPbmUpO1xuICAgICAgICBleHBlY3QoKCkgPT4gaW9jLnJlZ2lzdGVyKE9uZSwgeyBpc1JlYWxseU9uZTogZmFsc2UgfSkpLnRvLnRocm93KC9hbHJlYWR5IHJlZ2lzdGVyZWQuLyk7XG4gICAgICAgIFxuICAgICAgICBkb25lKCk7XG4gICAgfSk7XG4gICAgXG4gICAgaXQoJ1Nob3VsZCBhbGxvdyByZXBsYWNpbmcgcmVnaXN0cmF0aW9uIHdpdGggYSBmbGFnIHJlZ2lzdHJhdGlvbicsIChkb25lKSA9PiB7XG4gICAgICAgIGNvbnN0IGlvYyA9IG5ldyBJb2NDb250YWluZXIoKTtcbiAgICAgICAgXG4gICAgICAgIGlvYy5yZWdpc3RlcihPbmUpO1xuICAgICAgICBleHBlY3QoaW9jLmdldChPbmUpLmlzUmVhbGx5T25lKS50by5iZS5lcXVhbCh0cnVlKTtcbiAgICAgICAgXG4gICAgICAgIGlvYy5yZWdpc3RlcihPbmUsIHsgaXNSZWFsbHlPbmU6IGZhbHNlIH0sIHRydWUpO1xuICAgICAgICBleHBlY3QoaW9jLmdldChPbmUpLmlzUmVhbGx5T25lKS50by5iZS5lcXVhbChmYWxzZSk7XG4gICAgICAgIFxuICAgICAgICBkb25lKCk7XG4gICAgfSk7XG4gICAgXG4gICAgaXQoJ1Nob3VsZCBhbGxvdyBhIGZhY3RvcnkgZnVuY3Rpb24gdG8gYmUgcGFzc2VkIGFzIHZhbHVlIHByb3ZpZGVyJywgKGRvbmUpID0+IHtcbiAgICAgICAgY29uc3QgaW9jID0gbmV3IElvY0NvbnRhaW5lcigpO1xuICAgICAgICBpb2MucmVnaXN0ZXIoT25lLCAoaW9jQXJnKSA9PiB7IHJldHVybiB7IGZhY3RvcnlDYWxsZWQ6IHRydWUsIGlvY0FyZyB9OyB9KTtcbiAgICAgICAgbGV0IG9uZSA9IGlvYy5nZXQoT25lKTtcbiAgICAgICAgZXhwZWN0KG9uZS5mYWN0b3J5Q2FsbGVkKS50by5iZS5vaztcbiAgICAgICAgZXhwZWN0KG9uZS5pb2NBcmcpLnRvLmVxdWFsKGlvYyk7XG4gICAgICAgIFxuICAgICAgICBkb25lKCk7XG4gICAgfSk7XG4gICAgXG4gICAgaXQoJ1Nob3VsZCByZXR1cm4gbnVsbCBvbiBnZXQgZm9yIHVucmVnaXN0ZXJlZCB0eXBlJywgKGRvbmUpID0+IHtcbiAgICAgICAgY29uc3QgaW9jID0gbmV3IElvY0NvbnRhaW5lcigpO1xuICAgICAgICBsZXQgb25lID0gaW9jLmdldChPbmUpO1xuICAgICAgICBleHBlY3Qob25lKS50by5iZS5udWxsO1xuICAgICAgICBcbiAgICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICAgIFxuICAgIGl0KCdTaG91bGQgaW5qZWN0IGRlcGVuZGVuY2llcyBkZWZpbmVkIGJ5IHN0YXRpYyAkdHlwZScsIChkb25lKSA9PiB7XG4gICAgICAgIGNvbnN0IGlvYyA9IG5ldyBJb2NDb250YWluZXIoKTtcbiAgICAgICAgaW9jLnJlZ0FsbChzdGF0aWNPYmplY3QsIE9uZSwgVHdvLCBUaHJlZSk7XG4gICAgICAgIGxldCB0aHJlZSA9IGlvYy5nZXQoVGhyZWUpO1xuICAgICAgICBleHBlY3QodGhyZWUudHdvKS50by5iZS5vaztcbiAgICAgICAgXG4gICAgICAgIGRvbmUoKTtcbiAgICB9KTtcbn0pOyJdfQ==