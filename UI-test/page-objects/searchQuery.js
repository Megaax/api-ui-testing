const ContactOptions = {
    CustomerService: '2',
    Webmaster: '1',
};
module.exports = {
    url: 'http://automationpractice.multiformis.com/index.php',
    elements: {

        searchQuery: '#search_query_top',
        searchButton: 'button[name="submit_search"]',

    },
    commands: [{
        search() {
            return this
                .click('@searchButton')
        },
        searchProduct(value) {
            return this
                .setValue('@searchQuery', value)
        }
    }],
}