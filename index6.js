// 샘플 데이터
const users = [
  { id: 1, name: '김철수', age: 25, job: 'developer', salary: 4000 },
  { id: 2, name: '이영희', age: 30, job: 'designer', salary: 3500 },
  { id: 3, name: '박민수', age: 22, job: 'developer', salary: 3000 },
  { id: 4, name: '정지은', age: 35, job: 'manager', salary: 5000 },
  { id: 5, name: '최동욱', age: 28, job: 'developer', salary: 4500 },
];

// 1. forEach - 단순 반복 (반환값 없음)
console.log('--- forEach: 단순 반복 ---');

users.forEach((user) => {
  console.log(user.id)
  if (user.age < 30) {
    console.log(user.name)
    return user
  }
})

// 각 요소에 대해 작업 수행, 반환값 없음
users.forEach((user, index) => {
  console.log(`${index + 1}. ${user.name} (${user.age}세)`);
});

// forEach는 반환값이 없음!
const forEachResult = users.forEach(user => user.name);
console.log('forEach 반환값:', forEachResult);  // undefined

// 2. map - 변환 (새 배열 반환)
console.log('\n--- map: 데이터 변환 ---');

// 각 요소를 변환해서 새 배열 생성
const names = users.map(user => user.name);
console.log('이름만 추출:', names);
console.log(typeof names)
console.log(Array.isArray(names))
console.log(names.length)
console.table(names);

const ages = users.map(user => user.age);
console.log('나이만 추출:', ages);
console.log(typeof ages)
console.log(Array.isArray(ages))
console.log(ages.length)
console.table(ages);

// 객체 형태 변환
const userCards = users.map(user => ({
  displayName: `${user.name} (${user.job})`,
  isAdult: user.age >= 20
}));
console.log('카드 형태로 변환:', userCards);

// for문으로 하면 더 복잡함
const namesWithFor = [];
for (let i = 0; i < users.length; i++) {
  namesWithFor.push(users[i].name);
}

// 3. filter - 필터링 (조건에 맞는 요소만)
console.log('\n--- filter: 조건 필터링 ---');

// 개발자만 필터링
const developers = users.filter(user => user.job === 'developer');
console.log('개발자들:', developers.map(u => u.name));

// 30세 이상 필터링
const over30 = users.filter(user => user.age >= 30);
console.log('30세 이상:', over30.map(u => u.name));

// 연봉 4000 이상 개발자 (체이닝!)
const seniorDevs = users
  .filter(user => user.job === 'developer')
  .filter(user => user.salary >= 4000)
  // .filter(user => user.job === 'developer' && user.salary >= 4000)
console.log('연봉 4000 이상 개발자:', seniorDevs.map(u => u.name))

const developerFilter = user => user.job === 'developer';
const salaryOver4000 = user => user.salary >= 4000;
const test1 = true
const test2 = 3
function test3() {
  return
}
function test4() {
  return true
}

const seniorDevs2 = users
  // .filter(developerFilter)
  // .filter(salaryOver4000)
  // .filter(test1)
  // .filter(test4)
  // .filter(test3)
  // .filter(user => test1)
console.log('연봉 4000 이상 개발자2:', seniorDevs2.map(u => u.name))

// 4. reduce - 누적 (하나의 값으로 축소)
console.log('\n--- reduce: 값 누적 ---');
console.table(users)

// 총 연봉 합계
const totalSalary = users.reduce((sum, user) => sum + user.salary, 0);
console.log('총 연봉:', totalSalary);

// 직업별 인원수 카운트
const jobCount = users.reduce((acc, user) => {
  acc[user.job] = (acc[user.job] || 0) + 1;
  return acc;
}, {});
console.log('직업별 인원:', jobCount);

// 직업별 연봉 합산
const jobTotalSalary = users.reduce((acc, user) => {
  acc[user.job] = (acc[user.job] || 0) + user.salary;
  return acc;
}, {});

console.log('Salary By Job: ', jobTotalSalary);

// 가장 나이 많은 사람 찾기
const oldest = users.reduce((max, user) =>
  user.age > max.age ? user : max
);
console.log('최고령:', oldest.name, `(${oldest.age}세)`);

// 5. find & findIndex - 단일 요소 찾기
console.log('\n--- find & findIndex: 요소 찾기 ---');

// 조건에 맞는 첫 번째 요소 찾기
const manager = users.find(user => user.job === 'manager');
console.log('매니저:', manager?.name);

// 인덱스 찾기
const minsuIndex = users.findIndex(user => user.name === '박민수');
console.log('박민수 인덱스:', minsuIndex);

// 없는 경우
const notFound = users.find(user => user.name === '홍길동');
console.log('없는 사람:', notFound);  // undefined

// 6. some & every - 조건 검사
console.log('\n--- some & every: 조건 검사 ---');

// some: 하나라도 만족하면 true
const hasManager = users.some(user => user.job === 'manager');
console.log('매니저가 있나요?', hasManager);  // true
if (hasManager) {
  // 작업
}

// every: 모두 만족해야 true
const allAdults = users.every(user => user.age >= 20);
console.log('모두 성인인가요?', allAdults);  // true

const allDevelopers = users.every(user => user.job === 'developer');
console.log('모두 개발자인가요?', allDevelopers);  // false

// 7. 실전 예제: 메서드 체이닝
console.log('\n--- 실전: 메서드 체이닝 ---');
console.table(users)

// "25세 이상 개발자의 이름과 연봉을 연봉 순으로 정렬해서 출력"
const result = users
  .filter(user => user.job === 'developer')  // 개발자 필터
  .filter(user => user.age >= 25)            // 25세 이상 필터
  .sort((a, b) => b.salary - a.salary)     // 연봉 내림차순 정렬
  // .sort((a, b) => b - a)     // 연봉 내림차순 정렬
  .map(user => `${user.name}: ${user.salary}만원`);  // 포맷 변환

console.log(result)
console.log('25세 이상 개발자 (연봉순):');
result.forEach(r => console.log(r));

// 결론: 언제 어떤 메서드를 쓸까?