// 1. var의 함정: 블록 스코프가 없다!
console.log('--- var vs let 스코프 차이 ---');

// var는 블록({})을 무시하고 함수 스코프만 인식
if (true) {
  var varVariable = '나는 var';
  let letVariable = '나는 let';
}

console.log(varVariable);  // '나는 var' - 블록 밖에서도 접근됨
// console.log(letVariable);  // ReferenceError - 블록 밖에서 접근 불가

// 2. 반복문에서의 var 문제 (가장 흔한 버그!)
console.log('\n--- 반복문에서 var의 문제 ---');

// var 사용 시 - 모든 함수가 같은 i를 참조
var funcsVar = [];
for (var i = 0; i < 3; i++) {
  funcsVar.push(function () {
    console.log('var i:', i);
  });
}

// 예상: 0, 1, 2 / 실제: 3, 3, 3
console.log('var 결과 (예상: 0,1,2):'); // () // call, invoke
funcsVar.forEach(fn => fn());
// funcsVar.forEach(x => x())
// funcsVar.forEach(a => a())

// let 사용 시 - 각 반복마다 새로운 i 생성
let funcsLet = [];
for (let j = 0; j < 3; j++) {
  funcsLet.push(() => {
    console.log('let j:', j);
  });
}

console.log('\nlet 결과:');
funcsLet.forEach(fn => fn());  // 0, 1, 2

// 3. 호이스팅 차이
console.log('\n--- 호이스팅 차이 ---');

// var는 선언이 끌어올려지고 undefined로 초기화
console.log('var 호이스팅:', hoistedVar);  // undefined (에러 아님!)
var hoistedVar = 'hello';

// let/const는 TDZ(Temporal Dead Zone)에 걸림
// console.log(hoistedLet);  // ReferenceError: Cannot access before initialization
let hoistedLet = 'hello';

// 4. const의 특성: 재할당 불가, but 내부 변경은 가능
console.log('\n--- const의 특성 ---');

const person = {name: 'boki', age: 25};

// 재할당 불가
// person = { name: 'kim' };  // TypeError: Assignment to constant variable

// 내부 속성 변경은 가능!
person.age = 26;
person.job = 'developer';
console.log('const 객체 변경:', person);  // { name: 'boki', age: 26, job: 'developer' }

const numbers = [1, 2, 3];
// numbers = [1,2,3];
numbers.push(4);
console.log('const 배열 변경:', numbers);  // [1, 2, 3, 4]

const fruit = 'apple';
console.log("fruit", fruit);
// 결론: 왜 let/const를 써야 할까?
