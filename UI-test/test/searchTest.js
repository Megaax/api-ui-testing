module.exports = {
    '@tags': ['contactForm'],

    'Search for dress': function (browser) {

        const page = browser.page.searchQuery();
        searchedItem = 'dress'

        page
            .navigate()
            .searchProduct(searchedItem)
            .search()
            .assert.urlContains('search_query=dress')
        browser.end();
    },


};
