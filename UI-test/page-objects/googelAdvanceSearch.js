module.exports={
    // url:'https://www.google.com/advanced_search',
    url:'http://automationpractice.multiformis.com/index.php',
    elements:{

    //    mainQueryInputSelector : '[name="as_q"]',
    //    languageDropDown : '#lr_button',
    //    languageDropDownValue :'.goog-menuitem[value="lang_it"]',
    //    timeUpdateDropDown : '#as_qdr_button',
    //    timeUpdateDropDownValue : '.goog-menuitem[value="m"]',
    //    submitButon : '.jfk-button',
        searchQuery:'#search_query_top',
        searchButton:'button[name="submit_search"]'

    },
    commands:[{
            // selectFilter(selector, value){
            //     return this
            //     .click(selector)
            //     .click(`.goog-menuitem[value="${value}"]`);

            // },
            // search(){
            //     return this
            //     .click('@submitButon')
            // },
            // setQuery(value){
            //     return this 
            //     .setValue('@mainQueryInputSelector', value)


            // },
            searchProduct(value){
                return this
                .setValue('@searchQuery', value)
            },
    }],
}