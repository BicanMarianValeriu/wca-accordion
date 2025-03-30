const {
    blocks: {
        registerBlockType
    },
    domReady
} = wp;

/**
 * Internal dependencies
 */
import accordionBlock from './accordion';
import accordionItemBlock from './accordion-item';

import './../scss/index.scss';

function initBlock(block) {
    const { metadata, settings, name } = block;

    return registerBlockType({ name, ...metadata }, settings);
}

const init = () => {
    initBlock(accordionBlock);
    initBlock(accordionItemBlock);
};

domReady(() => init());