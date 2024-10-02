(function (blocks, element) {
    const { registerBlockType } = blocks;
    const { createElement } = element;

    // Step 1: Register the block
    registerBlockType('workshop/testimonial-block', {
        title: 'Workshop Testimonial Block', // Block title
        icon: 'admin-comments', // Icon from WordPress dashicons
        category: 'common', // Category in the block inserter
        edit: function () {
            return createElement('p', null, 'Workshop Testimonial Block'); // Placeholder text in editor
        },
        save: function () {
            return createElement('p', null, 'Workshop Testimonial Block'); // Placeholder text on frontend
        }
    });
})(window.wp.blocks, window.wp.element);
