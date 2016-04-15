'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AppIocContainer = exports.IocContainer = undefined;
exports.Inject = Inject;

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function Inject() {
    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
    }

    return function (target) {
        target.$inject = params;
    };
}

//TODO move injecorator to own package

let Lazy = class Lazy {
    constructor(factory) {
        this.val = null;
        this.factory = factory;
    }
    get instance() {
        if (!this.val) this.val = this.factory();
        return this.val;
    }
};
let IocContainer = exports.IocContainer = class IocContainer {
    constructor() {
        this.registry = [];
    }

    regAll() {
        for (var _len2 = arguments.length, types = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            types[_key2] = arguments[_key2];
        }

        types.forEach(t => this.register(t));
    }

    register(type, provider, allowReplace) {
        (0, _assert2.default)(type != null);

        var entry = this.registry.findIndex(e => e.type === type);
        if (entry >= 0) {
            (0, _assert2.default)(allowReplace, `provider for type ${ type.name || type } already registered. specify allowReplace or fix duplicate registration`);
            this.registry.splice(entry, 1);
        }
        var prov = null;

        if (!provider) prov = () => this.create(type);else if (typeof provider === 'function') prov = () => provider(this);else prov = () => provider;

        this.registry.push({ type: type, lazy: new Lazy(prov) });
    }

    get(type) {
        var entry = this.registry.find(e => e.type === type);
        if (!entry) {
            return null;
        }
        return entry.lazy.instance;
    }

    create(type) {
        var params = [];
        if (type.$inject) {
            params = type.$inject.map(e => this.get(e));
        }
        if (typeof type === 'function') return new (Function.prototype.bind.apply(type, [null].concat(_toConsumableArray(params))))();
        type.$params = params;
        return type;
    }
};
let AppIocContainer = exports.AppIocContainer = new IocContainer();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmplY29yYXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7UUFDZ0I7O0FBRGhCOzs7Ozs7OztBQUNPLFNBQVMsTUFBVCxHQUEwQjtzQ0FBUDs7S0FBTzs7QUFDN0IsV0FBTyxVQUFTLE1BQVQsRUFBZ0I7QUFDbkIsZUFBTyxPQUFQLEdBQWlCLE1BQWpCLENBRG1CO0tBQWhCLENBRHNCO0NBQTFCOzs7O0lBUUQsT0FBTixNQUFNLElBQU4sQ0FDQTtBQUNJLGdCQUFZLE9BQVosRUFBb0I7QUFDaEIsYUFBSyxHQUFMLEdBQVcsSUFBWCxDQURnQjtBQUVoQixhQUFLLE9BQUwsR0FBZSxPQUFmLENBRmdCO0tBQXBCO0FBSUEsUUFBSSxRQUFKLEdBQWM7QUFDVixZQUFHLENBQUMsS0FBSyxHQUFMLEVBQ0EsS0FBSyxHQUFMLEdBQVcsS0FBSyxPQUFMLEVBQVgsQ0FESjtBQUVBLGVBQU8sS0FBSyxHQUFMLENBSEc7S0FBZDtDQU5KO0lBYWEsc0NBQU4sTUFBTSxZQUFOLENBQW1CO0FBQ3RCLGtCQUFhO0FBQ1QsYUFBSyxRQUFMLEdBQWdCLEVBQWhCLENBRFM7S0FBYjs7QUFJQSxhQUFnQjsyQ0FBTjs7U0FBTTs7QUFDWixjQUFNLE9BQU4sQ0FBYyxLQUFPLEtBQUssUUFBTCxDQUFjLENBQWQsQ0FBUCxDQUFkLENBRFk7S0FBaEI7O0FBSUEsYUFBUyxJQUFULEVBQWUsUUFBZixFQUF5QixZQUF6QixFQUFzQztBQUNsQyw4QkFBTyxRQUFRLElBQVIsQ0FBUCxDQURrQzs7QUFHbEMsWUFBSSxRQUFRLEtBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsS0FBTyxFQUFFLElBQUYsS0FBVyxJQUFYLENBQXZDLENBSDhCO0FBSWxDLFlBQUcsU0FBUyxDQUFULEVBQVc7QUFDVixrQ0FBTyxZQUFQLEVBQXFCLENBQUMsa0JBQUQsR0FBcUIsS0FBSyxJQUFMLElBQWEsSUFBYixFQUFrQix1RUFBdkMsQ0FBckIsRUFEVTtBQUVWLGlCQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLEtBQXJCLEVBQTRCLENBQTVCLEVBRlU7U0FBZDtBQUlBLFlBQUksT0FBTyxJQUFQLENBUjhCOztBQVVsQyxZQUFHLENBQUMsUUFBRCxFQUNDLE9BQU8sTUFBTSxLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQU4sQ0FEWCxLQUVLLElBQUcsT0FBTyxRQUFQLEtBQW9CLFVBQXBCLEVBQ0osT0FBTyxNQUFNLFNBQVMsSUFBVCxDQUFOLENBRE4sS0FHRCxPQUFPLE1BQU0sUUFBTixDQUhOOztBQUtMLGFBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsRUFBQyxNQUFNLElBQU4sRUFBWSxNQUFNLElBQUksSUFBSixDQUFTLElBQVQsQ0FBTixFQUFoQyxFQWpCa0M7S0FBdEM7O0FBcUJBLFFBQUksSUFBSixFQUFTO0FBQ0wsWUFBSSxRQUFRLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsS0FBTyxFQUFFLElBQUYsS0FBVyxJQUFYLENBQWxDLENBREM7QUFFTCxZQUFHLENBQUMsS0FBRCxFQUFPO0FBQ04sbUJBQU8sSUFBUCxDQURNO1NBQVY7QUFHQSxlQUFPLE1BQU0sSUFBTixDQUFXLFFBQVgsQ0FMRjtLQUFUOztBQVFBLFdBQU8sSUFBUCxFQUFZO0FBQ1IsWUFBSSxTQUFTLEVBQVQsQ0FESTtBQUVSLFlBQUcsS0FBSyxPQUFMLEVBQWE7QUFDWixxQkFBUyxLQUFLLE9BQUwsQ0FBYSxHQUFiLENBQWlCLEtBQU8sS0FBSyxHQUFMLENBQVMsQ0FBVCxDQUFQLENBQTFCLENBRFk7U0FBaEI7QUFHQSxZQUFHLE9BQU8sSUFBUCxLQUFnQixVQUFoQixFQUNDLDBDQUFXLHVDQUFRLFlBQW5CLENBREo7QUFFQSxhQUFLLE9BQUwsR0FBZSxNQUFmLENBUFE7QUFRUixlQUFPLElBQVAsQ0FSUTtLQUFaO0NBdENHO0FBa0RBLElBQUksNENBQWtCLElBQUksWUFBSixFQUFsQiIsImZpbGUiOiJpbmplY29yYXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlZmF1bHQgYXMgYXNzZXJ0IH0gZnJvbSAnYXNzZXJ0JztcbmV4cG9ydCBmdW5jdGlvbiBJbmplY3QoLi4ucGFyYW1zKXtcbiAgICByZXR1cm4gZnVuY3Rpb24odGFyZ2V0KXtcbiAgICAgICAgdGFyZ2V0LiRpbmplY3QgPSBwYXJhbXM7XG4gICAgfTtcbn1cblxuLy9UT0RPIG1vdmUgaW5qZWNvcmF0b3IgdG8gb3duIHBhY2thZ2VcblxuY2xhc3MgTGF6eVxue1xuICAgIGNvbnN0cnVjdG9yKGZhY3Rvcnkpe1xuICAgICAgICB0aGlzLnZhbCA9IG51bGw7XG4gICAgICAgIHRoaXMuZmFjdG9yeSA9IGZhY3Rvcnk7XG4gICAgfVxuICAgIGdldCBpbnN0YW5jZSgpe1xuICAgICAgICBpZighdGhpcy52YWwpXG4gICAgICAgICAgICB0aGlzLnZhbCA9IHRoaXMuZmFjdG9yeSgpO1xuICAgICAgICByZXR1cm4gdGhpcy52YWw7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW9jQ29udGFpbmVyIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLnJlZ2lzdHJ5ID0gW107XG4gICAgfVxuXG4gICAgcmVnQWxsKC4uLnR5cGVzKXtcbiAgICAgICAgdHlwZXMuZm9yRWFjaCgodCkgPT4gdGhpcy5yZWdpc3Rlcih0KSk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXIodHlwZSwgcHJvdmlkZXIsIGFsbG93UmVwbGFjZSl7XG4gICAgICAgIGFzc2VydCh0eXBlICE9IG51bGwpO1xuXG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMucmVnaXN0cnkuZmluZEluZGV4KChlKSA9PiBlLnR5cGUgPT09IHR5cGUpO1xuICAgICAgICBpZihlbnRyeSA+PSAwKXtcbiAgICAgICAgICAgIGFzc2VydChhbGxvd1JlcGxhY2UsIGBwcm92aWRlciBmb3IgdHlwZSAke3R5cGUubmFtZSB8fCB0eXBlfSBhbHJlYWR5IHJlZ2lzdGVyZWQuIHNwZWNpZnkgYWxsb3dSZXBsYWNlIG9yIGZpeCBkdXBsaWNhdGUgcmVnaXN0cmF0aW9uYCk7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdHJ5LnNwbGljZShlbnRyeSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByb3YgPSBudWxsO1xuXG4gICAgICAgIGlmKCFwcm92aWRlcilcbiAgICAgICAgICAgIHByb3YgPSAoKSA9PiB0aGlzLmNyZWF0ZSh0eXBlKTtcbiAgICAgICAgZWxzZSBpZih0eXBlb2YgcHJvdmlkZXIgPT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICBwcm92ID0gKCkgPT4gcHJvdmlkZXIodGhpcyk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHByb3YgPSAoKSA9PiBwcm92aWRlcjtcblxuICAgICAgICB0aGlzLnJlZ2lzdHJ5LnB1c2goe3R5cGU6IHR5cGUsIGxhenk6IG5ldyBMYXp5KHByb3YpfSk7XG5cbiAgICB9XG5cbiAgICBnZXQodHlwZSl7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMucmVnaXN0cnkuZmluZCgoZSkgPT4gZS50eXBlID09PSB0eXBlKTtcbiAgICAgICAgaWYoIWVudHJ5KXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbnRyeS5sYXp5Lmluc3RhbmNlO1xuICAgIH1cblxuICAgIGNyZWF0ZSh0eXBlKXtcbiAgICAgICAgdmFyIHBhcmFtcyA9IFtdO1xuICAgICAgICBpZih0eXBlLiRpbmplY3Qpe1xuICAgICAgICAgICAgcGFyYW1zID0gdHlwZS4kaW5qZWN0Lm1hcCgoZSkgPT4gdGhpcy5nZXQoZSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyB0eXBlKC4uLnBhcmFtcyk7XG4gICAgICAgIHR5cGUuJHBhcmFtcyA9IHBhcmFtczsgICAgXG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbn1cblxuZXhwb3J0IGxldCBBcHBJb2NDb250YWluZXIgPSBuZXcgSW9jQ29udGFpbmVyKCk7XG4iXX0=