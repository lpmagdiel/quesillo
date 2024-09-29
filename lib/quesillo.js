/*  by Magdiel López
    https://github.com/lpmagdiel
*/
console.log(`🌯 use class %c"qs"`, 'color: #FF5733;');

const dom = document;
const domChildrens = () => Array.from(dom.querySelectorAll('.qs'));

const castUppercase = (str) => {
    if(!str.includes('-')) return str;
    const words = str.split('-');
    const casted = words.map((word, index) => index == 0 ? word : word.charAt(0).toUpperCase() + word.substring(1));
    return casted.join('');
}

/**
 * 
 * @param { "text" | "elementHTML" | "html" | "value" } type "text default"
 * @param {boolean} isNumber "converts the value property and innerText to number default is false"
 */
export const getFromId = (type = "text", isNumber = false) => {
    const ids = domChildrens().filter(el => el.id.length > 0);
    const objIds = {};
    ids.forEach(el => {
        if (type == "elementHTML")
            objIds[castUppercase(el.id)] = el;
        else if (type == "html") {
            objIds[castUppercase(el.id)] = (html) => {
                if (html)
                    el.innerHTML = html;
                else
                    return el.innerHTML;
            }
        }
        else if (type == "value") {
            objIds[castUppercase(el.id)] = (value) => {
                if (value === undefined)
                    return isNumber ? Number(el.value) : el.value;
                else
                    el.value = value;
            }
        }
        else {
            objIds[castUppercase(el.id)] = (text) => {
                if (text === undefined)
                    return isNumber ? Number(el.innerText) : el.innerText;
                else
                    el.innerText = '' + text;
            }
        }

    });
    return objIds;
}

export const getById = (el) => dom.getElementById(el);
export const getByClass = (el) => Array.from(dom.getElementsByClassName(el));
export const getByTag = (el) => Array.from(dom.getElementsByTagName(el));

export const createElement = (tag) => dom.createElement(tag);

/**
 * 
 * @param {elementHTML} element
 * @param {function} callback 
 * @returns 
 */
export const onClick = (element, callback) => element.addEventListener("click", callback);
/**
 * 
 * @param {elementHTML} element 
 * @param {function} callback 
 * @returns 
 */
export const onChange = (element, callback) => element.addEventListener("change", callback);

/**
 * 
 * @param {elementHTML} element 
 * @param {string} event 
 * @param {function} callback 
 * @returns 
 */
export const eventOn = (element, event, callback) => element.addEventListener(event, callback);

export class Pagination {
    constructor(pages = []) {
        this.pages = pages;
        this.active = '';
        for (let index = 0; index < this.pages.length; index++) {
            this.pages[index].display = this.pages[index].element.style.display;
            this.pages[index].element.style.display = "none";
        }
    }
    updateVisiblePage(page) {
        if (this.pages.findIndex(p => p.name === page) === -1) return;
        for (let index = 0; index < this.pages.length - 1; index++) {
            this.pages[index].element.style.display = "none";
        }
        this.pages.filter(p => p.name == page).forEach(p => {
            p.element.style.display = p.display;
        });
    }
    activePage(pageName) {
        this.active = pageName;
        this.updateVisiblePage(pageName);
    }
}
class local2json{

