const {
    i18n: {
        __
    },
    blocks: {
        registerBlockType
    },
    domReady
} = wp;

/**
 * Internal dependencies
 */
import metadata from './../../accordion-block.json';
import edit from './edit';
import save from './save';
import accordionItem from './item';

import './../scss/index.scss';

const { name } = metadata;
const settings = {
    example: {
        innerBlocks: [
            {
                name: 'wecodeart/accordion-item',
                attributes: {
                    summary: __('Lorem ipsum dolor sit')
                },
            },
            {
                name: 'wecodeart/accordion-item',
                attributes: {
                    summary: __('Lorem ipsum dolor sit'),
                },
            },
        ],
    },
    save,
    edit,
};

function initBlock(block) {
    const { metadata, settings, name } = block;

    return registerBlockType({ name, ...metadata }, settings);
}

const init = () => {
    const accordionBlock = { name, metadata, settings };
    
    initBlock(accordionBlock);
    initBlock(accordionItem);
};

domReady(() => init());