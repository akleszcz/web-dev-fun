import { jsSnippets } from './config.js';
import { htmlSnippets } from './config.js';
import { cssHtmlSnippets } from './config.js';
import { html_beautify } from 'js-beautify';

// var htmlSnippets = window.snippets?.config?.htmlSnippets || {};
// var cssHtmlSnippets = window.snippets?.config?.cssHtmlSnippets || {};

window.snippets = (function () { // Use IIFE to avoid polluting the global scope.

  // @TODO: group select options with optgroup
  var cssSnippets = {};
  // to be replaced with ES6 Object.entries
  Object.keys(cssHtmlSnippets).forEach(key => {
    cssSnippets[key] = cssHtmlSnippets[key].css;
  });

  // define functions

  // use configuration object pattern
  function _populateSnippetsSelect(params) {
    Object.keys(params.snippets).forEach(function (title, index) {  // The Object.keys() method returns an array of a given object's own enumerable property names
      var snippetOption = document.createElement('option');
      snippetOption.value = 'snippet-' + index;
      snippetOption.textContent = title;
      params.snippetsSelect.appendChild(snippetOption); // @TODO: consider using DocumentFragment instead
    })
  };

  function _fillSnippetPre(params) {
    var selectedSnippetTitle = params.snippetsSelect.options[params.selectedIndex].textContent;
    var selectedSnippet = params.snippets[selectedSnippetTitle];
    params.snippetPre.textContent = selectedSnippet;
    _prettyPrint(params.snippetPre);
  }

  function _prettyPrint(element) {
    element.classList.remove('prettyprinted');
    PR.prettyPrint();
  }

  function _handleSnippetChange(params) {
    var selectedIndex = params.snippetsSelect.selectedIndex;
    localStorage.setItem(params.selectedIndexStorageKey, selectedIndex);
    _fillSnippetPre({
      snippetsSelect: params.snippetsSelect,
      snippetPre: params.snippetPre,
      snippets: params.snippets,
      selectedIndex: selectedIndex
    })
  }

  function _executeJs(params) {
    console.clear();
    var command = params.jsSnippetPre.textContent;
    // it is disadvised to use eval for real life applications
    window.eval(command); // indirect eval call to execute code globally
  }

  function _applyCss(params) {
    // var cssRule = params.cssSnippetPre.textContent.replace(/^/gm, '        ');
    // var cssRuleName = params.cssSnippetsSelect.options[params.cssSnippetsSelect.selectedIndex].textContent;
    // var htmlSrc = htmlSnippets[cssHtmlSnippets[cssRuleName].html].replace(/{{css}}/, cssRule);
    // params.htmlSrcPre.textContent = htmlSrc;
    // _renderHtml({ iframe: params.iframe, src: htmlSrc });
    // _prettyPrint(params.htmlSrcPre);

    var cssRule = params.cssSnippetPre.textContent;
    var cssRuleName = params.cssSnippetsSelect.options[params.cssSnippetsSelect.selectedIndex].textContent;
    var htmlSrc = htmlSnippets[cssHtmlSnippets[cssRuleName].html]
    var domparser = new DOMParser();
    var doc = domparser.parseFromString(htmlSrc, 'text/html');
    var style = document.createElement('style');
    style.innerHTML = cssRule;
    var head = doc.querySelector('head');
    head.appendChild(style);
    var docString = html_beautify(`<!DOCTYPE html><html lang="en">${doc.documentElement.innerHTML}</html>`);
    // var docString = html_beautify(new XMLSerializer().serializeToString(doc));
    params.htmlSrcPre.textContent = docString;
    _renderHtml({ iframe: params.iframe, src: docString });
    _prettyPrint(params.htmlSrcPre);
  }

  function _getBlobUrl(src) {
    var blob = new Blob([src], { type: 'text/html' });
    return URL.createObjectURL(blob)
  }

  function _renderHtml(params) {
    params.iframe.src = _getBlobUrl(params.src);
  }

  function _handleDomElements({
    btn,
    snippetsSelect,
    snippetPre,
    snippets,
    selectedIndexStorageKey,
    btnClickHandler,
  }) {
    btn.addEventListener('click', btnClickHandler);
    // To be updated to ES6 syntax later
    _populateSnippetsSelect({ snippetsSelect: snippetsSelect, snippets: snippets });
    var selectedIndex = localStorage.getItem(selectedIndexStorageKey) || 0;
    snippetsSelect.selectedIndex = selectedIndex;

    // To be updated to ES6 syntax later
    _fillSnippetPre({
      snippetsSelect: snippetsSelect,
      snippetPre: snippetPre,
      snippets: snippets,
      selectedIndex: selectedIndex
    });

    snippetsSelect.addEventListener('change', function () {
      _handleSnippetChange({
        snippetsSelect: snippetsSelect,
        snippetPre: snippetPre,
        snippets: snippets,
        selectedIndexStorageKey: selectedIndexStorageKey
      });
    });
  }

  function _init() {
    // get DOM elements
    var _selectedIndexStorageKeyJs = 'selected-js-snippet-index';
    var _jsSnippetPre = document.getElementById('js-snippet-pre');
    var _executeJsBtn = document.getElementById('execute-js-btn');
    var _jsSnippetsSelect = document.getElementById('js-snippets-select');
    var _tryItIframe = document.getElementById('try-it-ifr');

    var _cssSnippetPre = document.getElementById('css-snippet-pre');
    var _htmlSrcPre = document.getElementById('html-src-pre');
    var _applyCssBtn = document.getElementById('apply-css-btn');
    var _cssSnippetsSelect = document.getElementById('css-snippets-select');
    var _selectedIndexStorageKeyCss = 'selected-css-snippet-index';

    _handleDomElements({
      btn: _applyCssBtn,
      snippetsSelect: _cssSnippetsSelect,
      snippetPre: _cssSnippetPre,
      snippets: cssSnippets,
      selectedIndexStorageKey: _selectedIndexStorageKeyCss,
      btnClickHandler: function () { _applyCss({ cssSnippetPre: _cssSnippetPre, htmlSrcPre: _htmlSrcPre, iframe: _tryItIframe, cssSnippetsSelect: _cssSnippetsSelect }); },
    });

    _handleDomElements({
      btn: _executeJsBtn,
      snippetsSelect: _jsSnippetsSelect,
      snippetPre: _jsSnippetPre,
      snippets: jsSnippets,
      selectedIndexStorageKey: _selectedIndexStorageKeyJs,
      btnClickHandler: function () { _executeJs({ jsSnippetPre: _jsSnippetPre }) },
    });

    _applyCss({ cssSnippetPre: _cssSnippetPre, htmlSrcPre: _htmlSrcPre, iframe: _tryItIframe, cssSnippetsSelect: _cssSnippetsSelect });
  }

  _init();
})();