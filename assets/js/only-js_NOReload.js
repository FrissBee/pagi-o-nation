'use strict';
(() => {
  const DOM_app = document.querySelector('#list_1');
  const DOM_pagination = document.querySelector('pagi-o-nation.demo_1');
  const init = () => {
    const limit = DOM_pagination.getLimitCount(); // => Number of data to be displayed per page.
    fetchData(limit);
  };
  const fetchData = async (limit) => {
    await fetch('https://jsonplaceholder.typicode.com/todos/')
      .then((response) => response.json())
      .then((json) => {
        // Sets the "total-list-count" attribute so that the total number of pages can be calculated.
        DOM_pagination.setTotalListCount(json.length);
        // Your function for displaying the data when the page is called up for the first time.
        setList(json, 0, limit);
        DOM_pagination.addEventListener('handle-current-page', (e) => {
          const currentPage = e.detail; // => current page number
          // You can calculate the "offset" yourself using the page number, or use the "calcOffset()" function.
          const offset = DOM_pagination.calcOffset(currentPage, limit);
          // Your function for displaying the data when a pagination button is clicked
          setList(json, offset, offset + limit);
        });
      })
      .catch((error) => console.log(error));
  };
  // Your function for displaying the data
  const setList = (data, offset, limit) => {
    let html = '<ol>';
    if (data.length < limit) limit = data.length;
    for (let i = offset; i < limit; i++) {
      html += `<li><b>ID: ${data[i].id}</b> | ${data[i].title}</li>`;
    }
    html += '</ol>';
    DOM_app.innerHTML = html;
  };
  init();
})();
