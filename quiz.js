const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D")
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

let questions = [
    {
        question : "1. Função compreensão de listas: [x**2 for x in range(4)] ",
        imgSrc : "img/1.jpg",
        choiceA : '(0,1,4,8)',
        choiceB : '(1,2,3,4)',
        choiceC : '(0,1,4,9)',
        choiceD : '(0,1,2,8)',
        correct : "C"
    },{
        question : "2. O resultado da função def (1,1): / return (1+1)?",
        imgSrc : "img/2.jpg",
        choiceA : 2,
        choiceB : 3,
        choiceC : 4,
        choiceD : 5,
        correct : "A"
    },{
        question : "3. Já a função lambda: f = lambda 8,(-5) : 8+(-5)?",
        imgSrc : "img/3.jpg",
        choiceA : 1,
        choiceB : -3,
        choiceC : -1,
        choiceD : 3,
        correct : "D"
    },{
        question : "4. Função filter: list(filter(lambda x:x % 3 == 0 or x % 5 == 0, range (2,10))) ?",
        imgSrc : "img/4.jpg",
        choiceA : '(3,5,7,9)',
        choiceB : '(3,5,6,9)',
        choiceC : '(2,3,5,7,9)',
        choiceD : '(3,5,8,9)',
        correct : "B"
    },{
        question : "5. Função map: list(map(lambda x:x*x*x, range(1,5)))?",
        imgSrc : "img/5.jpg",
        choiceA : '(1,8,27,64)',
        choiceB : '(1,3,9,27)',
        choiceC : '(0,1,2,3)',
        choiceD : '(1,27,64,125)',
        correct : "A"
    },{
        question : "6. Sobre a função: [(x,y) for x in [1] for y in [3] if x != y]?",
        imgSrc : "img/5.jpg",
        choiceA : '((1,3,3,1),(1,4))',
        choiceB : '((1,3),(3,1))',
        choiceC : '((1,3),(1,4))',
        choiceD : '(1,3)',
        correct : "A"
    },{
        question : "7. Sobre a função: vec=[-4,-2,0,1,2] / [x*2 for x in vec]?",
        imgSrc : "img/5.jpg",
        choiceA : '(8,4,0,2,8)',
        choiceB : '(1,3,9,27,58)',
        choiceC : '(0,1,2,-4,-8)',
        choiceD : '(-8,-4,0,2,8)',
        correct : "D"
    },{
        question : "8. Nessa função lambda: f = lambda 2,(-3) : 2+(-3)?",
        imgSrc : "img/5.jpg",
        choiceA : 1,
        choiceB : -1,
        choiceC : 0,
        choiceD : 2,
        correct : "B"
    },{
        question : "9. Resolução da função def (10,11): / return (10+11)?",
        imgSrc : "img/5.jpg",
        choiceA : 20,
        choiceB : 31,
        choiceC : 19,
        choiceD : 21,
        correct : "D"
    },{
        question : "10. Função compreensão de listas: [x**2 for x in range(3)]?",
        imgSrc : "img/5.jpg",
        choiceA : '(0,1,2)',
        choiceB : '(0,1,8)',
        choiceC : '(0,1,4)',
        choiceD : '(0)',
        correct : "C"
    }
];

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; 
const gaugeWidth = 150; 
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); 
}

function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
           
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        
        score++;
        
        answerIsCorrect();
    }else{
        
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        
        clearInterval(TIMER);
        scoreRender();
    }
}

function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

function scoreRender(){
    scoreDiv.style.display = "block";
    
   
    const scorePerCent = Math.round(100 * score/questions.length);
    
    
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}





















