function scopePalette(){
    let color = localStorage.getItem('palete') || 'white';
    const palleteIcon = document.querySelector('.palete');
    const body = document.querySelector('body');

    const changeColor = () => {
        const deleteIcons = document.querySelectorAll('.delete-icon img');

        if (color === 'white'){
            body.classList.remove('black');
            deleteIcons.forEach((icon)=>{
                icon.src = './assets/img/remove.png';
            });

            localStorage.setItem('palete', color)
            color = 'black';
            return;
        }
        body.classList.add('black');
        deleteIcons.forEach((icon)=>{
            icon.src = './assets/img/remove-white.png';
        });
        localStorage.setItem('palete', color)
        color = 'white';
    };   

    palleteIcon.addEventListener('click', changeColor);
    window.addEventListener('load', changeColor)

}

scopePalette();