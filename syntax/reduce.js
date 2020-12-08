//@see https://www.runoob.com/jsref/jsref-reduce.html

const loadTypeOptions = [
    { key: '0', display_name: 'HTTP' },
    { key: '1', display_name: 'TCP' },
    { key: '2', display_name: 'GRPC' }
]

typeMap = loadTypeOptions.reduce((acc, cur)=>{
    acc[cur.key] = cur.display_name
    return acc
},{'first': "ok"})

console.log(typeMap)
  