// 1. Falsy 값들 (false로 평가되는 값)
console.log('--- Falsy 값들 ---');

const falsyValues = [
  false,      // 불리언 false
  0,          // 숫자 0
  -0,         // 음수 0
  0n,         // BigInt 0
  '',         // 빈 문자열
  null,       // null
  undefined,  // undefined
  NaN,        // Not a Number
];

falsyValues.forEach((value, index) => {
  if (!value) {
    console.log(`${index + 1}. ${String(value)} (${typeof value}) -> falsy`);
  }
});

// 2. 흔히 착각하는 Truthy 값들
console.log('\n--- 착각하기 쉬운 Truthy 값들 ---');

// 이것들은 전부 true로 평가됨!
const mistakenTruthy = [
  '0',        // 문자열 '0' - 빈 문자열이 아니므로 truthy!
  'false',    // 문자열 'false' - 내용과 관계없이 truthy!
  [],         // 빈 배열 - 객체이므로 truthy!
  {},         // 빈 객체 - 객체이므로 truthy!
  function(){}, // 함수 - 객체이므로 truthy!
];

mistakenTruthy.forEach((value) => {
  if (value) {
    console.log(`${JSON.stringify(value)} (${typeof value}) -> truthy!`);
  }
});

// 3. == vs === (느슨한 비교 vs 엄격한 비교)
console.log('\n--- == vs === 의 함정 ---');

// == 는 타입 변환 후 비교 (예측 불가능한 결과!)
console.log('== 사용 시 이상한 결과들:');
console.log('0 == "":', 0 == '');           // true
console.log('0 == "0":', 0 == '0');         // true
console.log('false == "0":', false == '0'); // true
console.log('null == undefined:', null == undefined); // true
console.log('[] == false:', [] == false);   // true
console.log('"" == false:', '' == false);   // true

// === 는 타입까지 비교 (안전!)
console.log('\n=== 사용 시:');
console.log('0 === "":', 0 === '');         // false
console.log('0 === "0":', 0 === '0');       // false
console.log('false === "0":', false === '0'); // false

// 4. 실제 버그 시나리오
console.log('\n--- 실제 버그 시나리오 ---');

// 시나리오 1: API에서 받은 값 체크
const apiResponse = { count: 0 };

// 잘못된 체크 - count가 0이면 '데이터 없음'으로 처리됨!
if (!apiResponse.count) {
  console.log('데이터가 없습니다 (하지만 실제론 count: 0)');
}

// 올바른 체크
// if (apiResponse.count === undefined || apiResponse.count === null) {
if (apiResponse.count == null) {
  console.log('데이터가 없습니다');
} else {
  console.log('데이터 있음, count:', apiResponse.count);
}

// 시나리오 2: 빈 배열 체크
const items = [];

// 잘못된 체크 - 빈 배열도 truthy!
if (items) {
  console.log('items이 있음 (하지만 비어있음)');
}

// 올바른 체크
if (items.length > 0) {
  console.log('아이템이 있습니다');
} else {
  console.log('아이템이 비어있습니다');
}

// 5. 안전한 기본값 설정 Null Coleasing
console.log('\n--- 안전한 기본값 설정 ---');

// || 연산자의 함정 - 0이나 ''도 기본값으로 대체됨
function greet(name) {
  const userName = name || '손';
  console.log(`안녕하세요, ${userName}님`);
}

greet('');  // '안녕하세요, 손님' - 빈 문자열이 무시됨!
greet(0);   // '안녕하세요, 손님' - 0이 무시됨!

// Nullish coalescing (??) 사용 - null/undefined만 대체
function greetSafe(name) {
  const userName = name ?? '손';
  console.log(`안녕하세요, ${userName}님`);
}

greetSafe('');    // '안녕하세요, 님' - 빈 문자열 유지
greetSafe(null);  // '안녕하세요, 손님' - null만 대체

// 결론: 타입 변환 함정을 피하려면?