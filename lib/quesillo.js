// quesillo.js
const $ = element => {
  const s = element.substring(0, 1);
  if(s == '#') return document.getElementById(element.substring(1));
  if(s == '.') return document.getElementsByClassName(element.substring(1));
  else return document.getElementsByTagName(element);
}
const $log=console.log;
const $warn=console.warn;
const $error=console.error;
const $forNum = (a,b,f) =>{
  if(a<b){f(a);return forNum(a+1,b,f)}
  if(a>b){f(a);return forNum(a-1,b,f)}
}
/**
 * 
 * @param {Object} config
 * @returns {Object} proxy
 */
function createElement(config){
  const htmlElement = document.createElement(config.element);
  const obj = {
    element: htmlElement,
    value: config.value,
    html: config.html,
    text: config.text
  }
  if(obj.value) htmlElement.value = obj.value;
  if(obj.html) htmlElement.innerHTML = obj.html;
  if(obj.text) htmlElement.innerText = obj.text;
  const handler = {
    get: function(target,prop){
      if(prop == 'value') return target.value;
      if(prop == 'text') return target.innerText;
      if(prop == 'html') return target.innerHTML;
      if(prop == 'element') return target.element;
    },
    set: function(target,prop,value){
      if(prop == 'value'){
        target.value = value;
        target.element.value = value;
      }
      if(prop == 'text'){
        target.innerText = value;
        target.element.innerText = value;
      }
      if(prop == 'html'){
        target.innerHTML = value;
        target.element.innerHTML = value;
      }
    }
  }
  const prx = new Proxy(obj,handler);
  return prx;
}