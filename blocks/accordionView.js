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
        onAccordionChange() {
            const { multiExpand } = getContext();

            const { ref } = getElement();
            const context = getContext();

            const elements = accordionsElementsCache.filter(({ parent }) => parent === ref);
            context.isOpened = elements.filter(({ context: { isOpen } }) => isOpen);

            elements.forEach((el) =>{
                Events.on(el.content, 'show.wp.collapse', () => {
                    context.isOpened = [...context.isOpened.filter(({ content }) => el.content !== content), el];
    
                    if (multiExpand) {
                        return false;
                    }
    
                    const hasOpen = elements.filter(({ content, context: { isOpen } }) => isOpen && content !== el.content);
                    hasOpen.forEach(({ toggle }) => toggle.click());
                });

                Events.on(el.content, 'shown.wp.collapse', () => {
                    context.isOpened = [...context.isOpened.filter(({ content }) => el.content !== content), el];
                });
            });
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