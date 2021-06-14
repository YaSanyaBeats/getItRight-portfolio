$(".slider").slick({
    dots: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: false,
    nextArrow: false
});



if(window.matchMedia('(max-width: 1280px)').matches){
    $("#galerie").slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        prevArrow: false,
        nextArrow: false
    })
}
else{
    $("#galerie").slick({
        slidesToShow: 4,
        slidesToScroll: 2,
        prevArrow: false,
        nextArrow: false
    })
}

let dish = 'pizza';
let dishes = $('.dish');

function updateMenu(dish){
    $('.dishes').animate({
        opacity: 0
    }, 100, 'linear')
    setTimeout(function(){
        dishes.each(function(index){
            if($(this).attr('data-dish') == dish){
                $(this).show();
            }
            else{
                $(this).hide();
            }
        });
        $('.dishes').animate({
            opacity: 1
        }, 100, 'linear')
    }, 250, 'linear')
    
}

updateMenu(dish);

$('ul.categories li').each( function() {
    this.addEventListener('click', function(){
        if(!(dish == $(this).attr('data-dish'))){
            updateMenu($(this).attr('data-dish'));
            dish = $(this).attr('data-dish');
        }
    });
})

