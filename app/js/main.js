window.onload = function() {

    //кнопка открыть вопрос в блоке faq
    const question_button = document.querySelectorAll('.question__button');


    question_button.forEach((item) => {
        const question = item.parentElement.parentElement;
        item.addEventListener('click', (e) => {
            question.classList.toggle('question_open');
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
    const burger_button = document.querySelector('.burger-button');
    const nav = burger_button.nextElementSibling;
    burger_button.addEventListener('click', toggleBurgerMenu);

    function toggleBurgerMenu(){
        burger_button.classList.toggle('burger-button_active');
        nav.classList.toggle('nav_active');
        if(burger_button.classList.contains('burger-button_active')){
            document.body.style.position = 'fixed';
        }
        else{
            document.body.style.position = '';
        }
    }

    //анимация ссылок-якорей
    const links = document.querySelectorAll('.nav__link');
    links.forEach((link) => {
        const blockId = link.getAttribute('href').substr(1);

        link.addEventListener('click', (e) => {
            e.preventDefault();
            burger_button.classList.remove('burger-button_active');
            nav.classList.remove('nav_active');
            document.body.style.position = '';
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

    function offset(el){
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }


    //анимация при скролле
    const animate_elements = document.querySelectorAll(".animate");

    function animate(){
        animate_elements.forEach((elem) => {
            const height = elem.offsetHeight;
            const top = offset(elem).top;

            let animItemPoint = window.innerHeight - height / 2;

            if(animItemPoint > window.innerHeight){
                animItemPoint = window.innerHeight - window.innerHeight / 2;
            }

            if((pageYOffset > top - animItemPoint) && pageYOffset < (top + height)){
                elem.classList.add('animate_active');
            }
        })
    }

    if(animate_elements.length > 0){
        animate();
        window.addEventListener('scroll', animate);
    }

    //формы орбратной связи
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
        const inputs = form.querySelectorAll('input');
        const request = new XMLHttpRequest();
        const url = "mail.php";
        const doneContent = form.parentElement.parentElement.parentElement;

        form.addEventListener('submit', function(e){
            e.preventDefault();
            const name = inputs[0].value;
            const email = inputs[1].value;
            const phone = inputs[2].value;
            const params = "name=" + name + "&email=" + email + "&phone=" + phone;
            request.open("POST", url, true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send(params);
        })

        request.addEventListener("readystatechange", () => {
            if(request.readyState === 4 && request.status === 200) { 
                if(request.responseText === "1"){
                    doneContent.classList.add('form_submit');
                }
            }
        });
    })

    document.querySelectorAll('input[type="tel"]').forEach((input) => {
        $(input).mask("+7(999) 999-9999");
    })

}

