let button = document.getElementById("menu");
let ul = button.parentElement;

button.addEventListener("click", function(){
    ul.classList.toggle("active");
    document.body.classList.toggle("scrollOff");
})

//плавная прокрутка к якорю
const anchors = document.querySelectorAll('a[href*="#"]')
for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()
        
        const blockID = anchor.getAttribute('href').substr(1);
        
        document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
        })

        ul.classList.toggle("active");
    })
}