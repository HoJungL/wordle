// requirements
// 1. 5글자 단어. (존재하지 않는 단어여도 됨. )ex: abcde
// 2. 6번의 시도 가능
// 3. 존재하면 노란색, 위치도 맞으면 초록색
// 4. 게임 종료 판단
// 5. 추가로 상단에 게임 시간 표시하기

const answer = "STUDY";
let index = 0; // 수정가능한 녀석이죵
let attempts = 0; // 시도 횟수

let timer;

function appStart() {
  // 게임종료 애니메이션
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:37vw; background-color:white; width:200px; height:100px";
    document.body.appendChild(div);
  };

  // 게임종료
  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer); //이거하면 타이머 멈춤
  };

  //다음 행으로 넘기기
  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  // 엔터 입력하기
  const handleEnterKey = () => {
    let trueCount = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const inputText = block.innerText;
      const answerText = answer[i];
      if (inputText === answerText) {
        trueCount++;
        block.style.background = "#6AAA64";
      } else if (answer.includes(inputText)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      block.style.color = "white";
    }
    if (trueCount === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  // 단어 키 입력하기
  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    // 파라미터를 직접 입력해서 함수작용에 써도 됨. 단, 이 문제에서는 index 전에꺼를 없애야하기 때문에 전다할 필요가 없음
    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const startTimer = () => {
    const startTime = new Date();

    function setTime() {
      const nowTime = new Date();
      const passedTime = new Date(nowTime - startTime);
      const min = passedTime.getMinutes().toString().padStart(2, "0");
      const sec = passedTime.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${min}:${sec}`;
    }
    timer = setInterval(setTime, 1000);
  };
  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
