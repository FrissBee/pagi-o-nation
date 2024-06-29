'use strict';
var __classPrivateFieldSet =
  (this && this.__classPrivateFieldSet) ||
  function (receiver, state, value, kind, f) {
    if (kind === 'm') throw new TypeError('Private method is not writable');
    if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a setter');
    if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError('Cannot write private member to an object whose class did not declare it');
    return kind === 'a' ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
  };
var __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (receiver, state, kind, f) {
    if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a getter');
    if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError('Cannot read private member from an object whose class did not declare it');
    return kind === 'm' ? f : kind === 'a' ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
(() => {
  var _PagiONation_instances,
    _PagiONation_root,
    _PagiONation_paginationList,
    _PagiONation_limitCount,
    _PagiONation_totalListCount,
    _PagiONation_iconStart,
    _PagiONation_iconEnd,
    _PagiONation_textDefaultBtn,
    _PagiONation_currentPageNumber,
    _PagiONation_activeBg,
    _PagiONation_activeColor,
    _PagiONation_inactiveBg,
    _PagiONation_inactiveColor,
    _PagiONation_createLiElement,
    _PagiONation_createDivElement,
    _PagiONation_createPaginationButtonDefault,
    _PagiONation_createPaginationButton,
    _PagiONation_addCustomEventToBtn,
    _PagiONation_appendBtnDefaultToList,
    _PagiONation_appendBtnToList,
    _PagiONation_setPaginationBtns,
    _PagiONation_setPagination,
    _PagiONation_setPaginationColor;
  const template = document.createElement('template');
  template.innerHTML = /* html */ `
  <style>
    .pagination { display: flex;padding-left: 0;list-style: none; }
    ul { margin-top: 0;margin-bottom: 0; }
    ul > :first-child div {border-radius: 0.375rem 0 0 0.375rem; }
    ul > :last-child div { border-radius: 0 0.375rem 0.375rem 0; }
    li { display: list-item;text-align: -webkit-match-parent;unicode-bidi: isolate; }
    li.list-btn { cursor: pointer; }
    li.list-btn:hover { opacity: 0.75; }
    .page-item:not(:first-child) .page-link { margin-left: calc(1px * -1); }
    .page-link { position: relative;display: block;padding: 0.275rem 0.75rem;font-size: 1rem;text-decoration: none;border: 1px solid #dee2e6; }
  </style>
  <nav part="nav-element-pagination">
    <ul class="pagination pagination-list" part="ul-element-pagination">
    </ul>
  </nav>
`;
  class PagiONation extends HTMLElement {
    constructor() {
      super();
      _PagiONation_instances.add(this);
      _PagiONation_root.set(this, void 0);
      _PagiONation_paginationList.set(this, void 0);
      _PagiONation_limitCount.set(this, 1);
      _PagiONation_totalListCount.set(this, 0);
      _PagiONation_iconStart.set(this, '<span>&laquo;</span>');
      _PagiONation_iconEnd.set(this, '<span>&raquo;</span>');
      _PagiONation_textDefaultBtn.set(this, '...');
      _PagiONation_currentPageNumber.set(this, 1);
      _PagiONation_activeBg.set(this, '#0d6efd');
      _PagiONation_activeColor.set(this, '#ffffff');
      _PagiONation_inactiveBg.set(this, '#ffffff');
      _PagiONation_inactiveColor.set(this, '#0d6efd');
      __classPrivateFieldSet(this, _PagiONation_root, this.attachShadow({ mode: 'closed' }), 'f');
      __classPrivateFieldGet(this, _PagiONation_root, 'f').appendChild(template.content.cloneNode(true));
      __classPrivateFieldSet(
        this,
        _PagiONation_paginationList,
        __classPrivateFieldGet(this, _PagiONation_root, 'f').querySelector('ul.pagination-list'),
        'f'
      );
    }
    static get observedAttributes() {
      return ['limit-count', 'total-list-count', 'page-number'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'limit-count') {
        __classPrivateFieldSet(this, _PagiONation_limitCount, Number(newValue), 'f');
      } else if (name === 'page-number') {
        __classPrivateFieldSet(this, _PagiONation_currentPageNumber, Number(newValue), 'f');
        __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_setPagination).call(
          this,
          __classPrivateFieldGet(this, _PagiONation_totalListCount, 'f'),
          __classPrivateFieldGet(this, _PagiONation_limitCount, 'f')
        );
        __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_setPaginationColor).call(this);
      } else if (name === 'total-list-count') {
        __classPrivateFieldSet(this, _PagiONation_totalListCount, Number(newValue), 'f');
        __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_setPagination).call(
          this,
          __classPrivateFieldGet(this, _PagiONation_totalListCount, 'f'),
          __classPrivateFieldGet(this, _PagiONation_limitCount, 'f')
        );
        __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_setPaginationColor).call(this);
      }
    }
    goToURL(url) {
      window.location.href = url;
    }
    getLimitCount() {
      return Number(this.getAttribute('limit-count'));
    }
    calcOffset(currentPageNumber, limit) {
      return (Number(currentPageNumber) - 1) * limit + 1;
    }
    setTotalListCount(count) {
      this.setAttribute('total-list-count', String(count));
    }
    setPageNumber(pageNumber) {
      this.setAttribute('page-number', String(pageNumber));
    }
  }
  (_PagiONation_root = new WeakMap()),
    (_PagiONation_paginationList = new WeakMap()),
    (_PagiONation_limitCount = new WeakMap()),
    (_PagiONation_totalListCount = new WeakMap()),
    (_PagiONation_iconStart = new WeakMap()),
    (_PagiONation_iconEnd = new WeakMap()),
    (_PagiONation_textDefaultBtn = new WeakMap()),
    (_PagiONation_currentPageNumber = new WeakMap()),
    (_PagiONation_activeBg = new WeakMap()),
    (_PagiONation_activeColor = new WeakMap()),
    (_PagiONation_inactiveBg = new WeakMap()),
    (_PagiONation_inactiveColor = new WeakMap()),
    (_PagiONation_instances = new WeakSet()),
    (_PagiONation_createLiElement = function _PagiONation_createLiElement(isDefault) {
      const liElem = document.createElement('li');
      liElem.classList.add('page-item');
      if (isDefault === false) {
        liElem.classList.add('list-btn');
      }
      liElem.setAttribute('part', 'li-element-pagination');
      return liElem;
    }),
    (_PagiONation_createDivElement = function _PagiONation_createDivElement(text) {
      const divElem = document.createElement('div');
      divElem.classList.add('page-link');
      divElem.innerHTML = text;
      divElem.setAttribute('part', 'div-element-pagination');
      return divElem;
    }),
    (_PagiONation_createPaginationButtonDefault = function _PagiONation_createPaginationButtonDefault(text) {
      const liElem = __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_createLiElement).call(this, true);
      const divElem = __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_createDivElement).call(this, text);
      liElem.append(divElem);
      return liElem;
    }),
    (_PagiONation_createPaginationButton = function _PagiONation_createPaginationButton(text, pageNumber, isForwardAndBackwardBtn) {
      const liElem = __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_createLiElement).call(this, false);
      const divElem = __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_createDivElement).call(this, text);
      __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_addCustomEventToBtn).call(this, liElem, pageNumber);
      if (isForwardAndBackwardBtn === false) {
        liElem.classList.add(`page-btn-${pageNumber}`);
        divElem.classList.add(`link-btn-${pageNumber}`);
      }
      liElem.append(divElem);
      return liElem;
    }),
    (_PagiONation_addCustomEventToBtn = function _PagiONation_addCustomEventToBtn(elem, pageNumber) {
      elem.addEventListener('click', () => {
        __classPrivateFieldSet(this, _PagiONation_currentPageNumber, pageNumber, 'f');
        this.setAttribute('page-number', String(__classPrivateFieldGet(this, _PagiONation_currentPageNumber, 'f')));
        this.dispatchEvent(new CustomEvent('handle-current-page', { detail: __classPrivateFieldGet(this, _PagiONation_currentPageNumber, 'f') }));
      });
    }),
    (_PagiONation_appendBtnDefaultToList = function _PagiONation_appendBtnDefaultToList(text) {
      const liDefault = __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_createPaginationButtonDefault).call(this, text);
      __classPrivateFieldGet(this, _PagiONation_paginationList, 'f').append(liDefault);
    }),
    (_PagiONation_appendBtnToList = function _PagiONation_appendBtnToList(text, pageNumber, isForwardAndBackwardBtn) {
      const elem = __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_createPaginationButton).call(
        this,
        text,
        pageNumber,
        isForwardAndBackwardBtn
      );
      __classPrivateFieldGet(this, _PagiONation_paginationList, 'f').append(elem);
    }),
    (_PagiONation_setPaginationBtns = function _PagiONation_setPaginationBtns(start, end) {
      for (let i = start; i <= end; i++) {
        __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_appendBtnToList).call(this, String(i), i, false);
      }
    }),
    (_PagiONation_setPagination = function _PagiONation_setPagination(totalListCount, limit) {
      __classPrivateFieldGet(this, _PagiONation_paginationList, 'f').innerHTML = '';
      const countButtons = Math.ceil(totalListCount / limit);
      const count = countButtons > 7 ? 7 : countButtons;
      __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_appendBtnToList).call(
        this,
        __classPrivateFieldGet(this, _PagiONation_iconStart, 'f'),
        1,
        true
      );
      if (countButtons > 7) {
        if (__classPrivateFieldGet(this, _PagiONation_currentPageNumber, 'f') >= 5) {
          __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_appendBtnDefaultToList).call(
            this,
            __classPrivateFieldGet(this, _PagiONation_textDefaultBtn, 'f')
          );
        }
      }
      if (__classPrivateFieldGet(this, _PagiONation_currentPageNumber, 'f') <= 4) {
        if (countButtons <= 7) {
          __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_setPaginationBtns).call(this, 1, count);
        } else {
          __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_setPaginationBtns).call(this, 1, count - 1);
        }
      } else if (
        __classPrivateFieldGet(this, _PagiONation_currentPageNumber, 'f') > 4 &&
        __classPrivateFieldGet(this, _PagiONation_currentPageNumber, 'f') < countButtons - 3
      ) {
        if (countButtons === 7) {
          __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_setPaginationBtns).call(this, 1, 7);
        } else {
          __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_setPaginationBtns).call(
            this,
            __classPrivateFieldGet(this, _PagiONation_currentPageNumber, 'f') - 2,
            __classPrivateFieldGet(this, _PagiONation_currentPageNumber, 'f') + 2
          );
        }
      } else if (__classPrivateFieldGet(this, _PagiONation_currentPageNumber, 'f') === countButtons - 3) {
        __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_setPaginationBtns).call(
          this,
          __classPrivateFieldGet(this, _PagiONation_currentPageNumber, 'f') - 2,
          countButtons
        );
      } else if (__classPrivateFieldGet(this, _PagiONation_currentPageNumber, 'f') === countButtons - 2) {
        if (countButtons === 7) {
          __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_setPaginationBtns).call(this, 1, 7);
        } else {
          __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_setPaginationBtns).call(
            this,
            __classPrivateFieldGet(this, _PagiONation_currentPageNumber, 'f') - 3,
            countButtons
          );
        }
      } else if (__classPrivateFieldGet(this, _PagiONation_currentPageNumber, 'f') === countButtons - 1) {
        if (countButtons === 7) {
          __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_setPaginationBtns).call(this, 1, 7);
        } else {
          __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_setPaginationBtns).call(
            this,
            __classPrivateFieldGet(this, _PagiONation_currentPageNumber, 'f') - 4,
            countButtons
          );
        }
      } else if (__classPrivateFieldGet(this, _PagiONation_currentPageNumber, 'f') === countButtons) {
        if (countButtons === 7) {
          __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_setPaginationBtns).call(this, 1, 7);
        } else {
          __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_setPaginationBtns).call(
            this,
            __classPrivateFieldGet(this, _PagiONation_currentPageNumber, 'f') - 5,
            countButtons
          );
        }
      }
      if (countButtons > 7) {
        if (__classPrivateFieldGet(this, _PagiONation_currentPageNumber, 'f') <= countButtons - 4) {
          __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_appendBtnDefaultToList).call(
            this,
            __classPrivateFieldGet(this, _PagiONation_textDefaultBtn, 'f')
          );
        }
      }
      __classPrivateFieldGet(this, _PagiONation_instances, 'm', _PagiONation_appendBtnToList).call(
        this,
        __classPrivateFieldGet(this, _PagiONation_iconEnd, 'f'),
        countButtons,
        true
      );
    }),
    (_PagiONation_setPaginationColor = function _PagiONation_setPaginationColor() {
      const divElements = __classPrivateFieldGet(this, _PagiONation_paginationList, 'f').querySelectorAll('div.page-link');
      if (divElements) {
        divElements.forEach(
          (elem) => (elem.style.color = this.getAttribute('inactive-color') ?? __classPrivateFieldGet(this, _PagiONation_inactiveColor, 'f'))
        );
        divElements.forEach(
          (elem) => (elem.style.background = this.getAttribute('inactive-bg') ?? __classPrivateFieldGet(this, _PagiONation_inactiveBg, 'f'))
        );
      }
      const divElem = __classPrivateFieldGet(this, _PagiONation_paginationList, 'f').querySelector(
        'div.link-btn-' + __classPrivateFieldGet(this, _PagiONation_currentPageNumber, 'f')
      );
      if (divElem) {
        divElem.style.color = this.getAttribute('active-color') ?? __classPrivateFieldGet(this, _PagiONation_activeColor, 'f');
        divElem.style.background = this.getAttribute('active-bg') ?? __classPrivateFieldGet(this, _PagiONation_activeBg, 'f');
        divElem.style.borderColor = this.getAttribute('active-bg') ?? __classPrivateFieldGet(this, _PagiONation_activeBg, 'f');
      }
    });
  customElements.define('pagi-o-nation', PagiONation);
})();
