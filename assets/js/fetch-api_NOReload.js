'use strict';
(() => {
    const DOM_app = document.querySelector('#list_6');
    const DOM_pagination = document.querySelector('pagi-o-nation.demo_6');
    const init = () => {
        const limit = DOM_pagination.getLimitCount(); // => Number of data to be displayed per page.
        fetchData(limit);
    };
    const fetchData = async (limit) => {
        const params = {
            action: 'load-data',
        };
        await fetch('./inc/api.php', {
            method: 'POST',
            body: JSON.stringify(params),
        })
            .then((response) => response.json())
            .then((json) => {
            // Sets the "total-list-count" attribute so that the total number of pages can be calculated.
            DOM_pagination.setTotalListCount(json.length);
            // Your function for displaying the data when the page is called up for the first time.
            setList(json, 0, limit - 1);
            DOM_pagination.addEventListener('handle-current-page', (e) => {
                const currentPage = e.detail; // => current page number
                // You can calculate the "offset" yourself using the page number, or use the "calcOffset()" function.
                const offset = DOM_pagination.calcOffset(currentPage, limit);
                // Your function for displaying the data when a pagination button is clicked
                setList(json, offset - 1, offset + limit - 2);
            });
        })
            .catch((error) => console.log(error));
    };
    // Your function for displaying the data
    const setList = (data, offset, limit) => {
        let html = '<div class="row mt-2">';
        data.forEach((data, index) => {
            if (index >= offset && index <= limit) {
                html += `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <img src="${data.url}" alt="${data.alt}">
          </div>`;
            }
        });
        html += '</div>';
        DOM_app.innerHTML = html;
    };
    init();
})();