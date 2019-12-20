const ULTIMO_NIVEL = 5

class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generarSecuencia()
    setTimeout(this.siguienteNivel, 500)
  }

  inicializar() {
    this.elegirColor = this.elegirColor.bind(this)
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.eliminarEventosClick = this.eliminarEventosClick.bind(this)
    this.nivel = 1
    this.btnEmpezar = document.querySelector("#btnEmpezar")
    this.toggleBtnEmpezar()
    this.colores = {
      celeste: document.querySelector("#celeste"),
      violeta: document.querySelector("#violeta"),
      naranja: document.querySelector("#naranja"),
      verde: document.querySelector("#verde")
    }
  }

  toggleBtnEmpezar() {
    if (this.btnEmpezar.classList.contains('hide')) {
      this.btnEmpezar.classList.remove('hide')
    } else {
      this.btnEmpezar.classList.add('hide')
    }
  }

  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL)
      .fill(0)
      .map(numero => Math.floor(Math.random() * 4))
  }

  siguienteNivel() {
    this.subnivel = 0
    this.iluminarSecuencia()
    this.agregarEventosClick()
  }

  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroAColor(this.secuencia[i])

      setTimeout(() => this.iluminarColor(color), 1000 * i)
    }
  }

  transformarNumeroAColor(numero) {
    switch (numero) {
      case 0:
        return 'celeste'
      case 1:
        return 'violeta'
      case 2:
        return 'naranja'
      case 3:
        return 'verde'
    }
  }

  transformarColorANumero(color) {
    switch (color) {
      case 'celeste':
        return 0
      case 'violeta':
        return 1
      case 'naranja':
        return 2
      case 'verde':
        return 3
    }
  }

  iluminarColor(color) {
    this.colores[color].classList.add('light')

    setTimeout(() => this.apagarColor(color), 350)
  }

  apagarColor(color) {
    this.colores[color].classList.remove('light')
  }

  agregarEventosClick() {
    this.colores.celeste.addEventListener('click', this.elegirColor)
    this.colores.violeta.addEventListener('click', this.elegirColor)
    this.colores.naranja.addEventListener('click', this.elegirColor)
    this.colores.verde.addEventListener('click', this.elegirColor)
  }

  eliminarEventosClick() {
    this.colores.celeste.removeEventListener('click', this.elegirColor)
    this.colores.violeta.removeEventListener('click', this.elegirColor)
    this.colores.naranja.removeEventListener('click', this.elegirColor)
    this.colores.verde.removeEventListener('click', this.elegirColor)
  }

  elegirColor(ev) {
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.transformarColorANumero(nombreColor)
    this.iluminarColor(nombreColor)

    if (numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++

      if (this.subnivel === this.nivel) {
        this.nivel++
        this.eliminarEventosClick()

        if (this.nivel === ULTIMO_NIVEL + 1) {
          this.ganoElJuego()
        } else {
          setTimeout(this.siguienteNivel, 1500)
        }
      }
    } else {
      this.perdioElJuego()
    }
  }

  ganoElJuego() {
    swal('Platzi', 'Felicitaciones ganaste el juego', 'success')
      .then(this.inicializar)
  }

  perdioElJuego() {
    swal('Platzi', 'Lo lamentamos, perdiste :(', 'info')
      .then(this.eliminarEventosClick)
      .then(this.inicializar)
  }
}

const empezarJuego = () => {
  window.juego = new Juego()
}
