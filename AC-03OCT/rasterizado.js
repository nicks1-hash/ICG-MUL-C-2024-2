class Punto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let modoDibujo = 'rasterizada'; // Modo predeterminado

function generarPuntos(n) {
    const puntos = [];
    for (let i = 0; i < n; i++) {
        const x = Math.random() * 500;
        const y = Math.random() * 500;
        puntos.push(new Punto(x, y));
    }
    return puntos;
}

// Dibuja la figura en el canvas
function dibujarPuntos(ctx, puntos) {
    ctx.fillStyle = 'blue'; // Color de los puntos
    puntos.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fill();
    });
}

function dibujarFigura(ctx, puntos) {
    ctx.strokeStyle = 'red'; // Color de la figura
    ctx.beginPath();
    ctx.moveTo(puntos[0].x, puntos[0].y);
    puntos.forEach(p => {
        ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    
    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)'; // Color de relleno
    ctx.fill();
    ctx.stroke();
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
