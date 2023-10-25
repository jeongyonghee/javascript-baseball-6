import { MissionUtils } from "@woowacourse/mission-utils";

class App {
  async play() {
    const NUM_LENGTH = 3;
    const MIN_NUMBER = 1;
    const MAX_NUMBER = 9;

    while (true) {
      try {
        const computerNumbers = [];
        while (computerNumbers.length < NUM_LENGTH) {
          const randomNum = MissionUtils.Random.pickNumberInRange(MIN_NUMBER, MAX_NUMBER);
          if (!computerNumbers.includes(randomNum)) {
            computerNumbers.push(randomNum);
          }
        }

        let attempts = 0;

        while (true) {
          attempts++;
          const userInput = await MissionUtils.Console.readLineAsync(
            "서로 다른 1에서 9 사이의 숫자 3개를 입력하세요: "
          );

          // Validate user input
          if (/^[1-9]{3}$/.test(userInput)) {
            // Convert user input to an array of digits
            const userNumbers = userInput.split("").map(Number);

            // Check for strikes and balls
            let strikes = 0;
            let balls = 0;

            for (let i = 0; i < NUM_LENGTH; i++) {
              if (userNumbers[i] === computerNumbers[i]) {
                strikes++;
              } else if (computerNumbers.includes(userNumbers[i])) {
                balls++;
              }
            }

            if (strikes === NUM_LENGTH) {
              MissionUtils.Console.print(`3스트라이크! 게임 종료. ${attempts}번 시도했습니다.`);
              break;
            } else if (strikes > 0 || balls > 0) {
              MissionUtils.Console.print(`${strikes}스트라이크 ${balls}볼`);
            } else {
              MissionUtils.Console.print("낫싱");
            }
          } else {
            throw new Error("[ERROR] 올바른 형식의 숫자를 입력하세요.");
          }
        }

        const restart = await MissionUtils.Console.readLineAsync(
          "게임을 다시 시작하려면 1, 종료하려면 2를 입력하세요: "
        );

        if (restart === "2") {
          break;
        }
      } catch (error) {
        console.error(error);
        break;
      }
    }
  }
}

export default App;

const app = new App();
app.play();
