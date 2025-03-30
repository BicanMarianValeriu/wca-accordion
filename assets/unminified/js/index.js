/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./inc/support/modules/accordion/src/js/accordion-item/edit.js":
/*!*********************************************************************!*\
  !*** ./inc/support/modules/accordion/src/js/accordion-item/edit.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _accordion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../accordion */ "./inc/support/modules/accordion/src/js/accordion/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const {
  i18n: {
    __
  },
  blockEditor: {
    RichText,
    useBlockProps,
    useInnerBlocksProps,
    InspectorControls,
    store: blockEditorStore
  },
  components: {
    PanelBody,
    ToggleControl
  },
  data: {
    useSelect,
    useDispatch
  }
} = wp;
const TEMPLATE = [['core/paragraph', {
  placeholder: __('Type / to add a block')
}]];
function edit({
  attributes,
  setAttributes,
  clientId
}) {
  const {
    isOpen,
    summary,
    tagName,
    templateLock,
    allowedBlocks
  } = attributes;
  const blockProps = useBlockProps({
    className: 'wp-accordion-item'
  });
  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    __experimentalCaptureToolbars: true,
    template: TEMPLATE,
    templateLock,
    allowedBlocks
  });
  const {
    hasSelection,
    rootClientId
  } = useSelect(select => {
    const {
      isBlockSelected,
      hasSelectedInnerBlock,
      getBlockRootClientId
    } = select(blockEditorStore);
    const rootClientId = getBlockRootClientId(clientId);
    return {
      hasSelection: hasSelectedInnerBlock(clientId, true) || isBlockSelected(clientId),
      rootClientId
    };
  }, [clientId]);
  const {
    updateBlockAttributes
  } = useDispatch(blockEditorStore);
  const updateTag = value => {
    setAttributes({
      tagName: value
    });
    updateBlockAttributes(rootClientId, {
      tagName: null
    });
  };
  const isOpenItem = hasSelection || isOpen;
  const toggleClasses = () => {
    let classNames = ['wp-accordion-item__button'];
    if (!isOpenItem) {
      classNames = [...classNames, 'collapsed'];
    }
    return classNames.join(' ');
  };
  const DynamicTag = `${tagName}`;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_accordion__WEBPACK_IMPORTED_MODULE_0__.TagToolbar, {
      value: tagName,
      onChange: updateTag
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(PanelBody, {
        title: __('Settings'),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ToggleControl, {
          label: __('Open by default'),
          checked: isOpen,
          onChange: () => setAttributes({
            isOpen: !isOpen
          })
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      ...innerBlocksProps,
      open: isOpenItem,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DynamicTag, {
        className: "wp-accordion-item__header",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
          className: toggleClasses(),
          onClick: e => e.preventDefault(),
          "aria-expanded": isOpenItem,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(RichText, {
            "aria-label": __('Write summary'),
            placeholder: __('Write summary…'),
            value: summary,
            onChange: summary => setAttributes({
              summary
            }),
            withoutInteractiveFormatting: true
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        class: "wp-accordion-item__content",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          class: "wp-accordion-item__body is-layout-flow",
          children: innerBlocksProps.children
        })
      })]
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (edit);

/***/ }),

/***/ "./inc/support/modules/accordion/src/js/accordion-item/index.js":
/*!**********************************************************************!*\
  !*** ./inc/support/modules/accordion/src/js/accordion-item/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   settings: () => (/* binding */ settings)
/* harmony export */ });
/* harmony import */ var _blocks_accordion_item_block_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../../blocks/accordion-item-block.json */ "./inc/support/modules/accordion/blocks/accordion-item-block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./inc/support/modules/accordion/src/js/accordion-item/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./save */ "./inc/support/modules/accordion/src/js/accordion-item/save.js");
/**
 * Internal dependencies
 */



const {
  name
} = _blocks_accordion_item_block_json__WEBPACK_IMPORTED_MODULE_0__;
const settings = {
  save: _save__WEBPACK_IMPORTED_MODULE_2__["default"],
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name,
  metadata: _blocks_accordion_item_block_json__WEBPACK_IMPORTED_MODULE_0__,
  settings
});

