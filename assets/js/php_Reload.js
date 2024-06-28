'use strict';
(() => {
    const DOM_pagination = document.querySelector('pagi-o-nation.demo_5');
    // TODO: Enter your own search parameter here
    const search = 'site';
    // TODO: Enter your own URL here
    // const url: string = `https://pagi-o-nation.frissbee.de/?${search}=`;
    // const url: string = `http://localhost/pagi-o-nation/?${search}=`;
    const url = `http://localhost:3000/___FrissBee/Web%20Components/pagi-o-nation_V2_mit_PHP/dest/?${search}=`;
    const anchor = '#anchor_2';
    const init = () => {
        handlePage();
    };
    const handlePage = () => {
        DOM_pagination.addEventListener('handle-current-page', (e) => {
            const currentPage = e.detail; // => current page number
            DOM_pagination.goToURL(url + currentPage + anchor);
        });
    };
    init();
})();