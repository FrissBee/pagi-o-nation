'use strict';
(() => {
  const DOM_app = document.querySelector('#list_6');
  const DOM_pagination = document.querySelector('pagi-o-nation.demo_6');
  const limit = 8; // => Number of data to be displayed per page.
  DOM_pagination.setLimitCount(limit); // set the attribute
  const init = () => {
    // fetch data the first time the page is loaded
    fetchData(limit, 0, true);
    addEventToPaginationBtns();
  };
  // Add the EVent to the pagination buttons
  const addEventToPaginationBtns = () => {
    DOM_pagination.addEventListener('handle-current-page', (e) => {
      const currentPage = e.detail; // => current page number
      // You can calculate the "offset" yourself using the page number, or use the "calcOffset()" function.
      const offset = DOM_pagination.calcOffset(currentPage, limit);
      fetchData(limit, offset, false);
    });
  };
  const fetchData = async (limit, offset, fetchTotalListCount) => {
    const params = {
      action: 'load-data',
      limit: limit,
      offset: offset,
      fetchTotalListCount: fetchTotalListCount,
    };
    await fetch('./inc/api.php', {
      method: 'POST',
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .then((json) => {
        if (fetchTotalListCount === true) {
          // Sets the "total-list-count" attribute so that the total number of pages can be calculated.
          DOM_pagination.setTotalListCount(json.count);
        }
        // Your function for displaying the data
        setList(json.data);
      })
      .catch((error) => console.error(error));
  };
  // Your function for displaying the data
  const setList = (datas) => {
    let html = '<div class="row mt-2">';
    datas.forEach((data) => {
      html += `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <img src="${data.url}" alt="${data.alt}">
      </div>`;
    });
    html += '</div>';
    DOM_app.innerHTML = html;
  };
  init();
})();
