# quesillo 🌯
quesillo.js es una alternativa minimalista a JQuery para proyectos pequeños y no tan pequeños. <br/>
###funciones<br/>
Descargar la version 1.0.0 comprimida <a href="https://lpzmagdiel.neocities.org/quesillo/quesillo.min.js" target="_blank">aqui</a><br/>
Descargar la version 1.0.0 sin comprimir <a href="https://lpzmagdiel.neocities.org/quesillo/quesillo.js" target="_blank">aqui</a>
> $([elemento]) : retorna el elemento o elementos cuyo id,clase o etiqueta sea especificado <br/>
Ejemplo:
```javascript
$('#my-div'); // retorna el elemento con el id my-div
$('#my-div').innerHTML = '<p>hola</>'; //inserta una etiqueta p dentro de el elemento con el id especificado
$('.rojo') // retorna un array con todos los elementos que tengan la clase especificada
$('aside') // retorna un array con todas las etiquetas espeficicadas
```
> $click([elemento],funcion); : asigna una funcion para el evento click <br/>
Ejemplo:
```javascript
$click('#my-div',function(){
  // tu codigo al hacer click
});

// mismo ejemplo con arrow funcion
$click('#my-div',()=>{
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
> $setCSS([elemento],[asignar_valor]) : asigna un valor css a uno o varios elementos <br/>
Ejemplo:
```javascript
$setCSS('p','color:red'); // cambia a rojo el color del texto de todas las etiquetas p
$setCSS('#my-div','background:blue'); // cambia a azul el color del fondo del elemento con el id especificado
$setCSS('.nav','textAlign:"center"'); // centrar el texto de todos los elementos con la clase .nav
```
> $getCSS([elemento],[valor]) : devuelve un valor css de el elemento <br/>
Ejemplo:
```javascript
$getCSS('p','color'); // obtiene el color del texto de todas las etiquetas p
$getCSS('#my-div','background'); // caobtiene el color del fondo del elemento con el id especificado
$getCSS('.nav','textAlign');
```
> $POST(url,{datos},funcion_ok,funcion_error) : envia una peticion del tipo post usando fetc<br/>
Ejemplo:
```javascript
$POST('miHost/index.php',{usuario:lpzMagdiel,pais:nicaragua},(res)=>{
  alert('la respuesta del servidor es: '+res);
},(err)=>{
  alert('ups paso algo: '+err);
});
```
> $GET(url,funcion_ok,funcion_error) : envia una peticion del tipo get usando fetc<br/>
Ejemplo:
```javascript
$GET('miHost/index.php',(res)=>{
  alert('la respuesta del servidor es: '+res);
},(err)=>{
  alert('ups paso algo: '+err);
});
```
> $ajax(url,metodo,datos,funcion_ok,funcion_error) : envia una peticion usando ajax<br/>
Ejemplo:
```javascript
function finalizado(res){
	console.log(res);
}
function error(res){
	console.log('Ups hay un error: ' + res);
}

$ajax('archivo.txt','GET',{nombre:'peter parker'},finalizado,error);
```
> $log(texto) // equivalente a console.log <br/>
> $warn(texto) // equevalente a console.warn ⚠️ <br/>
> $error(texto) // equevalente a console.error ⛔ <br/>
> $forNum(inicio,final,funcion) : ejecuta un bucle numerico usando programacion fucional<br/>
Ejemplo:
```javascript
$forNum(5,50,(n)=>$log(n)); // muestra por consola los numeros del 5 al 50
```
Ejemplo con arrays:
```javascript
let arr = [a,b,c,x,y,z];
$forNum(0,arr.length-1,(n)=>{
	$log(arr[n]);
});
```
> $forText(array,funcion) : recorre una cadena de texto usando programacion funcional, aquivalente a forEach<br/>
Ejemplo:
```javascript
let marr = ['hola','mundo','desde','Nicaragua'];
$forText(marr,(t)=>$log(t));
```
Ejemplo, contar cuanto se repite la letra a:
```javascript
let marr = 'hola mundo desde Nicaragua';
let count = 0;
forText(marr,(t)=>{
  if(t=='a') count++;
});

$log(`la letra a se repite ${count} veces`);
```
> $fadeOut(elemento) : desaparece el elemento con una animacion que dura 500ms<br>
> $fadeIn(elemento) : aparece el elemento con una animacion que dura 500ms<br>
