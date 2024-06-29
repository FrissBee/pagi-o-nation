'use strict';
(() => {
  const DOM_app = document.querySelector('#list_2');
  const DOM_pagination = document.querySelector('pagi-o-nation.demo_2');
  // TODO: Enter your own search parameter here
  const search = 'page';
  // TODO: Enter your own URL here
  const url = `http://localhost/pagi-o-nation/?${search}=`;
  const anchor = '#anchor_1';
  let offset = 1;
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
        const params = new URLSearchParams(document.location.search);
        if (!params.has('page')) {
          // Your function to display the data if the URL has no "?page=" search parameter
          setList(json, 0, limit);
        } else {
          const currentPageNumber = params.get('page'); // => current page number
          // You can calculate the "offset" yourself using the page number, or use the "calcOffset()" function.
          offset = DOM_pagination.calcOffset(currentPageNumber, limit);
          // Because of the reload, the attribute "page-number" must be set,
          // otherwise the pagination number would jump back to the beginning.
          DOM_pagination.setPageNumber(currentPageNumber);
          // Your function for displaying the data
          setList(json, offset, offset + limit);
        }
        DOM_pagination.addEventListener('handle-current-page', (e) => {
          const currentPage = e.detail; // => current page number
          DOM_pagination.goToURL(url + currentPage + anchor);
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
