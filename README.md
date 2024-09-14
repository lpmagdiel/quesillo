## quesillojs 🌯

Easily manage variables using the IDs of our HTML elements.
Manage events and assign values quickly and without adding weight to your website.

### Functionalities

 - getFromId 
 - getById 
 - getByClass 
 - getByTag 
 - createElement 
 - onClick 
 - onChange 
 - eventOn 
 - Pagination 


### DOM manipulation

**getFromId**
directly obtains a variable with the name of the **ID** that was assigned in the tag, to be able to use this function the tags must have the class **qs**

*Example:*

```html
<div id="text1" class="qs">text</div>
<h1 id="big-text" class="qs">hello</h1>

<script type="module">
import { getFromId } from "quesillo.js";
const { text1, bigText } = getFromId("elementHTML");

text1.innerText = "Aguacate";
</script>
```
Parameters:

 - **elementHTML**: return the HTML_ELEMENT
 - **text**: returns a function that allows us to directly change the *innerText* of the element, if during the invocation of the getFromId function a second true parameter is given, this function will work with numerical values.
 - **html**: returns a function that allows us to directly change the *innerHTML* of the element.
 - **value**: returns a function that allows us to directly change the *value* of the element, if during the invocation of the getFromId function a second true parameter is given, this function will work with numerical values.



**getById:** works as a *document.getElementById*
**getByClass:** works as a *document.getElementsByClassName
**getByTag:** works as a *document.getElementsByTagName*

**createElement :** works as a *document.createElement*

**onClick** 

Example:

```html
    <script type="module">
        import { getById, onClick } from "quesillo.js";
        const btnSayHello = getById('btn-say-hello')

        onClick(btnSayHello , e => {
            alert("Hello");
        });
    </script>
```

**onChange** 
**eventOn** 
**Pagination** 
