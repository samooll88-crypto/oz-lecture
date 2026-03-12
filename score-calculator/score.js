// 최대 점수
const maxScore = 105;

// 점수 입력
let score = Number(prompt("점수를 입력하세요 (0~100):"));

// 보너스 점수 추가
score = score + 5;

// 최대 점수 제한
if (score > maxScore) {
  score = maxScore;
}

// 등급 변수
let grade;
let message;

// 등급 계산
if (score >= 100) {
  grade = "S";
  message = "Super!";
} else if (score >= 90) {
  grade = "A";
  message = "Excellent work!";
} else if (score >= 80) {
  grade = "B";
  message = "Good job!";
} else if (score >= 70) {
  grade = "C";
  message = "Satisfactory performance.";
} else if (score >= 60) {
  grade = "D";
  message = "Needs improvement.";
} else {
  grade = "F";
  message = "Please try harder!";
}

// 합격 여부
let status = score >= 60 ? "Pass" : "Fail";

// 결과 출력
console.log("Final Score:", score);
console.log("Grade:", grade);
console.log("Status:", status);
console.log("Message:", message);
