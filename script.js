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

    let items = document.getElementsByClassName("portfolio-container")[0].children
    Array.from(items).forEach( e => {
        let rand = Math.floor( Math.random()*100 )
        e.style.order = rand        
    })
}

let portfolioClickListner = e =>{
    Array.from(e.currentTarget.children).forEach( el => el.classList.remove("portfolio-active-border"))
    e.target.classList.add("portfolio-active-border");
}

let formSubmitListener = e => {
    e.preventDefault()
    document.getElementById("form-submit-message").classList.remove('hide')

    let subject = String(document.getElementById("subject-input").value);
    let description = String(document.getElementById("description-input").value);

    subject === ''  ?
                    document.getElementById("subject-show").innerHTML = "no subject"
                    :
                    document.getElementById("subject-show").innerHTML = String().concat("Subject : ", subject)
    
    description === ''  ?
                            document.getElementById("description-show").innerHTML = "no description"
                        :
                            document.getElementById("description-show").innerHTML = String().concat("Description : ", description)                        
}

let okButtonListener = e => {
    document.getElementById("form-submit-message").classList.add('hide')    
    document.getElementById("submit-form").reset()
}

document.getElementById("header-naw-list").addEventListener("click", navClickListener);
document.getElementById("phone-v").addEventListener("click", phoneClickListener);
document.getElementById("phone-h").addEventListener("click", phoneClickListener);
document.getElementsByClassName("navContainer")[0].addEventListener("click", portfolioNavClickListner);

document.getElementsByClassName("portfolio-container")[0].addEventListener("click", portfolioClickListner);
document.getElementById("submit-form").addEventListener("submit", formSubmitListener);
document.getElementById("OK-button").addEventListener("click", okButtonListener);


