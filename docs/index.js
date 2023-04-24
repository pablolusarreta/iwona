const idiomas = ['castellano', 'euskera']
let idioma_sel, foto, DATOS
const inicio = () => {
    // CONSTANTES
    const cabecera = document.getElementsByTagName('header')[0]
    const secciones = document.getElementsByTagName('section')[0]
    const pie = document.getElementsByTagName('footer')[0]
    const titular = document.getElementById('titular')
    const eslogan = document.getElementById('eslogan')
    const coletilla = document.getElementById('coletilla')
    const imgPortada = document.getElementById('imgPortada')
    imgPortada.addEventListener('load', () => {
        imgPortada.style.opacity = '1'
    })
    // ARRANQUE
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            DATOS = data
            DATOS.imagenes = ["P01.jpg", "P02.jpg", "P03.jpg", "P04.jpg", "P05.jpg", "P06.jpg", "P07.jpg", "P08.jpg"]                
            cabecera.innerHTML = `<div>${fechaActual()}</div>
                                    <div> 
                                        <a href="https://api.whatsapp.com/send?phone=34678194512&text=" target="_blank"><img src="img/whatsapp.png">watsapp</a> 
                                        <a href="tel:346781945" target="_blank"><img src="img/telefono.png">llamar</a> 
                                        <a href="mailto:iwonamasaje@gmail.com" target="_blank"><img src="img/email.png">e-mail</a> 
                                    </div>`
            titular.innerHTML = `<div></div>
                                <div>${data.titular.titulo}</div>
                                <div>${data.titular.descripcion}</div>`
            foto = Math.floor(data.imagenes.length * Math.random())
            eslogan_pres()
            presentacion()

            coletilla.innerHTML = data.titular.coletilla

            secciones.innerHTML = ''
            for (const i in data.secciones) {
                secciones.innerHTML += `<div style="background-image:url(img/${i}.jpg)">
                                            <div>${data.secciones[i].precio} €</div>
                                            <div>${data.secciones[i].titulo}</div>
                                            <div>${data.secciones[i].texto}</div>                                          
                                        </div>`
            }

            for (const i in data.pie) {
                pie.innerHTML += `<div><img src="img/${data.pie[i].img}">
                                <span>${data.pie[i].titulo}</span>
                                <br>
                                ${data.pie[i].texto}</div>`
            }
            setInterval(presentacion, 5000)
            movil()
        })
}
const presentacion = () => {
    imgPortada.style.opacity = '0'
    setTimeout(() => {
        imgPortada.src = `img/${DATOS.imagenes[foto]}`
        foto = (foto == (DATOS.imagenes.length - 1)) ? 0 : foto + 1
    }, 500)
}
const eslogan_pres = () => {
    let num = Math.floor(DATOS.titular.eslogan.length * Math.random())
    eslogan.innerHTML = DATOS.titular.eslogan[num]
    eslogan.style.opacity = '1'
}
const fechaActual = () => {
    const hoy = new Date()
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    return (`${diasSemana[hoy.getDay()]}, ${hoy.getDate()} de ${meses[hoy.getMonth()]} de ${hoy.getFullYear()}`)
}
const movil = () => {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)) {
        document.getElementById("estilo").setAttribute('href', 'movil.css')
    }
}
window.onload = inicio