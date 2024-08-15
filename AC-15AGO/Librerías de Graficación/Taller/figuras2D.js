function mostrarCampos() {
    var figura = document.getElementById("figura").value;
    var coordenadasDiv = document.getElementById("coordenadas");
    coordenadasDiv.innerHTML = '';

    switch (figura) {
        case "circulo":
            coordenadasDiv.innerHTML = `
                <div class="input-coordenada">
                    <label for="centroX">Centro X:</label>
                    <input type="number" id="centroX" value="200">
                    <label for="centroY">Centro Y:</label>
                    <input type="number" id="centroY" value="200"><br/>
                    <label for="radio">Radio:</label>
                    <input type="number" id="radio" value="100">
                </div>`;
            break;

        case "cuadrado":
            coordenadasDiv.innerHTML = `
                <div class="input-coordenada">
                    <label for="v1x">Vértice 1 X:</label>
                    <input type="number" id="v1x" value="150">
                    <label for="v1y">Vértice 1 Y:</label>
                    <input type="number" id="v1y" value="150"><br/>
                    <label for="v2x">Vértice 2 X:</label>
                    <input type="number" id="v2x" value="250">
                    <label for="v2y">Vértice 2 Y:</label>
                    <input type="number" id="v2y" value="150"><br/>
                    <label for="v3x">Vértice 3 X:</label>
                    <input type="number" id="v3x" value="250">
                    <label for="v3y">Vértice 3 Y:</label>
                    <input type="number" id="v3y" value="250"><br/>
                    <label for="v4x">Vértice 4 X:</label>
                    <input type="number" id="v4x" value="150">
                    <label for="v4y">Vértice 4 Y:</label>
                    <input type="number" id="v4y" value="250">
                </div>`;
            break;

        case "triangulo":
            coordenadasDiv.innerHTML = `
                <div class="input-coordenada">
                    <label for="t1x">Vértice 1 X:</label>
                    <input type="number" id="t1x" value="200">
                    <label for="t1y">Vértice 1 Y:</label>
                    <input type="number" id="t1y" value="100"><br/>
                    <label for="t2x">Vértice 2 X:</label>
                    <input type="number" id="t2x" value="300">
                    <label for="t2y">Vértice 2 Y:</label>
                    <input type="number" id="t2y" value="300"><br/>
                    <label for="t3x">Vértice 3 X:</label>
                    <input type="number" id="t3x" value="100">
                    <label for="t3y">Vértice 3 Y:</label>
                    <input type="number" id="t3y" value="300">
                </div>`;
            break;
    }
}

function dibujarFigura() {
    var canvas = document.getElementById("miCanvas");
    var ctx = canvas.getContext("2d");
    var figura = document.getElementById("figura").value;

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Configuraciones de estilo
    var colorRelleno = document.getElementById("colorRelleno").value;
    var colorBorde = document.getElementById("colorBorde").value;
    var grosorBorde = document.getElementById("grosorBorde").value;

    ctx.fillStyle = colorRelleno;
    ctx.strokeStyle = colorBorde;
    ctx.lineWidth = grosorBorde;

    switch (figura) {
        case "circulo":
            var centroX = document.getElementById("centroX").value;
            var centroY = document.getElementById("centroY").value;
            var radio = document.getElementById("radio").value;
            ctx.beginPath();
            ctx.arc(centroX, centroY, radio, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            break;

        case "cuadrado":
            var v1x = document.getElementById("v1x").value;
            var v1y = document.getElementById("v1y").value;
            var v2x = document.getElementById("v2x").value;
            var v2y = document.getElementById("v2y").value;
            var v3x = document.getElementById("v3x").value;
            var v3y = document.getElementById("v3y").value;
            var v4x = document.getElementById("v4x").value;
            var v4y = document.getElementById("v4y").value;

            ctx.beginPath();
            ctx.moveTo(v1x, v1y);
            ctx.lineTo(v2x, v2y);
            ctx.lineTo(v3x, v3y);
            ctx.lineTo(v4x, v4y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            break;

        case "triangulo":
            var t1x = document.getElementById("t1x").value;
            var t1y = document.getElementById("t1y").value;
            var t2x = document.getElementById("t2x").value;
            var t2y = document.getElementById("t2y").value;
            var t3x = document.getElementById("t3x").value;
            var t3y = document.getElementById("t3y").value;

            ctx.beginPath();
            ctx.moveTo(t1x, t1y);
            ctx.lineTo(t2x, t2y);
            ctx.lineTo(t3x, t3y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            break;

        default:
            alert("Selecciona una figura válida.");
    }
}

// Mostrar campos al cargar la página
window.onload = mostrarCampos;