/***/ }),

/***/ "./inc/support/modules/accordion/src/js/accordion-item/save.js":
/*!*********************************************************************!*\
  !*** ./inc/support/modules/accordion/src/js/accordion-item/save.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

/**
 * WordPress dependencies
 */
const {
  RichText,
  useBlockProps,
  InnerBlocks
} = wp.blockEditor;
function save({
  attributes
}) {
  const {
    summary = 'Details',
    tagName
  } = attributes;
  const blockProps = useBlockProps.save({
    className: 'wp-accordion-item'
  });
  const DynamicTag = `${tagName}`;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    ...blockProps,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DynamicTag, {
      className: "wp-accordion-item__header",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
        class: "wp-accordion-item__button",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RichText.Content, {
          value: summary
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      class: "wp-accordion-item__content",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        class: "wp-accordion-item__body is-layout-flow",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(InnerBlocks.Content, {})
      })
    })]
  });
}

/***/ }),

/***/ "./inc/support/modules/accordion/src/js/accordion/edit.js":
/*!****************************************************************!*\
  !*** ./inc/support/modules/accordion/src/js/accordion/edit.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TagToolbar: () => (/* binding */ TagToolbar),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _blocks_accordion_item_block_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../../blocks/accordion-item-block.json */ "./inc/support/modules/accordion/blocks/accordion-item-block.json");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */
const {
  i18n: {
    __,
    sprintf
  },
  blockEditor: {
    useBlockProps,
    useInnerBlocksProps,
    InspectorControls,
    BlockControls,
    store: blockEditorStore
  },
  components: {
    Icon,
    PanelBody,
    ToggleControl,
    ToolbarDropdownMenu
  },
  data: {
    useRegistry,
    useDispatch,
    useSelect
  }
} = wp;


