let navClickListener = (e) =>{
    Array.from(e.currentTarget.children).forEach( el => el.firstChild.classList.remove("active-red-color"))
    e.target.classList.add("active-red-color");
}

let phoneClickListener = e => {
    let elements = Array.from(e.currentTarget.children)
    if (elements[1].classList.contains('hide'))
        elements[1].classList.remove('hide')
    else
        elements[1].classList.add('hide')
}

let portfolioNavClickListner = e =>{
    Array.from(e.currentTarget.children[0].children).forEach( element => {
        element.classList.remove('portfolio-active') 
        element.firstChild.classList.remove('portfolio-active')
    })
    
    e.target.classList.add('portfolio-active')
    e.target.parentNode.classList.add('portfolio-active')
}

let shuffle = e => {
    console.log(e.currentTarget)
    console.log(e.target)
}

let portfolioClickListner = e =>{
    Array.from(e.currentTarget.children).forEach( el => el.classList.remove("portfolio-active-border"))
    e.target.classList.add("portfolio-active-border");
}

document.getElementById("header-naw-list").addEventListener("click", navClickListener);
document.getElementById("phone-v").addEventListener("click", phoneClickListener);
document.getElementById("phone-h").addEventListener("click", phoneClickListener);
document.getElementsByClassName("navContainer")[0].addEventListener("click", portfolioNavClickListner);

document.getElementsByClassName("portfolio-container")[0].addEventListener("click", portfolioClickListner);

