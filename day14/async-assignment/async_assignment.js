const timerInput = document.querySelector("#timerInput");
const startTimer = document.querySelector("#startTimer");
const timerDisplay = document.querySelector("#timerDisplay");

// 입력창 초기화
const resetTimerInput = () => {
  timerInput.value = "";
};

// 출력창 초기화
const resetTimerDisp = () => {
  timerDisplay.textContent = "";
  timerDisplay.classList.remove("error", "done");
};

// 현재 초 표시
const showTimerSec = (sec) => {
  resetTimerDisp();
  timerDisplay.textContent = `타이머: ${sec}초`;
};

// 종료 메시지 표시
const showTimerComplete = () => {
  resetTimerDisp();
  timerDisplay.textContent = "타이머 종료!";
  timerDisplay.classList.add("done");
};

// 에러 메시지 표시
const showTimerError = (message) => {
  resetTimerDisp();
  timerDisplay.textContent = message;
  timerDisplay.classList.add("error");
};

// 타이머 동작 처리
const processTimer = (sec) => {
  showTimerSec(sec);

  const timer = setInterval(() => {
    sec -= 1;

    if (sec > 0) {
      showTimerSec(sec);
    } else {
      clearInterval(timer);
      showTimerComplete();
      startTimer.disabled = false;
      resetTimerInput();
    }
  }, 1000);
};

// 시작 버튼 클릭 시 실행
function handleClickTimer() {
  try {
    let sec = Number(timerInput.value);

    // 유효성 검사
    if (isNaN(sec) || sec < 1 || sec > 10) {
      throw new Error("유효한 숫자(1~10)를 입력하세요!");
    }

    // 버튼 비활성화
    startTimer.disabled = true;

    // 타이머 시작
    processTimer(sec);
  } catch (error) {
    showTimerError(error.message);
    startTimer.disabled = false;
    resetTimerInput();
  }
}

// 버튼 클릭 이벤트
startTimer.addEventListener("click", handleClickTimer);