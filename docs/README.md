# Quesillo.js Documentation 🌯

## Overview
Quesillo.js is a lightweight JavaScript utility library that provides easy-to-use DOM manipulation, event handling, AJAX utilities, pagination, and state management functionalities. It's designed to simplify common web development tasks while maintaining a small footprint.

## Installation
Simply include the quesillo.js file in your project:

```html
<script type="module" src="path/to/quesillo.js"></script>
```

## Core Features

### DOM Selection and Manipulation
- **$q(selector)**: Main function to create a Quesillo instance
- DOM manipulation methods (html, text, val)
- Class manipulation (addClass, removeClass, toggleClass)
- Attribute handling (attr)

### Event Handling
- Event binding with `on(event, callback)`
- Simplified event handling methods

### AJAX Utilities
- Full AJAX support with `ajax(url, options)`
- Shorthand methods: get, post, put, delete

### Pagination
- Built-in pagination system
- Easy page management and transitions

### State Management
- Svelte-like store implementation
- Reactive state updates

## API Reference

### Core ($q)
```javascript
const $q = selector => new Quesillo(selector)
```

### DOM Manipulation
- `html(content)`: Get/Set innerHTML
- `text(content)`: Get/Set textContent
- `val(value)`: Get/Set form element values

### Event Handling
```javascript
$q(selector).on(eventName, callback)
```

### Class Manipulation
- `addClass(className)`
- `removeClass(className)`
- `toggleClass(className)`

### AJAX Methods
```javascript
// Basic AJAX call
$q().ajax(url, options)

// Shorthand methods
$q().get(url, options)
$q().post(url, data, options)
$q().put(url, data, options)
$q().delete(url, options)
```

### Pagination
```javascript
const pagination = new Pagination([
    { name: 'page1', element: element1 },
    { name: 'page2', element: element2 }
]);

// Methods
pagination.show(pageName)
pagination.add(name, element)
pagination.remove(name)
```

### Store (State Management)
```javascript
const store = new Store(initialValue);

// Subscribe to changes
store.subscribe(value => {
    // Handle value changes
});

// Update store value
store.set(newValue);
store.update(currentValue => newValue);
```

## Browser Support
Quesillo.js supports all modern browsers that implement standard DOM APIs and ES6+ features.

## License
MIT License

## Author
Magdiel López - [GitHub](https://github.com/lpmagdiel)