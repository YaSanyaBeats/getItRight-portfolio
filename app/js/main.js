const question_button = document.querySelectorAll('.question__button');

question_button.forEach((item) => {
    item.addEventListener('click', (e) => {
        item.parentElement.parentElement.classList.toggle('question_open');
    })
});

