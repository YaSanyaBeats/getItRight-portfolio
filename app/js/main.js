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

    function SmoothScroll(target, speed, smooth) {
        if (target === document)
            target = (document.scrollingElement 
                  || document.documentElement 
                  || document.body.parentNode 
                  || document.body) // cross browser support for document scrolling
          
        var moving = false
        var pos = target.scrollTop
        var frame = target === document.body 
                  && document.documentElement 
                  ? document.documentElement 
                  : target // safari is the new IE
      
        target.addEventListener('mousewheel', scrolled, { passive: false })
        target.addEventListener('DOMMouseScroll', scrolled, { passive: false })
    
        function scrolled(e) {
            e.preventDefault(); // disable default scrolling
    
            var delta = normalizeWheelDelta(e)
    
            pos += -delta * speed
            pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)) // limit scrolling
    
            if (!moving) update()
        }
    
        function normalizeWheelDelta(e){
            if(e.detail){
                if(e.wheelDelta)
                    return e.wheelDelta/e.detail/40 * (e.detail>0 ? 1 : -1) // Opera
                else
                    return -e.detail/3 // Firefox
            }else
                return e.wheelDelta/120 // IE,Safari,Chrome
        }
    
        function update() {
            moving = true
        
            var delta = (pos - target.scrollTop) / smooth
        
            target.scrollTop += delta
        
            if (Math.abs(delta) > 0.5)
                requestFrame(update)
            else
                moving = false
        }
    
        var requestFrame = function() { // requestAnimationFrame cross browser
            return (
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(func) {
                    window.setTimeout(func, 1000 / 50);
                }
            );
        }()
    }
    
    new SmoothScroll(document, 150, 30);
    
}

