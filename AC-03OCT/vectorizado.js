class Punto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// Función personalizada para generar puntos
function generarPuntos(n) {
    const puntos = [];
    for (let i = 0; i < n; i++) {
        const x = Math.floor(Math.random() * 500); // Cambiamos a Math.floor
        const y = Math.floor(Math.random() * 500); // Cambiamos a Math.floor
        puntos.push(new Punto(x, y));
    }
    return puntos;
}

// Función personalizada para dibujar en SVG
function dibujarSVG(puntos) {
    const svgContainer = document.getElementById('svgContainer');
    svgContainer.innerHTML = '';  // Limpiar cualquier contenido SVG previo

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "500");
    svg.setAttribute("height", "500");

    const polygon = document.createElementNS(svgNS, "polygon");
    const pointsAttr = puntos.map(p => `${p.x},${p.y}`).join(" ");
    polygon.setAttribute("points", pointsAttr);
    polygon.setAttribute("fill", "none"); // Sin relleno
    polygon.setAttribute("stroke", "black"); // Borde negro
    
    svg.appendChild(polygon);

    // Dibujar los puntos en SVG (sin color ni relleno)
    for (let i = 0; i < puntos.length; i++) { // Reemplazamos forEach con un bucle for
        const p = puntos[i];
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", p.x);
        circle.setAttribute("cy", p.y);
        circle.setAttribute("r", 0); // Sin radio, no se verá
        svg.appendChild(circle);
    }

    svgContainer.appendChild(svg);
}

// Función personalizada para calcular la dirección
function direccion(p1, p2, p3) {
    return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
}

// Función para verificar si la figura es convexa
function esConvexa(puntos) {
    let signo = null;
    for (let i = 0; i < puntos.length; i++) {
        const p1 = puntos[i];
        const p2 = puntos[(i + 1) % puntos.length];
        const p3 = puntos[(i + 2) % puntos.length];
        const d = direccion(p1, p2, p3);

        if (d !== 0) {
            const actualSigno = d > 0;
            if (signo === null) {
                signo = actualSigno;
            } else if (signo !== actualSigno) {
                return false; // Hay cambios de signo, es cóncava
            }
        }
    }
    return true; // No hay cambios de signo, es convexa
}

// Función personalizada para ordenar los puntos en sentido horario
function ordenarPuntosHorario(puntos) {
    // Calcular el centroide
    let sumaX = 0;
    let sumaY = 0;
    const numPuntos = puntos.length;

    for (let i = 0; i < numPuntos; i++) {
        sumaX += puntos[i].x; // Suma de coordenadas x
        sumaY += puntos[i].y; // Suma de coordenadas y
    }

    const centroide = new Punto(sumaX / numPuntos, sumaY / numPuntos); // Coordenadas del centroide

    // Ordenar los puntos en sentido horario
    for (let i = 0; i < puntos.length; i++) {
        for (let j = i + 1; j < puntos.length; j++) {
            const anguloA = Math.atan2(puntos[i].y - centroide.y, puntos[i].x - centroide.x);
            const anguloB = Math.atan2(puntos[j].y - centroide.y, puntos[j].x - centroide.x);
            if (anguloA > anguloB) {
                // Intercambiar puntos
                const temp = puntos[i];
                puntos[i] = puntos[j];
                puntos[j] = temp;
            }
        }
    }
}

// Manejar el evento de clic en el botón para generar la figura
document.getElementById('btnGenerar').addEventListener('click', () => {
    const cantidadPuntos = Math.floor(Math.random() * (20 - 3)) + 3; // Entre 3 y 20 puntos
    const puntos = generarPuntos(cantidadPuntos);

    // Ordenar los puntos en sentido horario
    ordenarPuntosHorario(puntos);
    dibujarSVG(puntos);

    const convexa = esConvexa(puntos);
    const tipo = convexa ? 'convexa' : 'cóncava';
    
    // Limpiar el texto anterior y mostrar el nuevo estado
    document.getElementById('info').innerText = `La figura generada es ${tipo}.`;
});
