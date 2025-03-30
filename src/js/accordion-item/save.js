/**
 * WordPress dependencies
 */
const { RichText, useBlockProps, InnerBlocks } = wp.blockEditor;

export default function save({ attributes }) {
	const { summary = 'Details', tagName } = attributes; 

	const blockProps = useBlockProps.save({
		className: 'wp-accordion-item'
	});
	
	const DynamicTag = `${tagName}`;

	return (
		<div {...blockProps}>
			<DynamicTag className="wp-accordion-item__header">
				<button class="wp-accordion-item__button">
					<RichText.Content value={summary} />
				</button>
			</DynamicTag>
			<div class="wp-accordion-item__content">
				<div class="wp-accordion-item__body is-layout-flow">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}