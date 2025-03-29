import { store, getContext, getElement } from '@wordpress/interactivity';

const { Events, Selector } = window.wecodeart || {};

if (typeof Events === 'undefined' || typeof Selector === 'undefined') {
    console.warn('WeCodeArt\'s Accordion require WeCodeArt\'s Events & Selector plugins.');
}

let accordionsElementsCache = [];

const NAME = 'accordion';
const NAMESPACE = `wecodeart/${NAME}`;

store(NAMESPACE, {
    callbacks: {
        multiExpand() {
            const { multiExpand } = getContext();

            if (multiExpand) {
                return;
            }

            const { ref } = getElement();

            const elements = accordionsElementsCache.filter(({ parent }) => parent === ref);

            elements.forEach(({ content }) => Events.on(content, 'show.wp.collapse', ({ currentTarget }) => {
                const hasOpen = elements.filter(({ content, context: { isOpen } }) => content !== currentTarget && isOpen);
                hasOpen.map(({ toggle }) => toggle.click());
            }));
        },
        addElement() {
            const { ref } = getElement();

            accordionsElementsCache = [...accordionsElementsCache, {
                context: getContext('wecodeart/collapse'),
                parent: ref.closest('.wp-accordion'),
                toggle: Selector.findOne('.wp-accordion-item__button', ref),
                content: Selector.findOne('.wp-accordion-item__content', ref),
            }];
        }
    }
});