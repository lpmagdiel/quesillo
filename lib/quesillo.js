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