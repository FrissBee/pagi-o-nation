'use strict';
(() => {
    const DOM_app = document.querySelector('#list_2');
    const DOM_pagination = document.querySelector('pagi-o-nation.demo_2');
    // TODO: Enter your own search parameter here
    const search = 'page';
    // TODO: Enter your own URL here
    // const url: string = `https://pagi-o-nation.frissbee.de/?${search}=`;
    // const url: string = `http://localhost/pagi-o-nation/?${search}=`;
    const url = `http://localhost:3000/___FrissBee/Web%20Components/pagi-o-nation_V2_mit_PHP/dest/?${search}=`;
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
                setList(json, 1, limit);
            }
            else {
                const currentPageNumber = params.get('page'); // => current page number
                // You can calculate the "offset" yourself using the page number, or use the "calcOffset()" function.
                offset = DOM_pagination.calcOffset(currentPageNumber, limit);
                // Because of the reload, the attribute "page-number" must be set,
                // otherwise the pagination number would jump back to the beginning.
                DOM_pagination.setPageNumber(currentPageNumber);
                // Your function for displaying the data
                setList(json, offset, offset + limit - 1);
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
        data.forEach((data) => {
            if (data.id >= offset && data.id <= limit) {
                html += /* html */ `<li><b>ID: ${data.id}</b> | ${data.title}</li>`;
            }
        });
        html += '</ol>';
        DOM_app.innerHTML = html;
    };
    init();
})();