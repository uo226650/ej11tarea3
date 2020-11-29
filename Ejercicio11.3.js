// Tarea 3: Mostrar un mapa estático en Google Maps con un marcador con la posición del usuario
// Asegurarse de que las preferencias del sistema dan permisos de ubicación

class MapaEstaticoGoogle {
    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
    }
    getPosicion(posicion){
        this.mensaje = "Se ha realizado correctamente la petición de geolocalización";
        this.longitud         = posicion.coords.longitude.toFixed(6); 
        this.latitud          = posicion.coords.latitude.toFixed(6);  
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed;       
    }
    verErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.mensaje = "El usuario no permite la petición de geolocalización"
            break;
        case error.POSITION_UNAVAILABLE:
            this.mensaje = "Información de geolocalización no disponible"
            break;
        case error.TIMEOUT:
            this.mensaje = "La petición de geolocalización ha caducado"
            break;
        case error.UNKNOWN_ERROR:
            this.mensaje = "Se ha producido un error desconocido"
            break;
        }
    }
    getLongitud(){
        return this.longitud;
    }
    getLatitud(){
        return this.latitud;
    }
    getAltitud(){
        return this.altitud;
    }

    verTodo(dondeVerlo){
        var ubicacion=document.getElementById(dondeVerlo);
        var datos='<p>'+ this.mensaje + '</p>';
        datos += '<ul>' 
        datos+='<li>Longitud: '+this.longitud +' grados</li>'; 
        datos+='<li>Latitud: '+this.latitud +' grados</li>';
        datos+='<li>Precisión de la longitud y latitud: '+ this.precision +' metros</li>';
        datos+='<li>Altitud: '+ this.altitude +' metros</li>';
        datos+='<li>Precisión de la altitud: '+ this.precisionAltitud +' metros</li>'; 
        datos+='<li>Rumbo: '+ this.rumbo +' grados</li>'; 
        datos+='<li>Velocidad: '+ this.velocidad +' metros/segundo</li>';
        datos+= '</ul>';
        ubicacion.innerHTML = datos;
    }
    getMapaEstaticoGoogle(dondeVerlo){
        var ubicacion=document.getElementById(dondeVerlo);
        
        var apiKey = "&key=AIzaSyC8aUp4J8B-MOmk6mg4A8cSsbE3qzEpB1g";
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var centro = "center=" + this.latitud + "," + this.longitud;
        var zoom ="&zoom=15";
        var tamaño= "&size=800x600";
        var marcador = "&markers=color:white%7Clabel:A%7C" + this.latitud + "," + this.longitud;
        var sensor = "&sensor=false"; 
        var tipoMapa = "&maptype=hybrid"
        
        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey + tipoMapa;
        ubicacion.innerHTML = "<img src='"+this.imagenMapa+"' alt='mapa estático de google' />";
    }

    presentarDatos(espacioTexto, espacioImagen){
        this.verTodo(espacioTexto);
        this.getMapaEstaticoGoogle(espacioImagen);
    }
}
var miMapa = new MapaEstaticoGoogle();

