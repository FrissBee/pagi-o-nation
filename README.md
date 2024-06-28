# Pagi-O-Nation

Pagi-O-Nation is an easy to implement **pagination** in your project, which can be customized from the layout.

# Preview

[You can view the demo here](https://pagi-o-nation.frissbee.de/)

# Run the repo

### With SQLite

This repo contains an SQLite database (see: `inc\pagi-o-nation.db`) to start the repo easily and quickly.

- Download or clone the repo. Use XAMPP (or an alternative) and open it with staring Apache Server.
- Enter your URL in `assets\js\js_Reload.js` and `assets\js\php_Reload.js`;
- Open `index.php` in your Browser.

### With MySQL

If you prefer to work with a MySQL database, proceed as follows:

- Download or clone the repo. Use XAMPP (or an alternative) and open it with staring Apache and MySql Server.
- Create a database and import the file: `inc\pagi-o-nation.sql`;
- Change your access data in `inc\db_connection.inc.php`.
- Set the variable `$SQLite_or_MySQL` to `true` in the files `inc\api.php` and `index.php` or delete the corresponding source code;
- Enter your URL in `assets\js\js_Reload.js` and `assets\js\php_Reload.js`;
- Open `index.php` in your Browser.

# Add Pagi-O-Nation to your project

**1. Step**

Implement the `assets\js\pagi-o-nation_1.0.0.js` file in your project.

**2. Step**

Insert the custom HTML tag `<pagi-o-nation></pagi-o-nation>` with the attributes (see below) into your PHP/HTML page at the desired position.

**3.Step**

Implement the necessary JavaScript source code in one of your JavaScript files (or create a new one).

See the example files for this:

- `assets\js\js_Reload.js`
- `assets\js\only-js_NOReload_tow-pagination.js`
- `assets\js\only-js_NOReload.js`
- `assets\js\php_Reload.js`
- `assets\js\fetch-api_NOReload.js`

### Here is a quick overview:

The HTML/PHP File

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pagi-O-Nation</title>

    <!-- 1. Implement the "Pagi-O-Nation"-File -->
    <script src="./assets/js/pagi-o-nation_1.0.0.js" defer></script>

    <!-- 2. Implement your JS-Files -->
    <script src="./assets/js/my-javascript-file.js" defer></script>
  </head>
  <body>
    <main>
      <!-- For the output of the data -->
      <div id="list"></div>

      <!-- 3. Implement the "pagi-o-nation"-Tag with the attributes. -->
      <!-- The "limit-count" attribute must be set here (not via JavaScript) -->
      <pagi-o-nation class="my-class-name" limit-count="10"></pagi-o-nation>
    </main>
  </body>
</html>
```

Your JavaScript file (example JSON API):

```js
const DOM_pagination = document.querySelector('pagi-o-nation.my-class-name');
const limit = DOM_pagination.getLimitCount(); // => Number of data to be displayed per page.

const setList = (data, offset, limit) => {
  // Your source code to display the data in the page.
};

const fetchData = async (limit) => {
  await fetch('https://jsonplaceholder.typicode.com/todos/')
    .then((response) => response.json())
    .then((json) => {
      // Sets the "total-list-count" attribute so that the total number of pages can be calculated.
      DOM_pagination.setTotalListCount(json.length);

      // Your function for displaying the data when the page is called up for the first time.
      setList(json, 1, limit);

      // Adding the EventListener with the "handle-current-page" event for clicking through the pages
      DOM_pagination.addEventListener('handle-current-page', (e) => {
        const currentPage = e.detail; // => current page number

        // You can calculate the "offset" yourself using the page number, or use the "calcOffset()" function.
        const offset = DOM_pagination.calcOffset(currentPage, limit);

        // Your function for displaying the data when a pagination button is clicked
        setList(json, offset, offset + limit - 1);
      });
    })
    .catch((error) => console.log(error));
};

fetchData(limit);
```

**For more information, see the comments in the respective files.**

# Attributes

#### Necessary attributes

- `limit-count` => **Must be set in the `<pagi-o-nation></pagi-o-nation>` tag** (not via JavaScript). Determines how much data should be displayed on the page.
- `total-list-count` => Total number of data. Is required to calculate the number of page buttons. Can be set via a Pagi-O-Nation function (see below).
- `page-number` => Number of the page number. Can be set via a Pagi-O-Nation function (see below).

#### Optional attributes (for design)

- `active-bg` => Sets the background color of the button that is active.
- `active-color` => Sets the text color of the button that is active.
- `inactive-bg` => Sets the background color of the buttons that are not active.
- `inactive-color` => Sets the text color of the buttons that are not active.

# Functions

The names of the functions should be self-explanatory. See the JavaScript files with the examples for more information.

- `goToURL(url: string): void`
- `getLimitCount(): number`
- `calcOffset(currentPageNumber: number | string, limit: number): number`
- `setTotalListCount(count: number | string): void`
- `setPageNumber(pageNumber: string | number): void`

# CSS

The layout of the pagination can be designed with the optional attributes and the pseudo-element `::part()` ([Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/::part)).

You can design:

- `nav-element-pagination`
- `nav-element-pagination`
- `li-element-pagination`
- `div-element-pagination`

Example with `::part()`:

```css
pagi-o-nation.demo_2::part(nav-element-pagination) {
  /* code... */
}
pagi-o-nation.demo_2::part(ul-element-pagination) {
  background-color: #f5f5f5;
  padding: 8px;
  border: 1px solid #d1d1d1;
  border-radius: 0.375rem;
}
pagi-o-nation.demo_2::part(li-element-pagination) {
  border-radius: 0.375rem;
  -webkit-box-shadow: 0px 7px 21px 1px rgba(0, 0, 0, 0.59);
  box-shadow: 0px 7px 21px 1px rgba(0, 0, 0, 0.59);
  margin: 0 3px;
}
pagi-o-nation.demo_2::part(div-element-pagination) {
  border: 1px solid #154c7a;
  font-size: 20px;
}
```
