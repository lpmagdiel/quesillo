/*  by Magdiel López
    https://github.com/lpmagdiel
*/
console.log(`🌯 Quesillo.js loaded %c v1.0`, 'color: #FF5733;');

class Quesillo {
    constructor(selector) {
        this.elements = selector instanceof Element ? [selector] : 
                       Array.from(document.querySelectorAll(selector || '.qs'));
    }

    // DOM manipulation
    html(content) {
        if (content === undefined) return this.elements[0]?.innerHTML;
        this.elements.forEach(el => el.innerHTML = content);
        return this;
    }

    text(content) {
        if (content === undefined) return this.elements[0]?.textContent;
        this.elements.forEach(el => el.textContent = content);
        return this;
    }

    val(value) {
        if (value === undefined) return this.elements[0]?.value;
        this.elements.forEach(el => el.value = value);
        return this;
    }

    // Events
    on(event, callback) {
        this.elements.forEach(el => el.addEventListener(event, callback));
        return this;
    }

    // Classes
    addClass(className) {
        this.elements.forEach(el => el.classList.add(className));
        return this;
    }

    removeClass(className) {
        this.elements.forEach(el => el.classList.remove(className));
        return this;
    }

    toggleClass(className) {
        this.elements.forEach(el => el.classList.toggle(className));
        return this;
    }

    // Attributes
    attr(name, value) {
        if (value === undefined) return this.elements[0]?.getAttribute(name);
        this.elements.forEach(el => el.setAttribute(name, value));
        return this;
    }
    // AJAX Utilities
    async ajax(url, options = {}) {
        try {
            const response = await fetch(url, {
                method: options.method || 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                body: options.data ? JSON.stringify(options.data) : null,
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            return await response.text();
        } catch (error) {
            console.error('Ajax Error:', error);
            throw error;
        }
    }

    // Shorthand methods
    get(url, options = {}) {
        return this.ajax(url, { ...options, method: 'GET' });
    }

    post(url, data, options = {}) {
        return this.ajax(url, { ...options, method: 'POST', data });
    }

    put(url, data, options = {}) {
        return this.ajax(url, { ...options, method: 'PUT', data });
    }

    delete(url, options = {}) {
        return this.ajax(url, { ...options, method: 'DELETE' });
    }
}

// Main function to create Quesillo instance
export const $q = (selector) => new Quesillo(selector);

// Utility functions
export const createElement = (tag) => document.createElement(tag);

// Enhanced Pagination class
export class Pagination {
    constructor(pages = []) {
        this.pages = new Map(pages.map(page => [
            page.name,
            { element: page.element, display: page.element.style.display || 'block' }
        ]));
        this.active = '';
        this.hideAll();
    }

    hideAll() {
        for (const [_, page] of this.pages) {
            page.element.style.display = 'none';
        }
    }

    show(pageName) {
        if (!this.pages.has(pageName)) return false;
        this.hideAll();
        const page = this.pages.get(pageName);
        page.element.style.display = page.display;
        this.active = pageName;
        return true;
    }

    add(name, element) {
        this.pages.set(name, {
            element,
            display: element.style.display || 'block'
        });
        if (!this.active) this.show(name);
    }

    remove(name) {
        this.pages.delete(name);
    }
}

// State management (Svelte-like)
export class Store {
    constructor(initialValue) {
        this.value = initialValue;
        this.subscribers = new Set();
    }

    subscribe(callback) {
        this.subscribers.add(callback);
        callback(this.value);
        return () => this.subscribers.delete(callback);
    }

    set(newValue) {
        this.value = newValue;
        this.subscribers.forEach(callback => callback(this.value));
    }

    update(fn) {
        this.set(fn(this.value));
    }
}
