// quesillo.js
const $ = x => document.querySelector(x);
const $click=(el,f)=>$(el).addEventListener('click',f);
const $load=(el,f)=>$(el).addEventListener('load',f);
const $change=(el,f)=>$(el).addEventListener('change',f);
const $over=(el,f)=>$(el).addEventListener('mouseover',f);
const $out=(el,f)=>$(el).addEventListener('mouseout',f);
const $keyDown=(el,f)=>$(el).addEventListener('keydown',f);
const $keyUp=(el,f)=>$(el).addEventListener('keyup',f);
const $CSS=(el,val)=>{if($(el)[0]==undefined){$(el).style = val}else{for(var i=0;i< $(el).length;i++){$(el)[i].style=val}}}
const $GET=(url,ok,err)=>{
let params = {
        method: 'GET', 
        mode: 'cors', 
        redirect: 'follow',
        headers: new Headers( {
            'Content-Type': 'application/json'
        } )
    };     
fetch( url ).then( r => r.json() )
    .then( data => ok(data) )
    .catch( r => err(r) );
}
const $POST=(url,dt,ok,err)=>{
let params = {
        method: 'POST', 
        mode: 'cors', 
        redirect: 'follow',
        body: JSON.stringify(dt),
        headers: new Headers( {
            'Content-Type': 'application/json'
        } )
    };     
fetch( url ).then( r => r.json() )
    .then( data => ok(data) )
    .catch( r => err(r) );
}
const $log=console.log;
const $warn=console.warn;
const $error=console.error;
const $forNum = (a,b,f) =>{
  if(a<b){f(a);return forNum(a+1,b,f)}
  if(a>b){f(a);return forNum(a-1,b,f)}
}
const $forText = (arr,f) =>{
  if(arr.length>0){
    f(arr[0]);
    return forText(arr.slice(1),f);
  }
}
const $fadeOut=el=>{
    let a = $(el).animate([
      {opacity: '1'},
      {opacity: '0'}
    ], 500);
    a.addEventListener('finish', function() {
      $(el).style.opacity = '0';
      $(el).style.transform = 'scale(0)';
    });
};
const $fadeIn=el=>{
    let a = $(el).animate([
      {opacity: '0'},
      {opacity: '1'}
    ], 500);
    a.addEventListener('finish', function() {
      $(el).style.opacity = '1';
      $(el).style.transform = 'scale(1)';
    });
};