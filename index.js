import data from "./data.json" assert { type: "json" };

let question = document.querySelector(".question");

let reponses = document.querySelectorAll(".reponse-list li");

let nextButton = document.querySelector(".next-btn");

let nbQuestion = document.querySelector(".footer-box p span");

let resultat = document.querySelector(".resultat");
// document.querySelector(".resultat").style.display = "none";
resultat.remove()

let numberQuestion = 0;
let points = 0;

window.onload = () => {
  question.innerHTML = data[0].question;
  reponses.forEach((reponse, index) => {
    reponse.innerHTML = data[0].reponse[index].text;
    reponse.setAttribute("value", index);
  });
  nbQuestion.innerHTML = `${numberQuestion + 1}/${data.length}`;
};

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
    document.body.appendChild(resultat)
    
    document.querySelector(".resultat p").innerHTML = `${points}/${data.length}`
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
