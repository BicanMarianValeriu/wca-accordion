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
        store: blockEditorStore,
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
        useSelect,
    },
} = wp;

import accordionItemBlock from './../../../blocks/accordion-item-block.json';

const TEMPLATE = [
    [accordionItemBlock.name],
];

const DEFAULT_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div'];

const LEVEL_TO_PATH = {
    'p': <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M10.5 15a.5.5 0 0 1-.5-.5V2H9v12.5a.5.5 0 0 1-1 0V9H7a4 4 0 1 1 0-8h5.5a.5.5 0 0 1 0 1H11v12.5a.5.5 0 0 1-.5.5" />
    </svg>,
    'h1': <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M7.648 13V3H6.3v4.234H1.348V3H0v10h1.348V8.421H6.3V13zM14 13V3h-1.333l-2.381 1.766V6.12L12.6 4.443h.066V13z" />
    </svg>,
    'h2': <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M7.495 13V3.201H6.174v4.15H1.32V3.2H0V13h1.32V8.513h4.854V13zm3.174-7.071v-.05c0-.934.66-1.752 1.801-1.752 1.005 0 1.76.639 1.76 1.651 0 .898-.582 1.58-1.12 2.19l-3.69 4.2V13h6.331v-1.149h-4.458v-.079L13.9 8.786c.919-1.048 1.666-1.874 1.666-3.101C15.565 4.149 14.35 3 12.499 3 10.46 3 9.384 4.393 9.384 5.879v.05z" />
    </svg>,
    'h3': <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M11.07 8.4h1.049c1.174 0 1.99.69 2.004 1.724s-.802 1.786-2.068 1.779c-1.11-.007-1.905-.605-1.99-1.357h-1.21C8.926 11.91 10.116 13 12.028 13c1.99 0 3.439-1.188 3.404-2.87-.028-1.553-1.287-2.221-2.096-2.313v-.07c.724-.127 1.814-.935 1.772-2.293-.035-1.392-1.21-2.468-3.038-2.454-1.927.007-2.94 1.196-2.981 2.426h1.23c.064-.71.732-1.336 1.744-1.336 1.027 0 1.744.64 1.744 1.568.007.95-.738 1.639-1.744 1.639h-.991V8.4ZM7.495 13V3.201H6.174v4.15H1.32V3.2H0V13h1.32V8.513h4.854V13z" />
    </svg>,
    'h4': <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M13.007 3H15v10h-1.29v-2.051H8.854v-1.18C10.1 7.513 11.586 5.256 13.007 3m-2.82 6.777h3.524v-5.62h-.074a95 95 0 0 0-3.45 5.554zM7.495 13V3.201H6.174v4.15H1.32V3.2H0V13h1.32V8.513h4.854V13z" />
    </svg>,
    'h5': <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M9 10.516h1.264c.193.976 1.112 1.364 2.01 1.364 1.005 0 2.067-.782 2.067-2.247 0-1.292-.983-2.082-2.089-2.082-1.012 0-1.658.596-1.924 1.077h-1.12L9.646 3h5.535v1.141h-4.415L10.5 7.28h.072c.201-.316.883-.84 1.967-.84 1.709 0 3.13 1.177 3.13 3.158 0 2.025-1.407 3.403-3.475 3.403-1.809 0-3.1-1.048-3.194-2.484ZM7.495 13V3.201H6.174v4.15H1.32V3.2H0V13h1.32V8.512h4.854V13z" />
    </svg>,
    'h6': <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M15.596 5.178H14.3c-.106-.444-.62-1.072-1.706-1.072-1.332 0-2.325 1.269-2.325 3.947h.07c.268-.67 1.043-1.445 2.445-1.445 1.494 0 3.017 1.064 3.017 3.073C15.8 11.795 14.37 13 12.48 13c-1.036 0-2.093-.36-2.77-1.452C9.276 10.836 9 9.808 9 8.37 9 4.656 10.494 3 12.636 3c1.812 0 2.883 1.113 2.96 2.178m-5.151 4.566c0 1.367.944 2.15 2.043 2.15 1.128 0 2.037-.684 2.037-2.136 0-1.41-1-2.065-2.03-2.065-1.19 0-2.05.853-2.05 2.051M7.495 13V3.201H6.174v4.15H1.32V3.2H0V13h1.32V8.513h4.854V13z" />
    </svg>,
    'div': <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M11 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3zM5 1a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4z" />
    </svg>,
};

function TagToolbar({
    value,
    onChange
}) {
    const getTitle = (tag) => {
        let title = tag;

        switch (tag) {
            case 'p':
                title = __('Paragraph');
                break;
            case 'div':
                title = __('Div');
                break;
            default:
                title = sprintf(__('Heading %s'), tag.toUpperCase())
                break;
        }

        return title;
    }

    const TagIcon = ({ value }) => {
        if (LEVEL_TO_PATH[value]) {
            return <Icon icon={LEVEL_TO_PATH[value]} style={{ padding: 3 }} />;
        }

        return <Icon icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0" />
            </svg>
        } style={{ padding: 3 }} />;
    }

    return (
        <BlockControls group="block">
            <ToolbarDropdownMenu
                label={__('Change tag', 'wecodeart')}
                icon={<TagIcon value={value} />}
                controls={DEFAULT_TAGS.map((tagName) => {
                    const isActive = tagName === value;
                    return {
                        icon: <TagIcon value={tagName} />,
                        title: getTitle(tagName),
                        isActive,
                        onClick() {
                            onChange(tagName);
                        },
                        role: 'menuitemradio',
                    };
                })}
            />
        </BlockControls>
    )
}

function edit({ attributes, setAttributes, clientId }) {
    const { multiExpand, allClosed, tagName, templateLock } = attributes;

    const blockProps = useBlockProps({
        className: 'wp-accordion'
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        __experimentalCaptureToolbars: true,
        template: TEMPLATE,
        templateLock,
        allowedBlocks: [accordionItemBlock.name],
    });

    const registry = useRegistry();
    const { getBlockOrder } = useSelect(blockEditorStore);
    const { updateBlockAttributes } = useDispatch(blockEditorStore);

    function updateTag(tagName) {
        const innerBlockClientIds = getBlockOrder(clientId);

        registry.batch(() => {
            setAttributes({ tagName });
            updateBlockAttributes(innerBlockClientIds, { tagName });
        });
    }

    return (
        <>
            <TagToolbar value={tagName} onChange={updateTag} />
            <InspectorControls>
                <PanelBody title={__('Settings')}>
                    <ToggleControl
                        label={__('Allow expanding multiple panes', 'wecodeart')}
                        checked={multiExpand}
                        onChange={() => setAttributes({ multiExpand: !multiExpand })}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...innerBlocksProps}>
                {innerBlocksProps.children}
            </div>
        </>
    );
}

export { TagToolbar };

export default edit;