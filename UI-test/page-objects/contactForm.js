const ContactOptions = {
    CustomerService: '2',
    Webmaster: '1',
};
module.exports = {
    url: 'http://automationpractice.multiformis.com/index.php',
    elements: {

        subjectSelector: '#id_contact.form-control',
        contactSelector: '#contact-link',
        subjectValue: '.form-control[value="1"]',
        emailWrapper: '#email',
        orderID: '#id_order',
        messageField: '#message',
        submitButton: '#submitMessage',

        errorMessageBox: '.alert.alert-danger',
        successMessageBox: 'p.alert.alert-success',

    },
    commands: [{
        search() {
            return this
                .click('@searchButton')
        },
        searchProduct(value) {
            return this
                .setValue('@searchQuery', value)
        },
        selectSubjectHeading(value) {
            return this
                .click('@subjectSelector')
                .click(`#id_contact option[value="${ContactOptions[value]}"]`)
        },
        setEmail(value) {
            return this
                .setValue('@emailWrapper', value)
        },
        setOrderID(value) {
            return this
                .setValue('@orderID', value)
        },
        enterMessage(value) {
            return this
                .setValue('@messageField', value)
        },
        uploaderFile(path) {
            return this
                .setValue('input[type="file"]', require('path').resolve(path))
        },
        assertSubmissionErrorSubject: function () {
            return this
                .waitForElementVisible('@errorMessageBox', 5000)
                .assert.containsText('@errorMessageBox', 'There is 1 error')
                .assert.containsText('@errorMessageBox', 'Please select a subject from the list provided');
        },
        assertSubmissionErrorEmail: function () {
            return this
                .waitForElementVisible('@errorMessageBox', 5000)
                .assert.containsText('@errorMessageBox', 'There is 1 error')
                .assert.containsText('@errorMessageBox', 'Invalid email address');
        },
        assertSubmissionErrorMessage: function () {
            return this
                .waitForElementVisible('@errorMessageBox', 5000)
                .assert.containsText('@errorMessageBox', 'There is 1 error')
                .assert.containsText('@errorMessageBox', 'The message cannot be blank.');
        },
        assertSubmissionSuccess: function () {
            return this
                .waitForElementVisible('@successMessageBox', 5000)
                .assert.containsText('@successMessageBox', 'Your message has been successfully sent to our team.');
        },
        assertSubmissionErrorFile: function () {
            return this
                .waitForElementVisible('@errorMessageBox', 20000)
                .assert.containsText('@errorMessageBox', 'There is 1 error')
                .assert.containsText('@errorMessageBox', 'Bad file extension');
        }


    }],
}