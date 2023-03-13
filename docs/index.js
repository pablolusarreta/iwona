const idiomas = ['castellano', 'euskera']
let idioma_sel
const inicio = () => {
    // CONSTANTES
    const cabecera = document.getElementsByTagName('header')[0]
    const secciones = document.getElementsByTagName('section')[0]
    const pie = document.getElementsByTagName('footer')[0]
    const titular = document.getElementById('titular')
    const eslogan = document.getElementById('eslogan')
    const ofertas = document.getElementById('ofertas')
    // IDIOMA
    if (localStorage.idioma) { idioma_sel = localStorage.idioma } else { idioma_sel = 0 }
    // ARRANQUE
    fetch(`json/${idiomas[idioma_sel]}.json`)
        .then(response => response.json())
        .then(data => {
            cabecera.innerHTML = `<div>${fechaActual()}</div>
                                    <div> 
                                        <a href="https://api.whatsapp.com/send?phone=34678194512&text=" target="_blank"><img src="img/whatsapp.png">watsapp</a> 
                                        <a href="tel:346781945" target="_blank"><img src="img/telefono.png">llamar</a> 
                                        <a href="mailto:iwona@gmail.com" target="_blank"><img src="img/email.png">e-mail</a> 
                                        <a onclick="idioma(${(idioma_sel == 0) ? 1 : 0})">
                                        <img src="img/idioma.png">${idiomas[(idioma_sel == 0) ? 1 : 0]}</a>
                                    </div>`
            titular.innerHTML = `<div></div>
                                <div>${data.titular.titulo}</div>
                                <div>${data.titular.descripcion}</div>`
            eslogan.innerHTML = data.titular.eslogan
            ofertas.innerHTML = data.titular.ofertas

            secciones.innerHTML = ''
            for (const i in data.secciones) {
                secciones.innerHTML += `<div style="background-image:url(img/${i}.jpg)">
                                            <div>${data.secciones[i].precio} €</div>
                                            <div>${data.secciones[i].titulo}</div>
                                            <div>${data.secciones[i].texto}</div>                                          
                                        </div>`
            }

            for (const i in data.pie) {
                pie.innerHTML += `<div><img src="img/${data.pie[i].titulo}.png">
                                <span>${data.pie[i].titulo}</span>
                                <br>
                                ${data.pie[i].texto}</div>`
            }
        })
}
const idioma = i => {
    idioma_sel = i;
    //localStorage.setItem('idioma',idioma_sel)
    inicio()
}
const fechaActual = () => {
    const hoy = new Date()
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    return (`${diasSemana[hoy.getDay()]}, ${hoy.getDate()} de ${meses[hoy.getMonth()]} de ${hoy.getFullYear()}`)
}
window.onload = inicio