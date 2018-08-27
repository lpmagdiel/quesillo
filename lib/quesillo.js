// quesillo.js
const $=el=>{
  let d = document;
  if(el[0]=='#')return d.getElementById(el.slice(1));
  else if(el[0]=='.')return d.getElementsByClassName(el.slice(1));
  else return d.getElementsByTagName(el);
}
const $click=(el,f)=>$(el).addEventListener('click',f);
const $load=(el,f)=>$(el).addEventListener('load',f);
const $change=(el,f)=>$(el).addEventListener('change',f);
const $over=(el,f)=>$(el).addEventListener('mouseover',f);
const $out=(el,f)=>$(el).addEventListener('mouseout',f);
const $keyDown=(el,f)=>$(el).addEventListener('keydown',f);
const $keyUp=(el,f)=>$(el).addEventListener('keyup',f);
const $CSS=(el,val)=>{if($(el)[0]==undefined){$(el).style = val}else{for(var i=0;i< $(el).length;i++){$(el)[i].style=val}}}
const $POST=(url,data,f,fer)=>{
  fetch(url, {
  method: 'POST',body: JSON.stringify(data),
  headers:{'Content-Type': 'application/json'}
}).then(res => res.json()).catch(error => fer(error)).then(response => f(response));
}
const $log=console.log;
const $warn=console.warn;
const $error=console.error;