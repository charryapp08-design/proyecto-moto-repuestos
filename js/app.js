document.addEventListener('DOMContentLoaded', function() {
    // Validación de Formulario nativa con Bootstrap
    const form = document.getElementById('formCotizacion');
    if(form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                alert('¡Cotización procesada exitosamente! Se ha enviado el resumen al correo proporcionado.');
            }
            form.classList.add('was-validated');
        }, false);
    }

    // Renderizado Dinámico en Canvas API
    const canvas = document.getElementById('salesCanvas');
    if (canvas && canvas.getContext) {
        const ctx = canvas.getContext('2d');
        
        // Rejilla del gráfico
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 50) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += 40) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        // Curva de ventas
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        const points = [160, 120, 140, 80, 90, 40, 70, 30];
        const step = canvas.width / (points.length - 1);
        
        points.forEach((point, index) => {
            const x = index * step;
            const y = point;
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();

        // Puntos de datos
        points.forEach((point, index) => {
            const x = index * step;
            const y = point;
            ctx.fillStyle = '#38bdf8';
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
        });

        // Texto informativo
        ctx.fillStyle = '#22c65e';
        ctx.font = '13px Roboto, sans-serif';
        ctx.fillText('Tendencia de Ventas: +24% este mes', 15, 25);
    }
});