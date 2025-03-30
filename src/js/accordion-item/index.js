/**
 * Internal dependencies
 */
import metadata from './../../../blocks/accordion-item-block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

export const settings = {
    save,
    edit,
};

export default { name, metadata, settings };