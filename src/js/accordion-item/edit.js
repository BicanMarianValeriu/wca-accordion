/**
 * WordPress dependencies
 */
import { TagToolbar } from './../accordion';

const {
    i18n: { __ },
    blockEditor: {
        RichText,
        useBlockProps,
        useInnerBlocksProps,
        InspectorControls,
        store: blockEditorStore,
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

const TEMPLATE = [
    [
        'core/paragraph',
        {
            placeholder: __('Type / to add a block'),
        },
    ],
];

function edit({ attributes, setAttributes, clientId }) {
    const { isOpen, summary, tagName, templateLock, allowedBlocks } = attributes;

    const blockProps = useBlockProps({
        className: 'wp-accordion-item'
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        __experimentalCaptureToolbars: true,
        template: TEMPLATE,
        templateLock,
        allowedBlocks,
    });

    const { hasSelection, rootClientId } = useSelect((select) => {
        const { isBlockSelected, hasSelectedInnerBlock, getBlockRootClientId } = select(blockEditorStore);
        const rootClientId = getBlockRootClientId(clientId);

        return {
            hasSelection: (hasSelectedInnerBlock(clientId, true) || isBlockSelected(clientId)),
            rootClientId,
        };
    }, [clientId]);

    const { updateBlockAttributes } = useDispatch(blockEditorStore);

    const updateTag = (value) => {
        setAttributes({ tagName: value });
        updateBlockAttributes(rootClientId, { tagName: null });
    };

    const isOpenItem = (hasSelection || isOpen);

    const toggleClasses = () => {
        let classNames = ['wp-accordion-item__button']

        if (!isOpenItem) {
            classNames = [...classNames, 'collapsed'];
        }

        return classNames.join(' ');
    }

    const DynamicTag = `${tagName}`;

    return (
        <>
            <TagToolbar value={tagName} onChange={updateTag} />
            <InspectorControls>
                <PanelBody title={__('Settings')}>
                    <ToggleControl
                        label={__('Open by default')}
                        checked={isOpen}
                        onChange={() => setAttributes({ isOpen: !isOpen })}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...innerBlocksProps} open={isOpenItem} >
                <DynamicTag className="wp-accordion-item__header">
                    <button className={toggleClasses()} onClick={(e) => e.preventDefault()} aria-expanded={isOpenItem}>
                        <RichText
                            aria-label={__('Write summary')}
                            placeholder={__('Write summary…')}
                            value={summary}
                            onChange={(summary) => setAttributes({ summary })}
                            withoutInteractiveFormatting
                        />
                    </button>
                </DynamicTag>
                <div class="wp-accordion-item__content">
                    <div class="wp-accordion-item__body is-layout-flow">
                        {innerBlocksProps.children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default edit;