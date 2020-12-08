var o = { a: 1 };
o.b = 2;
//a和b皆为数据属性
var ad = Object.getOwnPropertyDescriptor(o, "a"); // {value: 1, writable: true, enumerable: true, configurable: true}
var bd = Object.getOwnPropertyDescriptor(o, "b"); // {value: 2, writable: true, enumerable: true, configurable: true}
console.log(ad);
console.log(bd);

var o = { a: 1 };
Object.defineProperty(o, "b", {
  value: 2,
  writable: false,
  enumerable: false,
  configurable: true
});
//a和b都是数据属性，但特征值变化了
Object.getOwnPropertyDescriptor(o, "a"); // {value: 1, writable: true, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor(o, "b"); // {value: 2, writable: false, enumerable: false, configurable: true}
o.b = 3;
console.log(o.b); // 2
for (k in o) {
  console.log(k);
}

var o = {
  _a: 1,

  get a() {
    console.log("getter");
    return _a;
  },
  set a(v) {
    console.log("set a");
    _a = v;
  }
};
o.a = 4;
console.log(o.a); // 4
for (k in o) {
  console.log(k);
}

var o = { [Symbol.toStringTag]: "MyObject" };
console.log(o + "");

console.log(new Date()); // 1
console.log(Date());



function all_js_object() {
  var set = new Set();
  var objects = [
    eval,
    isFinite,
    isNaN,
    parseFloat,
    parseInt,
    decodeURI,
    decodeURIComponent,
    encodeURI,
    encodeURIComponent,
    Array,
    Date,
    RegExp,
    Promise,
    Proxy,
    Map,
    WeakMap,
    Set,
    WeakSet,
    Function,
    Boolean,
    String,
    Number,
    Symbol,
    Object,
    Error,
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError,
    ArrayBuffer,
    SharedArrayBuffer,
    DataView,
    Float32Array,
    Float64Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Uint8ClampedArray,
    Atomics,
    JSON,
    Math,
    Reflect
  ];
  objects.forEach(o => set.add(o));

  for (var i = 0; i < objects.length; i++) {
    var o = objects[i];
    for (var p of Object.getOwnPropertyNames(o)) {
      var d = Object.getOwnPropertyDescriptor(o, p);
      if (
        (d.value !== null && typeof d.value === "object") ||
        typeof d.value === "function"
      )
        if (!set.has(d.value)) set.add(d.value), objects.push(d.value);
      if (d.get) if (!set.has(d.get)) set.add(d.get), objects.push(d.get);
      if (d.set) if (!set.has(d.set)) set.add(d.set), objects.push(d.set);
    }
  }
  return set 
}

function array_push(){
  a = [
    0,1
  ]
  for (i = 0; i < a.length; i++){
    console.log(i, a[i])
    if (i == 1) {
      a.push(2)
    }
  }
}

array_push()
