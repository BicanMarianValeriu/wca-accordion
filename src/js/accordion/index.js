/**
 * Internal dependencies
 */
import accordionItemBlock from './../../../blocks/accordion-item-block.json';
import metadata from './../../../blocks/accordion-block.json';
import edit from './edit';
import save from './save';

const {
    i18n: { __ },
} = wp;

const { name } = metadata;

export { TagToolbar } from './edit';

export const settings = {
    example: {
        innerBlocks: [
            {
                name: accordionItemBlock.name,
                attributes: {
                    summary: __('Lorem ipsum dolor sit')
                },
            },
            {
                name: accordionItemBlock.name,
                attributes: {
                    summary: __('Lorem ipsum dolor sit'),
                },
            },
        ],
    },
    save,
    edit,
};

export default { name, metadata, settings };