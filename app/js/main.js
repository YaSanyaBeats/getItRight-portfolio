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
            document.querySelector('html').classList.toggle('dark');
        })
    })

    //нажатие на бургер меню
    const burger_button = document.querySelectorAll('.burger-button');

    burger_button.forEach((item) => {
        const nav = item.nextElementSibling;
        item.addEventListener('click', () => {
            item.classList.toggle('burger-button_active');
            nav.classList.toggle('nav_active');
            if(item.classList.contains('burger-button_active')){
                document.body.style.position = 'fixed';
            }
            else{
                document.body.style.position = '';
            }
        })
    })

    //анимация ссылок-якорей
    const links = document.querySelectorAll('.nav__link');
    links.forEach((link) => {
        const blockId = link.getAttribute('href').substr(1);

        link.addEventListener('click', (e) => {
            e.preventDefault();

            document.getElementById(blockId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    })

    const modalWindow = document.querySelector('.modal');

    modalWindow.addEventListener('click', (e) => {
        if(e.target === modalWindow){
            modalWindow.classList.remove('modal_open');
        }
    })

    //close button modal window
    const closeModalWindowButtons = document.querySelectorAll('.modal__close-button');
    closeModalWindowButtons.forEach((button) => {
        button.addEventListener('click', () => {
            modalWindow.classList.remove('modal_open');
        })
    })

    //open button modal window
    const openModalWindowButtons = document.querySelectorAll('.header__button');
    openModalWindowButtons.forEach((button) => {
        button.addEventListener('click', () => {
            modalWindow.classList.add('modal_open');
        })
    })
    
}

