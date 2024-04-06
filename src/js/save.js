/**
 * WordPress dependencies
 */
const { useBlockProps, InnerBlocks } = wp.blockEditor;

export default function save({ attributes }) {
    const blockProps = useBlockProps.save({
        className: 'wp-accordion'
    });

    return (
        <div {...blockProps}>
            <InnerBlocks.Content />
        </div>
    );
}