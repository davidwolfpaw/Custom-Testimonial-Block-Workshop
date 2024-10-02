(function (blocks, element, blockEditor, components) {
    const { registerBlockType } = blocks;
    const { TextControl, Button } = components;

    // Step 6: Import the Panel Color Settings
    const { MediaUpload, MediaUploadCheck, PanelColorSettings } = blockEditor;
    const { createElement, Fragment } = element;

    registerBlockType('workshop/testimonial-block', {
        title: 'Workshop Testimonial Block', // Block title
        icon: 'admin-comments', // Icon from WordPress dashicons
        category: 'common', // Category in the block inserter

        attributes: {
            testimonialText: { type: 'string', default: '' }, // Testimonial text
            authorName: { type: 'string', default: '' }, // Author name
            authorImage: { type: 'string', default: '' }, // Author image URL

            // Step 6: Add Attributes for Background and Text Colors
            backgroundColor: { type: 'string', default: '#ffffff' }, // Background color
            textColor: { type: 'string', default: '#000000' }, // Text color
        },
        edit: function ({ attributes, setAttributes }) {

            // Step 6: Add Attributes for Background and Text Colors
            const { testimonialText, authorName, authorImage, backgroundColor, textColor } = attributes;

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
                }),

                // Step 6: Panel for Color Settings
                createElement(PanelColorSettings, {
                    title: 'Color Settings',
                    initialOpen: true,
                    colorSettings: [
                        {
                            value: backgroundColor,
                            onChange: (value) => setAttributes({ backgroundColor: value }),
                            label: 'Background Color',
                        },
                        {
                            value: textColor,
                            onChange: (value) => setAttributes({ textColor: value }),
                            label: 'Text Color',
                        }
                    ],
                })
            );
        },
        save: function ({ attributes }) {
            const { testimonialText, authorName, authorImage } = attributes;
            return createElement('div', null,
                authorImage && createElement('img', { src: authorImage, alt: 'Author Image' }),
                createElement('blockquote', null, testimonialText),
                createElement('p', { style: { fontWeight: 'bold' } }, authorName)
            );
        }
    });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components);
