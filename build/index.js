/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Edit; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _endpoint_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./endpoint.json */ "./src/endpoint.json");

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */


/**
 * Imports the useBlockProps and InnerBlocks components from the
 * @wordpress/block-editor package.
 *
 * useBlockProps is a React hook that provides props for the block wrapper element.
 *
 * InnerBlocks renders the inner block content of a custom block.
 */


/**
 * Imports the editor stylesheet.
 *
 * This allows us to style the editor UI for this block.
 */


/**
 * Imports the useEntityProp hook from the @wordpress/core-data package.
 *
 * This hook allows you to get and set entity properties in the core data store.
 */


/**
 * Imports the useSelect and useDispatch hooks from the @wordpress/data package.
 *
 * useSelect allows you to select data from the store state.
 *
 * useDispatch returns the store dispatch method to dispatch actions.
 */


/**
 * Imports the useState and useEffect React hooks from the @wordpress/element package.
 *
 * useState allows you to add state to a functional component.
 * useEffect allows you to perform side effects from a function component.
 */


/**
 * Imports the createBlocksFromInnerBlocksTemplate utility from
 * @wordpress/blocks to generate blocks from a template array.
 */


/**
 * Imports utility functions from the utils.js file:
 *
 * paragraphTemplate - Template for paragraph inner blocks.
 * formatPostContent - Formats post content for API request.
 * getInnerBlocksContent - Gets inner block HTML content.
 * makeApiCall - Makes API call to summarization endpoint.
 */


/**
 * Imports the API endpoint
 */


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

/**
 * Edit function for the Summarization block.
 *
 * Retrieves post content and inner block content.
 * Makes API call to generate summary.
 * Updates meta field and inner blocks with summary.
 * Handles button states and re-summarization.
 */
function Edit({
  clientId,
  name,
  context: {
    postType
  }
}) {
  /* These lines of code are using the `useSelect` and `useDispatch` hooks from the `@wordpress/data`
  package to retrieve and update data from the WordPress editor. */
  const {
    getEditedPostContent
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useSelect)(select => select("core/editor"));
  const {
    replaceInnerBlocks
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useDispatch)('core/block-editor');

  /* The `getInnerBlocksContent(clientId)` function is retrieving the content of the inner blocks within
  the current block. It takes the `clientId` as a parameter, which is a unique identifier for the
  current block, and returns the content of the inner blocks as a string. This content is then stored
  in the `innerBlocksContent` variable. */
  const innerBlocksContent = (0,_utils_js__WEBPACK_IMPORTED_MODULE_8__.getInnerBlocksContent)(clientId);

  /* The line `const postContent = getEditedPostContent();` is retrieving the content of the currently
  edited post in the WordPress editor. It uses the `getEditedPostContent` function from the
  `@wordpress/data` package to get the content. The `postContent` variable will store the retrieved
  content. */
  const postContent = getEditedPostContent();

  /* The code is using the `useEntityProp` hook from the `@wordpress/core-data` package to get and update
  the meta value of a post. */
  const [meta, setMeta] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__.useEntityProp)('postType', postType, 'meta');
  const metaValue = meta['myguten_meta_block_field'];

  /**
   * The function `updateMetaValue` updates the value of a meta field called `myguten_meta_block_field`
   * with a new value.
   * @param newValue - The `newValue` parameter is the new value that you want to update for the
   * `myguten_meta_block_field` property in the `meta` object.
   */
  const updateMetaValue = newValue => {
    setMeta({
      ...meta,
      myguten_meta_block_field: newValue
    });
  };

  /* The code is using the `useState` hook to create three state variables: `buttonText`,
  `buttonDisabled`, and `updatingData`. */
  const [buttonText, setButtonText] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useState)(() => metaValue.length > 0 ? 'Regenerar resumen' : 'Generar resumen');
  const [buttonDisabled, setButtonDisabled] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useState)(false);
  const [updatingData, setUpdatingData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useState)(false);

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
  `useEffect` hook is being used to update the meta value of a post when the `updatingData` or
  `innerBlocksContent` variables change. */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useEffect)(() => {
    if (!updatingData) {
      updateMetaValue(innerBlocksContent);
    }
  }, [updatingData, innerBlocksContent]);

  /**
   * The function `handleApiCall` is used to make an API call, update the meta value, and replace inner
   * blocks with new content.
   * @returns The function `handleApiCall` does not have a return statement, so it does not explicitly
   * return anything.
   */
  const handleApiCall = async () => {
    setButtonText('Generando resumen');
    setButtonDisabled(true);
    setUpdatingData(true);
    let body = (0,_utils_js__WEBPACK_IMPORTED_MODULE_8__.formatPostContent)(postContent, name);
    let endpoint = _endpoint_json__WEBPACK_IMPORTED_MODULE_9__.endpoint;
    const response = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_8__.makeApiCall)(endpoint, body);
    if (!response.ok) {
      setButtonText('Intente nuevamente');
      setButtonDisabled(false);
      return console.error('API request failed', response);
    }
    let result = await response.json();
    updateMetaValue(result);
    replaceInnerBlocks(clientId, (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_7__.createBlocksFromInnerBlocksTemplate)((0,_utils_js__WEBPACK_IMPORTED_MODULE_8__.paragraphTemplate)(result)));
    setButtonText('Regenerar resumen');
    setButtonDisabled(false);
    setUpdatingData(false);
  };

  /* The `return` statement is returning the JSX code that will be rendered in the editor for this
  block. */
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)()
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleApiCall,
    disabled: buttonDisabled
  }, buttonText), metaValue && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks, {
    template: (0,_utils_js__WEBPACK_IMPORTED_MODULE_8__.paragraphTemplate)(metaValue),
    allowedBlocks: ['core/paragraph'],
    templateLock: "insert"
  }));
}

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   filterEmptyBlocks: function() { return /* binding */ filterEmptyBlocks; },
/* harmony export */   formatPostContent: function() { return /* binding */ formatPostContent; },
/* harmony export */   getInnerBlocksContent: function() { return /* binding */ getInnerBlocksContent; },
/* harmony export */   makeApiCall: function() { return /* binding */ makeApiCall; },
/* harmony export */   paragraphTemplate: function() { return /* binding */ paragraphTemplate; }
/* harmony export */ });
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Define a template for the paragraph block.
 * 
 * @param {Array} result - The array of paragraph block content.
 * @returns {Array} - An array of paragraph blocks.
 */
