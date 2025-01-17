const play = $(".js-play"),
  level = $(".js-level"),
  score = $(".js-score"),
  counter = $(".js-counter"),
  reset = $(".js-reset"),
  btn = $(".h-36");
let game = JSON.parse(localStorage.getItem("game")) || {
  f: 0,
  wins: 0,
  level: 0,
  moves: [],
};
let pmoves = [],
  cmoves = game.moves,
  c = 0;

window.onload = function () {
  if (game.f) {
    play.hide();
    level.text(`Level: ${game.level}`);
    score.text(`Score: ${game.wins}`);
    counter.text(`${c}/${cmoves.length}`);
  }
};

play.click(function () {
  play.hide();
  level.text(`Level: ${game.level}`);
  score.text(`Score: ${game.wins}`);
  game.f = 1;
  c_moves();
});

function c_moves() {
  if (game.f) {
    pmoves = [];
    c = 0;
    let n = Math.floor(Math.random() * 4 + 1);
    let p = $(`.${n}`).attr("id");
    cmoves.push(p);
    press(p);
    counter.text(`0/${cmoves.length}`);
    localStorage.setItem("game", JSON.stringify(game));
  }
}

btn.click(function () {
  if (game.f) {
    let p = $(this).attr("id");
    pmoves.push(p);
    press(p);
    check();
  } else {
    level.text("Press Play To Start Game!");
  }
});

function check() {
  let l = pmoves.length - 1;
  if (pmoves[l] === cmoves[l]) {
    c++;
    counter.text(`${c}/${cmoves.length}`);
    if (pmoves.length === cmoves.length) {
      game.level++;
      game.wins++;
      level.text(`Level: ${game.level}`);
      score.text(`Score: ${game.wins}`);
      setTimeout(function () {
        c_moves();
      }, 1000);
    }
  } else {
    over();
  }
}

function over() {
  $(document.body).addClass("w");
  setTimeout(function () {
    $(document.body).removeClass("w");
  }, 300);
  game.moves = [];
  game.level = 0;
  game.f = 0;
  c = 0;
  cmoves = game.moves;
  play.show();
  level.text(`Game over!!`);
  game.wins--;
  score.text(`Score: ${game.wins}`);
  counter.text("0/0");
  const audio = new Audio(`Source_Files/Audio/w.mp3`);
  audio.play();
  localStorage.setItem("game", JSON.stringify(game));
}

function press(p) {
  const audio = new Audio(`Source_Files/Audio/${p}.mp3`);
  audio.play();
  const btn = $(`#${p}`);
  btn.addClass(`${p}`);
  setTimeout(function () {
    btn.removeClass(`${p}`);
  }, 200);
}

reset.click(function () {
  localStorage.removeItem("game");
  game = {
    f: 0,
    wins: 0,
    level: 0,
    moves: [],
  };
  pmoves = [];
  cmoves = game.moves;
  play.show();
  level.text(`Game Reset!`);
  score.text("Score: N/A");
  counter.text("0/0");
});
