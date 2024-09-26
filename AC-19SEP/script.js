// Clase Punto
class Punto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// Clase de primitivas
class Primitiva {
    constructor(svgElement) {
        this.svgElement = svgElement;
    }

    crearElementoSVG(tipo, atributos) {
        const elemento = document.createElementNS("http://www.w3.org/2000/svg", tipo);
        for (let atributo in atributos) {
            elemento.setAttribute(atributo, atributos[atributo]);
        }
        this.svgElement.appendChild(elemento);
    }
}

// Clase para dibujar una línea
class Linea extends Primitiva {
    constructor(svgElement, punto1, punto2) {
        super(svgElement);
        this.punto1 = punto1;  // atributo punto1 de tipo Punto
        this.punto2 = punto2;  // atributo punto2 de tipo Punto
    }

    dibujar() {
        this.crearElementoSVG('line', {
            x1: this.punto1.x,
            y1: this.punto1.y,
            x2: this.punto2.x,
            y2: this.punto2.y,
            stroke: 'orange',
            'stroke-width': 2
        });
    }
}

// Clase para dibujar una circunferencia
class Circunferencia extends Primitiva {
    constructor(svgElement, cx, cy, r) {
        super(svgElement);
        this.cx = cx;
        this.cy = cy;
        this.r = r;
    }

    dibujar() {
        this.crearElementoSVG('circle', {
            cx: this.cx,
            cy: this.cy,
            r: this.r,
            stroke: 'red',
            'stroke-width': 2,
            fill: 'none'
        });
    }
}

// Clase para dibujar una elipse
class Elipse extends Primitiva {
    constructor(svgElement, cx, cy, rx, ry) {
        super(svgElement);
        this.cx = cx;
        this.cy = cy;
        this.rx = rx;
        this.ry = ry;
    }

    dibujar() {
        this.crearElementoSVG('ellipse', {
            cx: this.cx,
            cy: this.cy,
            rx: this.rx,
            ry: this.ry,
            stroke: 'pink',
            'stroke-width': 2,
            fill: 'none'
        });
    }
}

// Clase para dibujar un rectángulo
class Rectangulo extends Primitiva {
    constructor(svgElement, x, y, width, height) {
        super(svgElement);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    dibujar() {
        this.crearElementoSVG('rect', {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            stroke: 'blue',
            'stroke-width': 2,
            fill: 'none'
        });
    }
}

// Clase para dibujar una polilínea
class Polilinea extends Primitiva {
    constructor(svgElement, puntos) {
        super(svgElement);
        this.puntos = puntos;
    }

    dibujar() {
        const puntosString = this.puntos.map(punto => `${punto.x},${punto.y}`).join(' ');
        this.crearElementoSVG('polyline', {
            points: puntosString,
            stroke: 'green',
            'stroke-width': 2,
            fill: 'none'
        });
    }
}

// Clase para dibujar un polígono
class Poligono extends Primitiva {
    constructor(svgElement, puntos) {
        super(svgElement);
        this.puntos = puntos;
    }

    dibujar() {
        const puntosString = this.puntos.map(punto => `${punto.x},${punto.y}`).join(' ');
        this.crearElementoSVG('polygon', {
            points: puntosString,
            stroke: 'purple',
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
    const puntosPolilinea = [new Punto(50, 250), new Punto(150, 350), new Punto(200, 300)];

    // Dibuja una línea usando puntos
    const linea = new Linea(svg, punto1, punto2);
    linea.dibujar();

    // Dibuja una circunferencia
    const circunferencia = new Circunferencia(svg, 300, 100, 50);
    circunferencia.dibujar();

    // Dibuja una elipse
    const elipse = new Elipse(svg, 400, 300, 80, 50);
    elipse.dibujar();

    // Dibuja un rectángulo
    const rectangulo = new Rectangulo(svg, 50, 300, 100, 50);
    rectangulo.dibujar();

    // Dibuja una polilínea
    const polilinea = new Polilinea(svg, puntosPolilinea);
    polilinea.dibujar();

    // Dibuja un polígono
    const poligono = new Poligono(svg, [new Punto(350, 400), new Punto(400, 500), new Punto(300, 500)]);
    poligono.dibujar();
}

// Llamar a la función para dibujar las primitivas cuando se cargue la página
window.onload = dibujarPrimitivas;