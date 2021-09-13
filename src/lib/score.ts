let score = 0;
let highScore = 0;

export function updateScore(newScore: number) {
    score = newScore;
    highScore = +(localStorage.getItem('jacksonfrankland.js13k2021.score') ?? 0);
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('jacksonfrankland.js13k2021.score', `${score}`);
    }
    document.querySelector<HTMLElement>('#score')!.innerHTML = `High Score: ${highScore} <br /> Score: ${score}`;
}

export function incrementScore () {
    updateScore(score + 1);
}