const TEMPLATE = [[_blocks_accordion_item_block_json__WEBPACK_IMPORTED_MODULE_0__.name]];
const DEFAULT_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div'];
const LEVEL_TO_PATH = {
  'p': /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    fill: "currentColor",
    viewBox: "0 0 16 16",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      d: "M10.5 15a.5.5 0 0 1-.5-.5V2H9v12.5a.5.5 0 0 1-1 0V9H7a4 4 0 1 1 0-8h5.5a.5.5 0 0 1 0 1H11v12.5a.5.5 0 0 1-.5.5"
    })
  }),
  'h1': /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    fill: "currentColor",
    viewBox: "0 0 16 16",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      d: "M7.648 13V3H6.3v4.234H1.348V3H0v10h1.348V8.421H6.3V13zM14 13V3h-1.333l-2.381 1.766V6.12L12.6 4.443h.066V13z"
    })
  }),
  'h2': /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    fill: "currentColor",
    viewBox: "0 0 16 16",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      d: "M7.495 13V3.201H6.174v4.15H1.32V3.2H0V13h1.32V8.513h4.854V13zm3.174-7.071v-.05c0-.934.66-1.752 1.801-1.752 1.005 0 1.76.639 1.76 1.651 0 .898-.582 1.58-1.12 2.19l-3.69 4.2V13h6.331v-1.149h-4.458v-.079L13.9 8.786c.919-1.048 1.666-1.874 1.666-3.101C15.565 4.149 14.35 3 12.499 3 10.46 3 9.384 4.393 9.384 5.879v.05z"
    })
  }),
  'h3': /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    fill: "currentColor",
    viewBox: "0 0 16 16",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      d: "M11.07 8.4h1.049c1.174 0 1.99.69 2.004 1.724s-.802 1.786-2.068 1.779c-1.11-.007-1.905-.605-1.99-1.357h-1.21C8.926 11.91 10.116 13 12.028 13c1.99 0 3.439-1.188 3.404-2.87-.028-1.553-1.287-2.221-2.096-2.313v-.07c.724-.127 1.814-.935 1.772-2.293-.035-1.392-1.21-2.468-3.038-2.454-1.927.007-2.94 1.196-2.981 2.426h1.23c.064-.71.732-1.336 1.744-1.336 1.027 0 1.744.64 1.744 1.568.007.95-.738 1.639-1.744 1.639h-.991V8.4ZM7.495 13V3.201H6.174v4.15H1.32V3.2H0V13h1.32V8.513h4.854V13z"
    })
  }),
  'h4': /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    fill: "currentColor",
    viewBox: "0 0 16 16",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      d: "M13.007 3H15v10h-1.29v-2.051H8.854v-1.18C10.1 7.513 11.586 5.256 13.007 3m-2.82 6.777h3.524v-5.62h-.074a95 95 0 0 0-3.45 5.554zM7.495 13V3.201H6.174v4.15H1.32V3.2H0V13h1.32V8.513h4.854V13z"
    })
  }),
  'h5': /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    fill: "currentColor",
    viewBox: "0 0 16 16",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      d: "M9 10.516h1.264c.193.976 1.112 1.364 2.01 1.364 1.005 0 2.067-.782 2.067-2.247 0-1.292-.983-2.082-2.089-2.082-1.012 0-1.658.596-1.924 1.077h-1.12L9.646 3h5.535v1.141h-4.415L10.5 7.28h.072c.201-.316.883-.84 1.967-.84 1.709 0 3.13 1.177 3.13 3.158 0 2.025-1.407 3.403-3.475 3.403-1.809 0-3.1-1.048-3.194-2.484ZM7.495 13V3.201H6.174v4.15H1.32V3.2H0V13h1.32V8.512h4.854V13z"
    })
  }),
  'h6': /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    fill: "currentColor",
    viewBox: "0 0 16 16",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      d: "M15.596 5.178H14.3c-.106-.444-.62-1.072-1.706-1.072-1.332 0-2.325 1.269-2.325 3.947h.07c.268-.67 1.043-1.445 2.445-1.445 1.494 0 3.017 1.064 3.017 3.073C15.8 11.795 14.37 13 12.48 13c-1.036 0-2.093-.36-2.77-1.452C9.276 10.836 9 9.808 9 8.37 9 4.656 10.494 3 12.636 3c1.812 0 2.883 1.113 2.96 2.178m-5.151 4.566c0 1.367.944 2.15 2.043 2.15 1.128 0 2.037-.684 2.037-2.136 0-1.41-1-2.065-2.03-2.065-1.19 0-2.05.853-2.05 2.051M7.495 13V3.201H6.174v4.15H1.32V3.2H0V13h1.32V8.513h4.854V13z"
    })
  }),
  'div': /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    fill: "currentColor",
    viewBox: "0 0 16 16",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      d: "M11 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3zM5 1a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4z"
    })
  })
};
function TagToolbar({
  value,
  onChange
}) {
  const getTitle = tag => {
    let title = tag;
    switch (tag) {
      case 'p':
        title = __('Paragraph');
        break;
      case 'div':
        title = __('Div');
        break;
      default:
        title = sprintf(__('Heading %s'), tag.toUpperCase());
        break;
    }
    return title;
  };
  const TagIcon = ({
    value
  }) => {
    if (LEVEL_TO_PATH[value]) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Icon, {
        icon: LEVEL_TO_PATH[value],
        style: {
          padding: 3
        }
      });
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Icon, {
      icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "16",
        height: "16",
        fill: "currentColor",
        viewBox: "0 0 16 16",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
          d: "M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0"
        })
      }),
      style: {
        padding: 3
      }
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(BlockControls, {
    group: "block",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ToolbarDropdownMenu, {
      label: __('Change tag', 'wecodeart'),
      icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TagIcon, {
        value: value
      }),
      controls: DEFAULT_TAGS.map(tagName => {
        const isActive = tagName === value;
        return {
          icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TagIcon, {
            value: tagName
          }),
          title: getTitle(tagName),
          isActive,
          onClick() {
            onChange(tagName);
          },
          role: 'menuitemradio'
        };
      })
    })
  });
}
function edit({
  attributes,
  setAttributes,
  clientId
}) {
  const {
    multiExpand,
    allClosed,
    tagName,
    templateLock
  } = attributes;
  const blockProps = useBlockProps({
    className: 'wp-accordion'
  });
  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    __experimentalCaptureToolbars: true,
    template: TEMPLATE,
    templateLock,
    allowedBlocks: [_blocks_accordion_item_block_json__WEBPACK_IMPORTED_MODULE_0__.name]
  });
  const registry = useRegistry();
  const {
    getBlockOrder
  } = useSelect(blockEditorStore);
  const {
    updateBlockAttributes
  } = useDispatch(blockEditorStore);
  function updateTag(tagName) {
    const innerBlockClientIds = getBlockOrder(clientId);
    registry.batch(() => {
      setAttributes({
        tagName
      });
      updateBlockAttributes(innerBlockClientIds, {
        tagName
      });
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TagToolbar, {
      value: tagName,
      onChange: updateTag
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(PanelBody, {
        title: __('Settings'),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ToggleControl, {
          label: __('Allow expanding multiple panes', 'wecodeart'),
          checked: multiExpand,
          onChange: () => setAttributes({
            multiExpand: !multiExpand
          })
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      ...innerBlocksProps,
      children: innerBlocksProps.children
    })]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (edit);

/***/ }),

/***/ "./inc/support/modules/accordion/src/js/accordion/index.js":
/*!*****************************************************************!*\
  !*** ./inc/support/modules/accordion/src/js/accordion/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TagToolbar: () => (/* reexport safe */ _edit__WEBPACK_IMPORTED_MODULE_2__.TagToolbar),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   settings: () => (/* binding */ settings)
/* harmony export */ });
/* harmony import */ var _blocks_accordion_item_block_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../../blocks/accordion-item-block.json */ "./inc/support/modules/accordion/blocks/accordion-item-block.json");
/* harmony import */ var _blocks_accordion_block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../blocks/accordion-block.json */ "./inc/support/modules/accordion/blocks/accordion-block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./inc/support/modules/accordion/src/js/accordion/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./inc/support/modules/accordion/src/js/accordion/save.js");
/**
 * Internal dependencies
 */