function paragraphTemplate(result) {
  return result.map(item => ['core/paragraph', {
    content: item
  }]);
}
;

/**
 * Format the post content by parsing, filtering, and serializing.
 * 
 * @param {string} postContent - The post content to format.
 * @param {string} name - The block name to filter out.
 * @returns {string} - The formatted post content.
 */
function formatPostContent(postContent, name) {
  const parsedPostContent = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.parse)(postContent);
  const filteredPostContent = parsedPostContent.filter(item => {
    return item.name !== name;
  });
  const serializedPostContent = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.serialize)(filteredPostContent);
  return serializedPostContent.replace(/(<([^>]+)>)/gi, '');
}
;

/**
 * Get the content of inner blocks for the given clientId.
 * 
 * @param {string} clientId - The clientId for the block.
 * @returns {Array} - An array of inner block content.
 */
function getInnerBlocksContent(clientId) {
  return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    const block = select('core/block-editor').getBlock(clientId);
    const blockInnerBlock = block.innerBlocks;
    const blockInnerBlockContent = blockInnerBlock.map(block => block.attributes.content);
    return filterEmptyBlocks(blockInnerBlockContent);
  });
}
;

/**
 * Filter out empty blocks from the provided array.
 * 
 * @param {Array} block - The array of blocks to filter.
 * @returns {Array} - The filtered array with empty blocks removed.
 */
function filterEmptyBlocks(block) {
  return block.filter(content => content !== '');
}
;

/**
 * The function `makeApiCall` is an asynchronous function that makes a POST request to an API endpoint
 * with a JSON body and returns the response.
 * @param apiEndpoint - The `apiEndpoint` parameter is the URL of the API endpoint that you want to
 * make a request to. It specifies the location where the API is hosted and the specific endpoint you
 * want to interact with.
 * @param body - The `body` parameter is an object that contains the data you want to send to the API
 * endpoint. It will be converted to a JSON string using `JSON.stringify()` before being sent in the
 * request body.
 * @returns the response object from the API call.
 */
async function makeApiCall(apiEndpoint, body) {
  const response = await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return response;
}

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ (function(module) {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"camalote/summarization-block","version":"0.1.0","title":"summarization-block","category":"text","icon":"smiley","description":"A block that displays a summary based on Hugging Face Inference API","example":{},"attributes":{},"supports":{"html":false,"multiple":false},"usesContext":["postType"],"textdomain":"camalote-summarization","editorScript":"file:./index.js","editorStyle":"file:./index.css"}');

/***/ }),

/***/ "./src/endpoint.json":
/*!***************************!*\
  !*** ./src/endpoint.json ***!
  \***************************/
/***/ (function(module) {

module.exports = JSON.parse('{"endpoint":""}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Internal dependencies
 */



/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_2__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"]
});
}();
/******/ })()
;
//# sourceMappingURL=index.js.map