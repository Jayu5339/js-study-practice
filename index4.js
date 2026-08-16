// 1. 클로저란? 함수가 자신이 생성된 환경을 기억하는 것
console.log('--- 클로저 기본 개념 ---');

function outer() {
  let message = '나는 outer의 변수';  // outer 함수의 지역 변수

  function inner() {
    console.log(message);  // inner는 outer의 변수에 접근 가능!
    message = null
  }

  return inner;  // inner 함수를 반환
}

const closureFunc = outer();
closureFunc();

// 2. 클로저의 실용적 활용: 프라이빗 변수 만들기
console.log('\n--- 프라이빗 변수 (캡슐화) ---');

function createCounter() {
  let count = 0;  // 외부에서 직접 접근 불가능한 프라이빗 변수

  return {
    increment() {
      count++;
      console.log('count:', count);
    },
    decrement() {
      count--;
      console.log('count:', count);
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
counter.increment();  // count: 1
counter.increment();  // count: 2
counter.decrement();  // count: 1

// count 변수에 직접 접근 불가! 오직 메서드를 통해서만 조작 가능
console.log(counter.count);  // undefined
console.log('현재 카운트:', counter.getCount());  // 1

// 각 카운터는 독립적인 count를 가짐
const counter2 = createCounter();
counter2.increment();  // count: 1 (counter와 별개)

// 3. 클로저의 실용적 활용: 함수 팩토리
console.log('\n--- 함수 팩토리 ---');

function createMultiplier(multiplier) {
  // multiplier를 기억하는 함수를 반환
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const tenTimes = createMultiplier(10);

console.log('double(5):', double(5));    // 10
console.log('triple(5):', triple(5));    // 15
console.log('tenTimes(5):', tenTimes(5)); // 50

// 4. 클로저의 실용적 활용: 이벤트 핸들러에서 데이터 유지
console.log('\n--- 이벤트 핸들러 패턴 ---');

function setupButton(buttonName) {
  let clickCount = 0;

  // 이 함수는 buttonName과 clickCount를 기억함
  return function handleClick() {
    clickCount++;
    console.log(`${buttonName} 버튼이 ${clickCount}번 클릭됨`);
  };
}

const loginButtonHandler = setupButton('로그인');
const logoutButtonHandler = setupButton('로그아웃');

// 시뮬레이션
loginButtonHandler();   // 로그인 버튼이 1번 클릭됨
loginButtonHandler();   // 로그인 버튼이 2번 클릭됨
logoutButtonHandler();  // 로그아웃 버튼이 1번 클릭됨 (독립적!)

// 5. 클로저 주의점: 메모리 누수
console.log('\n--- 클로저 주의점 ---');

function createHeavyObject() {
  const heavyData = new Array(1000000).fill('fire');  // 큰 데이터
  // 3초 걸리는 API
  // Ploty.js -> // 3

  return function() {
    // heavyData를 참조하면 가비지 컬렉션 대상이 안 됨!
    console.log('데이터 길이:', heavyData.length);
  };
}

// 이 함수를 많이 만들면 메모리 문제 발생 가능
// 필요 없어지면 참조를 끊어줘야 함
let leakyFunc = createHeavyObject();
leakyFunc();
leakyFunc = null;  // 참조 끊기 -> 가비지 컬렉션 대상

// 결론: 클로저를 왜 알아야 할까?