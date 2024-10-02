(function (blocks, element, blockEditor, components) {
    const { registerBlockType } = blocks;
    const { TextControl, Button } = components; // Import the Button Component
    const { MediaUpload, MediaUploadCheck } = blockEditor; // Import the Media Upload Components
    const { createElement, Fragment } = element;

    registerBlockType('workshop/testimonial-block', {
        title: 'Workshop Testimonial Block', // Block title
        icon: 'admin-comments', // Icon from WordPress dashicons
        category: 'common', // Category in the block inserter

        attributes: {
            testimonialText: { type: 'string', default: '' }, // Testimonial text
            authorName: { type: 'string', default: '' }, // Author name
            authorImage: { type: 'string', default: '' }, // Author image URL
        },
        edit: function ({ attributes, setAttributes }) {
            const { testimonialText, authorName, authorImage } = attributes;

            return createElement(
                Fragment,
                null,
                // Media Upload for Author Image
                createElement(MediaUploadCheck, {},
                    createElement(MediaUpload, {
                        onSelect: (media) => setAttributes({ authorImage: media.url }),
                        allowedTypes: ['image'],
                        value: authorImage,
                        render: ({ open }) => createElement(Button, { onClick: open, className: 'is-primary' }, authorImage ? 'Change Author Image' : 'Upload Author Image')
                    })
                ),
                // Display Uploaded Image in Editor
                authorImage && createElement('img', { src: authorImage, alt: 'Author Image' }),

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
            const { testimonialText, authorName, authorImage } = attributes;
            return createElement('div', null,
                // Step 5: Render Image on Frontend
                authorImage && createElement('img', { src: authorImage, alt: 'Author Image' }),
                createElement('blockquote', null, testimonialText),
                createElement('p', { style: { fontWeight: 'bold' } }, authorName)
            );
        }
    });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components);
