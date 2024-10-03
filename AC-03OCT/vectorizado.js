class Punto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function generarPuntos(n) {
    const puntos = [];
    for (let i = 0; i < n; i++) {
        const x = Math.random() * 500;
        const y = Math.random() * 500;
        puntos.push(new Punto(x, y));
    }
    return puntos;
}

// Dibujar en SVG
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
    polygon.setAttribute("fill", "rgba(255, 0, 0, 0.3)"); // Color de relleno
    polygon.setAttribute("stroke", "red");
    
    svg.appendChild(polygon);

    // Dibujar los puntos en SVG
    puntos.forEach(p => {
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", p.x);
        circle.setAttribute("cy", p.y);
        circle.setAttribute("r", 5);
        circle.setAttribute("fill", "blue"); // Color de los puntos
        svg.appendChild(circle);
    });

    svgContainer.appendChild(svg);
}

function direccion(p1, p2, p3) {
    return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
}

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

// Función para ordenar los puntos en sentido horario
function ordenarPuntosHorario(puntos) {
    const centroide = {
        x: puntos.reduce((acc, p) => acc + p.x, 0) / puntos.length,
        y: puntos.reduce((acc, p) => acc + p.y, 0) / puntos.length
    };

    puntos.sort((a, b) => {
        const anguloA = Math.atan2(a.y - centroide.y, a.x - centroide.x);
        const anguloB = Math.atan2(b.y - centroide.y, b.x - centroide.x);
        return anguloA - anguloB;
    });
}

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
