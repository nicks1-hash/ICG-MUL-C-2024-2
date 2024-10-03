class Punto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let modoDibujo = 'rasterizada'; // Modo predeterminado

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

// Función personalizada para dibujar los puntos
function dibujarPuntos(ctx, puntos) {
    ctx.fillStyle = 'blue'; // Color de los puntos
    for (let i = 0; i < puntos.length; i++) { // Reemplazamos forEach con un bucle for
        const p = puntos[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Función personalizada para dibujar la figura
function dibujarFigura(ctx, puntos) {
    ctx.strokeStyle = 'red'; // Color de la figura
    ctx.beginPath();
    ctx.moveTo(puntos[0].x, puntos[0].y);
    for (let i = 1; i < puntos.length; i++) { // Reemplazamos forEach con un bucle for
        ctx.lineTo(puntos[i].x, puntos[i].y);
    }
    ctx.closePath();
    
    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)'; // Color de relleno
    ctx.fill();
    ctx.stroke();
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
    // Calculamos el centroide
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

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarPuntos(ctx, puntos);
    dibujarFigura(ctx, puntos);

    const convexa = esConvexa(puntos);
    const tipo = convexa ? 'convexa' : 'cóncava';
    
    // Limpiar el texto anterior y mostrar el nuevo estado
    document.getElementById('info').innerText = `La figura generada es ${tipo}.`;
});
