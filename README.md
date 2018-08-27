# quesillo 🌯
quesillo.js es una alternativa minimalista a JQuery para proyectos pequeños y no tan pequeños.
###funciones
> $([elemento]) : retorna el elemento o elementos cuyo id,clase o etiqueta sea especificado
Ejemplo:
```javascript
$('#my-div'); // retorna el elemento con el id my-div
$('#my-div').innerHTML = '<p>hola</>'; //inserta una etiqueta p dentro de el elemento con el id especificado
$('.rojo') // retorna un array con todos los elementos que tengan la clase especificada
$('aside') // retorna un array con todas las etiquetas espeficicadas
```
> $click([elemento],funcion); : asigna una funcion para el evento click 
Ejemplo:
```javascript
$('#my-div',function(){
  // tu codigo al hacer click
});

// mismo ejemplo con arrow funcion
$('#my-div',()=>{
  // tu codigo al hacer click
});
```
> otros eventos
Funcionan igual que el evento click
* load
* change
* over
* out
* keyDown
* keyUp
> $CSS([elemento],[asignar_valor]) : asigna un valor css a uno o varios elementos
Ejemplo:
```javascript
$CSS('p','color:red'); // cambia a rojo el color del texto de todas las etiquetas p
$CSS('#my-div','background:blue'); // cambia a azul el color del fondo del elemento con el id especificado
$CSS('.nav','textAlign:"center"'); // centrar el texto de todos los elementos con la clase .nav
```
> $POST(url,{datos},funcion_ok,funcion_error) : envia una peticion del tipo post usando fetc (en pruebas)
Ejemplo:
```javascript
$POST('miHost/index.php',{usuario:lpzMagdiel,pais:nicaragua},(res)=>{
  alert('la respuesta del servidor es: '+res);
},(err)=>{
  alert('ups paso algo: '+err);
});
```
> $log(texto) // equivalente a console.log
> $warn(texto) // equevalente a console.warn ⚠️
> $error(texto) // equevalente a console.error ⛔
