import { store, getContext, getElement } from '@wordpress/interactivity';

const { Events } = window.wecodeart || {};

if (typeof Events === 'undefined') {
    console.warn('WeCodeArt\'s Accordion require WeCodeArt\'s Events plugin.');
}

let elementsCache = [];

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

            const elements = elementsCache.filter(({ parent }) => parent === ref);

            elements.forEach(({ content }) => Events.on(content, 'show.wp.collapse', ({ currentTarget }) => {
                const hasOpen = elements.filter(({ content, context: { isOpen } }) => content !== currentTarget && isOpen);
                hasOpen.map(({ toggle }) => toggle.click());
            }));
        },
        addElement() {
            const { ref } = getElement();

            elementsCache = [...elementsCache, {
                context: getContext('wecodeart/collapse'),
                parent: ref.closest('.wp-accordion'),
                toggle: ref.querySelector('.wp-accordion-item__button'),
                content: ref.querySelector('.wp-accordion-item__content'),
            }];
        }
    }
});