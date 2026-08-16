// 1. this 바인딩 차이
const obj = {
  name: 'boki',

  greetFunc: function () {
    console.log('function this:', this.name); // 호출한 자기 자신을 가리킴
  },

  greetArrow: () => {
    // console.log('arrow this:', this.name); // global을 가리킴(undefined)
    console.log('arrow this:', obj.name); // 호출한 객체 자체를 가리킴(undefined X)
  }
}

console.log('--- this 바인딩 차이 ---');
obj.greetFunc();
obj.greetArrow();

// 2. 호이스팅 차이
console.log('\n--- 호이스팅 차이 ---');

hoistedFunc('선언 전에 호출됨');

function hoistedFunc(msg) {
  console.log('function 호이스팅:', msg);
}

// notHoisted('에러!');  // ReferenceError: Cannot access before initialization

const notHoisted = (msg) => {
  console.log('arrow 호이스팅:', msg);
}

notHoisted('선언 후에만 호출 가능');

// 3. arguments 객체 차이
console.log('\n--- arguments 객체 차이 ---');

function funcWithArguments() {
  console.log(typeof arguments)
  console.log('function arguments:', arguments);
}

const arrowWithArguments = () => {
  console.log('arrow arguments', arguments);
}

funcWithArguments(1, 2, 3, 4);
arrowWithArguments(1, 2, 3);

const arrowWithRest = (...args) => {
  console.log('arrow rest parameter:', args);
}
arrowWithRest(1, 2, 3);

// 4. 생성자(new) 차이
console.log('\n--- 생성자 차이 ---');

function Person(name) {
  this.name = name;
}

const PersonArrow = (name) => {
  this.name = name;
}

const person1 = new Person('boki');
console.log('function 생성자:', person1.name);

// const person2 = new PersonArrow('boki');
// console.log('arrow는 생성자로 사용 불가', person2.name);