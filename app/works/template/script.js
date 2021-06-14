//Фиксированный хеадер
$(document).scroll(function(){
    if($(document).scrollTop() > 70){
        $('header').addClass('scrollEvent');
    }
    else{
        $('header').removeClass('scrollEvent');
    }
})

//адаптивное меню
$('.nav-mobile-button').click(function(){
    $('header ul').toggleClass('active');
})

//последние работы (фильтр категорий)
$('.projects button.projects-category-button').click(function(){
    $('.projects button.projects-category-button.active').removeClass('active');
    $(this).addClass('active');

    let category = $('.projects button.projects-category-button.active').attr('data-category');
    $('.project-card').parent().each(function(index, elem){
        $(elem).hide(200);
    })
    
    setTimeout(function(){
        $('.project-card').each(function(index, elem){
            if (!($(elem).parent().hasClass('disable'))){
                if (category != "all"){
                    if(($(elem).attr('data-category') == category)){
                        $(elem).parent().show(300, 'linear');
                    }
                }
                else{
                    $(elem).parent().show(300, 'linear');
                }
            }
        })
    }, 200)
})

//загрузка срытых работ
$('.download-more-button').click(function(){
    $('.download-more-button span').hide();
    $('.download-more-button .spinner-border').show();
    setTimeout(function(){
        $('.download-more-button').hide(200, "linear", function(){
            $('.projects .project-cards .disable').hide();
            let category = $('.projects button.projects-category-button.active').attr('data-category');
            $('.projects .project-cards .disable .project-card').each(function(index, elem){
                cat = $(elem).attr('data-category');
                if((category == cat) || (category == 'all')){
                    $(elem).parent().show(400, 'linear');
                }
            })
            $('.projects .project-cards .disable').removeClass('disable');
        });
    }, 1000);    
})

//слайдер новостей
$('.news .control-button.next').click(function(){
    $('#carouselNews').carousel('next')
})

$('.news .control-button.prev').click(function(){
    $('#carouselNews').carousel('prev')
})

$('#carouselNews').carousel({
    interval: 1000000
})


$('#carouselNews .carousel-item').each(function(){
    var next = $(this).next();
    if (!next.length) {
        next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));
        
    for (var i=0;i<2;i++) {
        next=next.next();
        if (!next.length){
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));
    }
});

$('#carouselNews').on('slide.bs.carousel', function(){
    $('#carouselNews .dark').removeClass('dark');
})

$('#carouselNews').on('slid.bs.carousel', function(){
    $('#carouselNews .carousel-item.active').children(':nth-child(2)').children().addClass('dark');
})

//анимация якорей

$('header li, header img, .slider-article button').click(function(){
    let link = $(this).attr('data-href');
    let top = $(link).offset().top - 60; //учитываем фиксированный хеадер
    jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: top}, 800);
})


//модальное окно - видео
$('.video svg').click(function(){
    $('#videoModal').modal('show');
})