//кнопка открыть вопрос в блоке faq
const question_button = document.querySelectorAll('.question__button');

function calculateQuestionMargin(question){
    const height = question.lastElementChild.scrollHeight;
    if(question.classList.contains('question_open')){
        question.style.marginBottom = "0px";
    }
    else{
        question.style.marginBottom = "-" + height + "px";
    }
}

question_button.forEach((item) => {

    const question = item.parentElement.parentElement;
    calculateQuestionMargin(question);
    item.addEventListener('click', (e) => {
        
        question.classList.toggle('question_open');

        //анимация margin-bottom у question
        calculateQuestionMargin(question);
    })
});

