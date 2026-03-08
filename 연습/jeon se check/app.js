const checks = Array.from(document.querySelectorAll('input[type="checkbox"]'));
const progressText = document.getElementById('progressText');
const progressBar = document.getElementById('progressBar');
const riskText = document.getElementById('riskText');
const nextAction = document.getElementById('nextAction');
const resetBtn = document.getElementById('resetBtn');
const printBtn = document.getElementById('printBtn');

const STORAGE_KEY = 'jeonse_checklist_v1';

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const data = JSON.parse(raw);
    checks.forEach(chk => {
      chk.checked = !!data[chk.id];
    });
  } catch (e) {
    // ignore
  }
}

function saveState() {
  const data = {};
  checks.forEach(chk => data[chk.id] = chk.checked);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function calc() {
  const total = checks.length;
  const done = checks.filter(c => c.checked).length;

  const progress = total === 0 ? 0 : Math.round((done / total) * 100);
  progressText.innerText = `${progress}%`;
  progressBar.style.width = `${progress}%`;

  // 가중치 기반 점수
  let score = 0;
  let maxScore = 0;
  let missingCritical = [];

  checks.forEach(chk => {
    const w = Number(chk.dataset.weight || 1);
    maxScore += w;
    if (chk.checked) score += w;

    const isCritical = chk.dataset.critical === 'true';
    if (isCritical && !chk.checked) {
      // label 텍스트 찾기
      const labelText = chk.parentElement.querySelector('.item-text')?.innerText || '핵심 항목';
      missingCritical.push(labelText);
    }
  });

  const safety = maxScore === 0 ? 0 : Math.round((score / maxScore) * 100);

  // 위험도 판단: 핵심 미체크가 있으면 위험도 상향
  let risk = '보통';
  if (done === 0) risk = '판단 전';
  else if (missingCritical.length >= 2) risk = '높음';
  else if (missingCritical.length === 1) risk = '주의';
  else if (safety >= 80) risk = '낮음';
  else if (safety >= 60) risk = '보통';
  else risk = '주의';

  riskText.innerText = risk;

  // 다음 행동 가이드
  if (done === 0) {
    nextAction.innerText = '체크를 시작하면 다음 행동 가이드가 나옵니다.';
  } else if (missingCritical.length > 0) {
    nextAction.innerText =
      `⚠ 핵심 확인이 아직이에요: ${missingCritical[0]}${missingCritical.length > 1 ? ` 외 ${missingCritical.length - 1}개` : ''}\n` +
      `→ 등기부/권리/전입·확정일자 같은 핵심부터 먼저 확인하세요.`;
  } else {
    nextAction.innerText =
      `좋아요. 핵심은 확인했어요.\n` +
      `→ 이제 특약 문구와 이체 증빙(명의자 계좌)을 마지막으로 점검해보세요.`;
  }
}

checks.forEach(chk => {
  chk.addEventListener('change', () => {
    saveState();
    calc();
  });
});

resetBtn.addEventListener('click', () => {
  checks.forEach(chk => chk.checked = false);
  saveState();
  calc();
});

printBtn.addEventListener('click', () => {
  window.print();
});

loadState();
calc();
riskBadge.className = 'risk-badge'; // 초기화

if (risk === '낮음') riskBadge.classList.add('risk-low');
else if (risk === '보통') riskBadge.classList.add('risk-mid');
else if (risk === '주의') riskBadge.classList.add('risk-warn');
else if (risk === '높음') riskBadge.classList.add('risk-high');