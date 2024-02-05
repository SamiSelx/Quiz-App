import data2 from "./data/data.json" assert { type: "json" };
import itQuiz from "./data/itQuiz.json" assert { type: "json" };

let data = [];
let question = document.querySelector(".question");

let reponses = document.querySelectorAll(".reponse-list li");

let nextButton = document.querySelector(".next-btn");

let nbQuestion = document.querySelector(".footer-box p span");

let resultat = document.querySelector(".resultat");

let quizBox = document.querySelector(".quiz-box");
resultat.remove();
quizBox.remove();

document.querySelector(".it-btn").onclick = () => {
  data = [...itQuiz];
  document.querySelector(".box-quiz").remove();
  initQuiz();
};
document.querySelector(".culture-btn").onclick = () => {
  data = [...data2];
  document.querySelector(".box-quiz").remove();
  initQuiz();
};

let numberQuestion = 0;
let points = 0;


reponses.forEach((reponse) => {
  reponse.onclick = () => {
    removeAllClasses();
    reponse.classList.add("clicked");
  };
});

nextButton.onclick = () => {
  // check the answer if it exists
  let value = answerExist();

  if (!value && value != 0) {
    document.querySelector(".note").innerHTML = "you Forget the answer!!";
    return;
  }
  /**********************/
  if (!nextButton.classList.contains("btn-clicked")) {
    document.querySelector(".note").innerHTML = "";
    nextButton.classList.toggle("btn-clicked");
    if (data[numberQuestion].reponse[value].correct) {
      reponses[value].classList.add("success");
      points++;
    } else {
      reponses[value].classList.add("echec");
      correctAnswer();
    }
  } else if (numberQuestion + 1 === data.length) {
    document.querySelector(".quiz-box").style.display = "none";
    resultat.style.display = "block";
    document.body.appendChild(resultat);

    document.querySelector(
      ".resultat .totale-point"
    ).innerHTML = `${points}/${data.length}`;
    document.querySelector(".reset").onclick = reset;
    document.querySelector(".try-again").onclick = tryAgain;

    if (points === data.length) {
      document.querySelector(".status").innerHTML = "YOU ARE GENIUS";
    } else if (points > data.length / 2) {
      document.querySelector(".status").innerHTML = "YOU ARE CLOSE GL";
    } else {
      document.querySelector(".status").innerHTML = "Better Luck Next Time";
    }
  } else {
    removeAllClasses();
    numberQuestion++;
    question.innerHTML = data[numberQuestion].question;
    reponses.forEach((reponse, index) => {
      reponse.innerHTML = data[numberQuestion].reponse[index].text;

      reponse.setAttribute("value", index);
    });
    nbQuestion.innerHTML = `${numberQuestion + 1}/${data.length}`;
  }
};

function removeAllClasses() {
  reponses.forEach((reponse) => {
    reponse.classList.remove("clicked");
    reponse.classList.remove("success");
    reponse.classList.remove("echec");
  });
  nextButton.classList.remove("btn-clicked");
}

function answerExist() {
  for (let i = 0; i < reponses.length; i++) {
    if (reponses[i].classList.contains("clicked")) {
      return reponses[i].value;
    }
  }
  return null;
}

function correctAnswer() {
  data[numberQuestion].reponse.forEach((rep, index) => {
    if (rep.correct) reponses[index].classList.add("success");
  });
}

function reset() {
  window.location.reload();
}

function initQuiz() {
  quizBox.style.display = "block";
  document.body.appendChild(quizBox);
  question.innerHTML = data[0].question;
  reponses.forEach((reponse, index) => {
    reponse.innerHTML = data[0].reponse[index].text;
    reponse.setAttribute("value", index);
  });
  nbQuestion.innerHTML = `${numberQuestion + 1}/${data.length}`;
}

function tryAgain() {
  quizBox.style.display = "grid";
  quizBox.remove();
  resultat.remove();
  numberQuestion = 0;
  points = 0;
  removeAllClasses();
  initQuiz();
}
