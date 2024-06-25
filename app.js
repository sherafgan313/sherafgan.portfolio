const section = document.querySelectorAll('.section')
const sectBtns = document.querySelectorAll('.controlls')
const sectBtn = document.querySelectorAll('.control')
const allSections = document.querySelector('.main-content')


function pageTransitions(){
    // button click active class
    for(let i=0; i<sectBtn.length; i++){
        sectBtn[i].addEventListener('click', function(){
            let currentBtn = document.querySelectorAll('.active-btn')
            currentBtn[0].className = currentBtn[0].className.replace('active-btn', '')
            this.className += ' active-btn'
        })
    }
    //sections active
    allSections.addEventListener('click', (e) =>{
        const id = e.target.dataset.id
        if(id){
            //remove selected from other btns
            sectBtns.forEach((btn) =>{
                btn.classList.remove('active')
            })
            e.target.classList.add('active')

            //hide other sections
            section.forEach((section) =>{
                section.classList.remove('active')
            })

            const element = document.getElementById(id)
            element.classList.add('active')
        }
    })

    //Toggle Theme
    const themeBtn = document.querySelector(".theme-btn")
    themeBtn.addEventListener('click', () =>{
        let element = document.body
        element.classList.toggle('light-mode')
    })

    // Form submission and validation
    const form = document.getElementById('contactForm');
    if (form) {
        form.action = CONFIG.FORMSPREE_URL;
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Check if all required fields are filled
            const requiredFields = form.querySelectorAll('[required]');
            let allFieldsFilled = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    allFieldsFilled = false;
                }
            });

            if (!allFieldsFilled) {
                alert('Please fill in all the fields.');
                return;
            }

            // If all fields are filled, proceed with form submission
            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    alert('Thanks for your submission!');
                    form.reset();
                } else {
                    alert('Oops! There was a problem submitting your form');
                }
            }).catch(error => {
                alert('Oops! There was a problem submitting your form');
            });
        });
    }
}

pageTransitions()