const {
  i18n: {
    __
  }
} = wp;
const {
  name
} = _blocks_accordion_block_json__WEBPACK_IMPORTED_MODULE_1__;

const settings = {
  example: {
    innerBlocks: [{
      name: _blocks_accordion_item_block_json__WEBPACK_IMPORTED_MODULE_0__.name,
      attributes: {
        summary: __('Lorem ipsum dolor sit')
      }
    }, {
      name: _blocks_accordion_item_block_json__WEBPACK_IMPORTED_MODULE_0__.name,
      attributes: {
        summary: __('Lorem ipsum dolor sit')
      }
    }]
  },
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"],
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name,
  metadata: _blocks_accordion_block_json__WEBPACK_IMPORTED_MODULE_1__,
  settings
});

/***/ }),

/***/ "./inc/support/modules/accordion/src/js/accordion/save.js":
/*!****************************************************************!*\
  !*** ./inc/support/modules/accordion/src/js/accordion/save.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

/**
 * WordPress dependencies
 */
const {
  useBlockProps,
  InnerBlocks
} = wp.blockEditor;
function save() {
  const blockProps = useBlockProps.save({
    className: 'wp-accordion'
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    ...blockProps,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(InnerBlocks.Content, {})
  });
}

/***/ }),

/***/ "./inc/support/modules/accordion/src/scss/index.scss":
/*!***********************************************************!*\
  !*** ./inc/support/modules/accordion/src/scss/index.scss ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ }),

/***/ "./inc/support/modules/accordion/blocks/accordion-block.json":
/*!*******************************************************************!*\
  !*** ./inc/support/modules/accordion/blocks/accordion-block.json ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"wecodeart/accordion","title":"Accordion","category":"wca","description":"Hide and show additional content.","keywords":["accordion","summary","toggle","disclosure"],"icon":"menu-alt","textdomain":"default","allowedBlocks":["wecodeart/accordion-item"],"attributes":{"tagName":{"type":"string","default":"div","enum":["h1","h2","h3","h4","h5","h6","p","div"]},"multiExpand":{"type":"boolean","default":false},"schema":{"type":"boolean","default":false},"templateLock":{"type":["string","boolean"],"enum":["all","insert","contentOnly",false]}},"render":"file:./render-accordion.php","supports":{"anchor":true,"ariaLabel":true,"html":false,"align":["wide","full"],"color":{"gradients":true,"link":true,"__experimentalDefaultControls":{"background":true,"text":true}},"__experimentalBorder":{"color":true,"width":true,"radius":true,"style":true},"spacing":{"margin":true,"padding":true,"blockGap":true,"__experimentalDefaultControls":{"margin":false,"padding":false}},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true,"__experimentalLetterSpacing":true,"__experimentalDefaultControls":{"fontSize":true}},"layout":{"allowEditing":false},"interactivity":true,"__experimentalStyles":true,"__experimentalSettings":true},"editorScript":["wp-block-wecodeart-accordion"],"viewStyle":["wp-block-wecodeart-accordion"],"viewScriptModule":"file:./accordionView.js"}');

/***/ }),

