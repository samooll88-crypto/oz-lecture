// 최대 별 개수
const maxStars = 10;

// 별 출력 함수
function printStars(count = 1) {
  let stars = "";

  for (let i = 0; i < count; i++) {
    stars += "*";
  }

  console.log(stars);
}

let input;

// 올바른 입력 받을 때까지 반복
while (true) {

  input = prompt("Enter the number of stars (1-10):");

  // 숫자 변환
  let num = Number(input);

  // 입력 검사
  if (isNaN(num) || num < 1 || num > maxStars) {
    console.log("Invalid input! Enter a number between 1 and 10.");
    continue;
  }

  // 별 출력
  printStars(num);

  // 정상 입력이면 종료
  break;
}