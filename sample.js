const props = {
  a: 1,
  b: 2,
  c: 3,
  d: 4
}

function sampleFunc({a, b, ...rest}){
  console.log(a); // {a:1, b:2}
  console.log(b); // undefined
  console.log(rest);
}

sampleFunc(props)



const props2 = {
  d: 10, 
  e: 12
}

const props3 = {
  ...props,
  ...props2, 
  a: 2
}
console.log(props3)