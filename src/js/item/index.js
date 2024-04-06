/**
 * Internal dependencies
 */
import metadata from './../../../accordion-item-block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
    save,
    edit,
};

export default { name, metadata, settings };