    /**
     * Inicializar datos
     * @constructor
     * @param {string} name - Nombre de la base de datos
     */
     constructor(name){
         this.name           = name;
         this.collections    = [];
         this.triggers       = [];
         if(localStorage.getItem(name)){
             this.collections = JSON.parse(localStorage.getItem(name));
         }
     }
     /**
      * Genera una cantidad aleatoria de caracteres
      * @param {number} MaxCharts - Cantidad maxima de caracteres a generar por defecto 30
      * @returns {string}
      */
     Id(MaxCharts=30){
         const letters = Array.from('abcdefghijklmnopqrstuvwxyz0123456789');
         let out = '';
         while (out.length <= MaxCharts){
             out += letters[Math.floor(Math.random() * 36)] ;
         }
         return out;
     }
     // collections control functions
     // private save data in localstorage
     #Save(){
         localStorage.setItem(this.name,JSON.stringify(this.collections));
     }
     /**
      * Crear una nueva coleccion de datos
      * @param {string} Collection - Nombre de la coleccion
      * @returns {boolean}
      */
     CreateCollection(Collection,generateId=false){
         if(this.ThisCollectionExist(Collection)) return false;
         this.collections.push({name:Collection,data:[],generateId});
         this.#Save();
         return true;
     }
     /**
      * 
      * @param {string} Collection - Nombre de la coleccion que se desea obtener
      * @returns {array} - Array de objetos dentro de esa coleccion
      */
     GetCollection(Collection){
         if(!this.ThisCollectionExist(Collection)) return [];
         return this.collections.filter(c=>c.name == Collection)[0].data;
     }
     #GetCollectionIndex(Collection){
         const data = this.collections.entries();
         let index = -1;
         for(const [key,value] of data){
             if(value.name==Collection) index=key;
         }
         return index;
     }
     CollectionItems(Collection){
         return this.GetCollection(Collection).length;
     }
     /**
      * 
      * @param {string} Collection - Nombre de la coleccion que se consultar
      * @returns {boolean}
      */
     ThisCollectionExist(Collection){
         return this.collections.filter(c => c.name == Collection).length > 0;
     }
     /**
      * 
      * @param {string} Collection - Nombre de la coleccion que se consultar
      * @param {array} data - Nuevo array de objetos
      * @returns {boolean}
      */
     UpdateCollection(Collection,data=[]){
         if(!this.ThisCollectionExist(Collection)){
             return false;
         }
         const i = this.#GetCollectionIndex(Collection);
         if(this.collections[i].generateId){
             data = data.map(x => (x.ID != undefined)? x.ID : this.Id());
         }
         this.collections[i].data = data;
         this.#Save();
         return true;
     }
     /**
      * 
      * @param {string} Collection - Nombre de la coleccion que se desea eliminar
      * @returns {boolean}
      */
     DeleteCollection(Collection){
         if(!this.ThisCollectionExist(Collection)){
             return false;
         }
         const i = this.#GetCollectionIndex(Collection);
         this.collections.splice(i, 1);
         this.#Save();
         return true;
     }
     // data control functions
 
     /**
      * 
      * @param {string} Collection - Nombre de la coleccion a ingresar nuevo registro
      * @param {object} item - Nuevo registro
      * @returns {boolean}
      */
     Insert(Collection,item){
         if(!this.ThisCollectionExist(Collection)) return false;
         const i = this.#GetCollectionIndex(Collection);
         if(this.collections[i].generateId) item.ID = this.Id();
         this.collections[i].data.push(item);
         this.#Save();
         for(let t in this.triggers){
             if(this.triggers[t].table == Collection && this.triggers[t].event == 'insert'){
                 this.triggers[t].fun();
             }
         }
         return true;
     }
     #ClearObject(obj){
         return Object.entries(obj);
     }
     #IsValidQuestion(question,val1,val2){
         const q = question;
         let valid = false;
         if(q=='==') valid = (val1 == val2);
         else if(q=='===') valid = (val1 === val2);
         else if(q=='<') valid = (val1 < val2);
         else if(q=='<=') valid = (val1 <= val2);
         else if(q=='>') valid = (val1 > val2);
         else if(q=='<=') valid = (val1 >= val2);
         else if(q=='!=') valid = (val1 != val2);
         else if(q=='%%') valid = (val2.indexOf(val1) > -1);
         return valid;
     }
     /**
      * 
      * @param {string} Collection - Nombre de la coleccion que se consultar
      * @param {string} searchParameter - consulta para buscar dentro de las colecciones
      * @returns {array}
      */
     Get(Collection,searchParameter){
         const SelectedCollection = this.GetCollection(Collection);
         const CountCollection = SelectedCollection.length;
         let result           = [];
         const val1           = searchParameter.split(' ',10)[0];
         const val2           = searchParameter.split(' ',10)[2];
         const question       = searchParameter.split(' ',10)[1];
         for(let i=0;i<CountCollection;i++){
             const parameters  = this.#ClearObject(SelectedCollection[i])
             for(let x=0;x<parameters.length;x++){
                 if(parameters[x][0] == val1){
                     const value = parameters[x][1];
                     if(this.#IsValidQuestion(question,val2,value)){
                         result.push(SelectedCollection[i]);
                         x = parameters.length;
                     }
                 }
             }
         }
         return result;
     }
     /**
      * 
      * @param {String} Collection 
      * @param {String} ID 
      * @returns {Object}
      */
     GetById(Collection,ID){
         const collection = this.GetCollection(Collection);
         return collection.filter(i => i.ID == ID)[0];
     }
     /**
      * 
      * @param {string} Collection - Nombre de la coleccion que se consultar
      * @param {string} searchParameter - consulta para buscar y eliminar registro dentro de las colecciones
      * @returns {boolean}
      */
     Delete(Collection,searchParameter){
         const i = this.#GetCollectionIndex(Collection);
         if(i < 0) return false;
         const val1           = searchParameter.split(' ',10)[0];
         const val2           = searchParameter.split(' ',10)[2];
         const question       = searchParameter.split(' ',10)[1];
         const newCollectionData = this.collections[i].data.filter(item => {
             return !(this.#IsValidQuestion(question,val2,item[val1]));
         });
         this.collections[i].data = newCollectionData;
         this.#Save();
         for(let t in this.triggers){
             if(this.triggers[t].table == Collection && this.triggers[t].event == 'delete'){
                 this.triggers[t].fun();
             }
         }
         return true;
     }
     /**
      * 
      * @param {string} Collection - Nombre de la coleccion que se consultar
      * @param {string} searchParameter - consulta para buscar y actualizar registro dentro de las colecciones
      * @param {object} newValue - datos con los que reemplazar registro antiguo
      * @returns {boolean}
      */
     Update(Collection,searchParameter,newValue){
         const i = this.#GetCollectionIndex(Collection);
         if(i< 0) return false;
         const val1           = searchParameter.split(' ',10)[0];
         const val2           = searchParameter.split(' ',10)[2];
         const question       = searchParameter.split(' ',10)[1];
         const newCollectionData = this.collections[i].data.map(item =>{
             let out = item;
             if((this.#IsValidQuestion(question,val2,item[val1]))){
                 out = newValue;
             }
             return out;
         });
         this.collections[i].data = newCollectionData;
         this.#Save();
         for(let t in this.triggers){
             if(this.triggers[t].table == Collection && this.triggers[t].event == 'update'){
                 this.triggers[t].fun();
             }
         }
         return true;
     }
     
     /**
      * 
      * @param {string} Collection - Nombre de la coleccion que asignar disparador
      * @param {string} event - nombre del evento a asignar
      * @param {Function} fx - funcion a ejecutar
      */
     Trigger(Collection,event,fx){
         this.triggers.push({table:Collection,event:event,fun:fx});
     }
     /**
      * Elimina todos los datos inclullendo las colecciones
      */
     Clear(){
         localStorage.clear();
         this.collections = [];
         this.triggers = [];
     }
 }
 
 export const localDB = () =>{
     const dbName = window.location.hostname + '-quesillo-db';
     return new local2json(dbName);
 }