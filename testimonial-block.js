(function (blocks, element, blockEditor, components) {
    const { registerBlockType } = blocks;
    const { TextControl } = components; // Import the TextControl component
    const { createElement, Fragment } = element;

    // Step 1: Register the block
    registerBlockType('workshop/testimonial-block', {
        title: 'Workshop Testimonial Block', // Block title
        icon: 'admin-comments', // Icon from WordPress dashicons
        category: 'common', // Category in the block inserter

        // Step 2: Add Editable Text Fields
        attributes: {
            testimonialText: { type: 'string', default: '' }, // Testimonial text
            authorName: { type: 'string', default: '' }, // Author name
        },
        edit: function ({ attributes, setAttributes }) {
            const { testimonialText, authorName } = attributes;

            return createElement(
                Fragment,
                null,
                // Add TextControl for Testimonial Text
                createElement(TextControl, {
                    label: 'Testimonial Text',
                    value: testimonialText,
                    onChange: (value) => setAttributes({ testimonialText: value }),
                    placeholder: 'Enter the testimonial text…'
                }),
                // Add TextControl for Author Name
                createElement(TextControl, {
                    label: 'Author Name',
                    value: authorName,
                    onChange: (value) => setAttributes({ authorName: value }),
                    placeholder: 'Enter the author’s name…'
                })
            );
        },
        save: function ({ attributes }) {
            return createElement('p', null, 'Custom Testimonial Block'); // Placeholder text on frontend
        }
    });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components);