/***/ "./inc/support/modules/accordion/blocks/accordion-item-block.json":
/*!************************************************************************!*\
  !*** ./inc/support/modules/accordion/blocks/accordion-item-block.json ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"wecodeart/accordion-item","title":"Accordion Item","parent":["wecodeart/accordion"],"category":"wca","description":"Hide and show additional content.","keywords":["accordion","summary","toggle","disclosure"],"icon":"arrow-down-alt2","textdomain":"default","attributes":{"isOpen":{"type":"boolean","default":false},"summary":{"type":"string","source":"html","selector":"button"},"tagName":{"type":"string","default":"div","enum":["h1","h2","h3","h4","h5","h6","p","div"]},"templateLock":{"type":["string","boolean"],"enum":["all","insert","contentOnly",false]},"allowedBlocks":{"type":"array"}},"render":"file:./render-accordion-item.php","supports":{"anchor":true,"ariaLabel":true,"html":false,"align":false,"color":{"gradients":true,"link":true,"__experimentalDefaultControls":{"background":true,"text":true}},"__experimentalBorder":{"color":true,"width":true,"radius":true,"style":true},"spacing":{"margin":["top","bottom"],"padding":false,"blockGap":false,"__experimentalDefaultControls":{"margin":true,"padding":false,"blockGap":false}},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true,"__experimentalLetterSpacing":true,"__experimentalDefaultControls":{"fontSize":true}},"interactivity":true,"__experimentalStyles":true,"__experimentalSettings":true},"viewScriptModule":"@wecodeart/collapse"}');

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
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*******************************************************!*\
  !*** ./inc/support/modules/accordion/src/js/index.js ***!
  \*******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _accordion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./accordion */ "./inc/support/modules/accordion/src/js/accordion/index.js");
/* harmony import */ var _accordion_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./accordion-item */ "./inc/support/modules/accordion/src/js/accordion-item/index.js");
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../scss/index.scss */ "./inc/support/modules/accordion/src/scss/index.scss");
const {
  blocks: {
    registerBlockType
  },
  domReady
} = wp;

/**
 * Internal dependencies
 */



function initBlock(block) {
  const {
    metadata,
    settings,
    name
  } = block;
  return registerBlockType({
    name,
    ...metadata
  }, settings);
}
const init = () => {
  initBlock(_accordion__WEBPACK_IMPORTED_MODULE_0__["default"]);
  initBlock(_accordion_item__WEBPACK_IMPORTED_MODULE_1__["default"]);
};
domReady(() => init());
})();

/******/ })()
;
//# sourceMappingURL=index.js.map