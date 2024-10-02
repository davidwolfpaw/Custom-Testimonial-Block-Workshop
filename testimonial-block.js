(function (blocks, element, blockEditor, components) {
    const { registerBlockType } = blocks;

    // Step 4: Add Button and Media Upload Components
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

            // Step 4: Add Image URL Attribute
            authorImage: { type: 'string', default: '' }, // Author image URL
        },
        edit: function ({ attributes, setAttributes }) {

            // Step 4: Add Image URL Attribute
            const { testimonialText, authorName, authorImage } = attributes;

            return createElement(
                Fragment,
                null,

                // Step 4: Add Media Upload for Author Image
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
            const { testimonialText, authorName } = attributes;
            return createElement('div', null,
                createElement('blockquote', null, testimonialText),
                createElement('p', { style: { fontWeight: 'bold' } }, authorName)
            );
        }
    });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components);
