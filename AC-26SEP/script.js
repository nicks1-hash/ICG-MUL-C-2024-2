// Clase Punto
class Punto {
    #x; // Atributo privado
    #y; // Atributo privado

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    // Métodos para obtener las coordenadas (getters)
    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }
}

// Clase de primitivas
class Primitiva {
    #svgElement; // Atributo privado

    constructor(svgElement) {
        this.#svgElement = svgElement;
    }

    crearElementoSVG(tipo, atributos) {
        const elemento = document.createElementNS("http://www.w3.org/2000/svg", tipo);
        for (let atributo in atributos) {
            elemento.setAttribute(atributo, atributos[atributo]);
        }
        this.#svgElement.appendChild(elemento);
    }
}

// Clase para dibujar una línea
class Linea extends Primitiva {
    #punto1; // Atributo privado
    #punto2; // Atributo privado

    constructor(svgElement, punto1, punto2) {
        super(svgElement);
        this.#punto1 = punto1;
        this.#punto2 = punto2;
    }

    dibujar() {
        this.crearElementoSVG('line', {
            x1: this.#punto1.getX(),
            y1: this.#punto1.getY(),
            x2: this.#punto2.getX(),
            y2: this.#punto2.getY(),
            stroke: 'orange',
            'stroke-width': 2
        });
    }
}

// Clase para dibujar una circunferencia
class Circunferencia extends Primitiva {
    #cx; // Atributo privado
    #cy; // Atributo privado
    #r;  // Atributo privado

    constructor(svgElement, cx, cy, r) {
        super(svgElement);
        this.#cx = cx;
        this.#cy = cy;
        this.#r = r;
    }

    dibujar() {
        this.crearElementoSVG('circle', {
            cx: this.#cx,
            cy: this.#cy,
            r: this.#r,
            stroke: 'red',
            'stroke-width': 2,
            fill: 'none'
        });
    }
}

// Clase para dibujar una elipse
class Elipse extends Primitiva {
    #cx; // Atributo privado
    #cy; // Atributo privado
    #rx; // Atributo privado
    #ry; // Atributo privado

    constructor(svgElement, cx, cy, rx, ry) {
        super(svgElement);
        this.#cx = cx;
        this.#cy = cy;
        this.#rx = rx;
        this.#ry = ry;
    }

    dibujar() {
        this.crearElementoSVG('ellipse', {
            cx: this.#cx,
            cy: this.#cy,
            rx: this.#rx,
            ry: this.#ry,
            stroke: 'pink',
            'stroke-width': 2,
            fill: 'none'
        });
    }
}

// Función principal para dibujar las primitivas
function dibujarPrimitivas() {
    const svg = document.getElementById('svg');

    // Crear puntos
    const punto1 = new Punto(50, 50);
    const punto2 = new Punto(200, 200);

    // Dibuja una línea usando puntos
    const linea = new Linea(svg, punto1, punto2);
    linea.dibujar();

    // Dibuja una circunferencia
    const circunferencia = new Circunferencia(svg, 300, 100, 50);
    circunferencia.dibujar();

    // Dibuja una elipse
    const elipse = new Elipse(svg, 400, 300, 80, 50);
    elipse.dibujar();
}

// Llamar a la función para dibujar las primitivas cuando se cargue la página
window.onload = dibujarPrimitivas;