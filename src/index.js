const idiomas = ['castellano', 'euskera']
let idioma_sel
const inicio = () => {
    const cabecera = document.getElementsByTagName('header')[0]
    const secciones = document.getElementsByTagName('section')[0]
    const titular = document.getElementById('titular')
    const eslogan = document.getElementById('eslogan')

    if (localStorage.idioma) { idioma_sel = localStorage.idioma } else { idioma_sel = 0 }







    fetch(`json/${idiomas[idioma_sel]}.json`)
        .then(response => response.json())
        .then(data => {
            cabecera.innerHTML = `<div>${data.titular.titulo}</div>
                                    <div> 
                                        <div><img src="img/whatsapp.png">watsapp</div> 
                                        <div><img src="img/telefono.png">Telefono</div> 
                                        <div><img src="img/email.png">e-mail</div> 
                                        <div onclick="idioma(${(idioma_sel == 0) ? 1 : 0})">
                                        <img src="img/idioma.png">${idiomas[(idioma_sel == 0) ? 1 : 0]}</div>
                                    </div>`
            titular.innerHTML = `<div></div>
                                <div>${data.titular.titulo}</div>
                                <div>${data.titular.descripcion}</div>`
            eslogan.innerHTML = data.titular.eslogan

            secciones.innerHTML = ''
            for (let i in data.secciones) {
                secciones.innerHTML += `<div style="background-image:url(img/${i}.jpg)">
                                            <div>${data.secciones[i].precio} €</div>
                                            <div>${data.secciones[i].titulo}</div>
                                            <div>${data.secciones[i].texto}</div>                                          
                                        </div>`
            }

        })
}
const idioma = i => {
    idioma_sel = i;
    //localStorage.setItem('idioma',idioma_sel)
    inicio()
}
window.onload = inicio