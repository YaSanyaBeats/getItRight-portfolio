window.onload = function() {

    //кнопка открыть вопрос в блоке faq
    const question_button = document.querySelectorAll('.question__button');

    function calculateQuestionMargin(question){
        const height = question.lastElementChild.scrollHeight - 10;
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

    //переключение choose-theme-button
    const choose_theme_button = document.querySelectorAll('.choose-theme-button');

    choose_theme_button.forEach((item) => {
        item.addEventListener('click', () => {
            item.classList.toggle('choose-theme-button_active');
        })
    })

    //нажатие на бургер меню
    const burger_button = document.querySelectorAll('.burger-button');

    burger_button.forEach((item) => {
        const nav = item.nextElementSibling;
        item.addEventListener('click', () => {
            item.classList.toggle('burger-button_active');
            nav.classList.toggle('nav_active');
        })
    })
}


