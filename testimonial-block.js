(function (blocks, element, blockEditor, components) {
    const { registerBlockType } = blocks;
    const { PanelBody, TextControl, Button } = components;
    const { InspectorControls, MediaUpload, MediaUploadCheck, PanelColorSettings } = blockEditor;
    const { createElement, Fragment } = element;

    registerBlockType('workshop/testimonial-block', {
        title: 'Workshop Testimonial Block', // Block title
        icon: 'admin-comments', // Icon from WordPress dashicons
        category: 'common', // Category in the block inserter
        attributes: {
            testimonialText: { type: 'string', default: '' }, // Testimonial text
            authorName: { type: 'string', default: '' }, // Author name
            authorImage: { type: 'string', default: '' }, // Author image URL
            backgroundColor: { type: 'string', default: '#ffffff' }, // Background color
            textColor: { type: 'string', default: '#000000' }, // Text color
        },
        edit: function ({ attributes, setAttributes }) {
            const { testimonialText, authorName, authorImage, backgroundColor, textColor } = attributes;

            return (
                createElement(Fragment,
                    null,
                    // InspectorControls Adds Settings in the Sidebar
                    createElement(InspectorControls,
                        null,
                        // PanelBody for Testimonial Settings
                        createElement(PanelBody,
                            { title: 'Testimonial Settings' },
                            // Media Upload for Author Image
                            createElement(MediaUploadCheck, {},
                                createElement(MediaUpload, {
                                    onSelect: (media) => setAttributes({ authorImage: media.url }),
                                    allowedTypes: ['image'],
                                    value: authorImage,
                                    render: ({ open }) => createElement(Button, { onClick: open, isPrimary: true }, authorImage ? 'Change Author Image' : 'Upload Author Image')
                                })
                            )
                        ),
                        // Panel for Color Settings
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
                    ),

                    // div to Display Testimonial in Editor
                    createElement('div',
                        {
                            style: {
                                color: textColor,
                                backgroundColor: backgroundColor
                            },
                            className: 'custom-testimonial-block'
                        },
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
                    )
                )
            );
        },
        save: function ({ attributes }) {

            // Step 10: Display Color Changes on Frontend
            const { testimonialText, authorName, authorImage, backgroundColor, textColor } = attributes;
            return createElement('div',
                {
                    style: {
                        color: textColor,
                        backgroundColor: backgroundColor
                    },
                    className: 'custom-testimonial-block'
                },
                authorImage && createElement('img', { src: authorImage, alt: 'Author Image' }),
                createElement('blockquote', null, testimonialText),
                createElement('p', { style: { fontWeight: 'bold' } }, authorName)
            );
        }
    });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components);
