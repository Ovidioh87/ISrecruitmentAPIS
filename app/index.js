const express = require('express');
const app = express();

//Configuración
app.set('port', process.env.PORT || 8079);

//Middleware
app.use(express.json());

//Rutas URLs
app.use(require('./routes/company.js'));

//Iniciar servidor
app.listen(app.get('port'), () => {
    console.log('Servidor levantado en el puerto ', app.get('port'));
});