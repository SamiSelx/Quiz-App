import data from "./data.json" assert { type: "json" };

let question = document.querySelector(".question");

let reponses = document.querySelectorAll(".reponse-list li");

let nextButton = document.querySelector(".next-btn");

let nbQuestion = document.querySelector(".footer-box p span");

window.onload = () => {
  question.innerHTML = data[0].question;
  reponses.forEach((reponse, index) => {
    reponse.innerHTML = data[0].reponse[index];

  });
};
