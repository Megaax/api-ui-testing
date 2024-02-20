module.exports = {
    '@tags': ['contactForm'],

    'Test valid form submission': function (browser) {
        const email = 'validemail@example.com';
        const message = 'This is a valid message';
        const orderid = '12345';
        const filepath = 'file.txt';

        const page = browser.page.contactForm();

        page
            .navigate()
            .click('@contactSelector')
            .selectSubjectHeading('Webmaster')
            .setEmail(email)
            .setOrderID(orderid)
            .enterMessage(message)
            .uploaderFile(filepath)
            .click('@submitButton')
            .assertSubmissionSuccess(); // Define this function in your page object

        browser.end();
    },

    'Test Minimal valid form submission': function (browser) {
        const email = 'validemail@example.com';
        const message = 'This is a valid message';

        const page = browser.page.contactForm();

        page
            .navigate()
            .click('@contactSelector')
            .selectSubjectHeading('Webmaster')
            .setEmail(email)
            .enterMessage(message)
            .click('@submitButton')
            .assertSubmissionSuccess();

        browser.end();
    },


    'Test invalid form submission - missing email': function (browser) {
        const message = 'This is a message';
        const orderid = '54321';
        const filepath = 'file.txt';

        const page = browser.page.contactForm();

        page
            .navigate()
            .click('@contactSelector')
            .selectSubjectHeading('Webmaster')
            .setEmail('') // Set an empty email to test invalid submission
            .setOrderID(orderid)
            .enterMessage(message)
            .uploaderFile(filepath)
            .click('@submitButton')
            .assertSubmissionErrorEmail();

        browser.end();
    },

    'Test invalid form submission - missing message': function (browser) {
        const email = 'anotheremail@example.com';
        const orderid = '78901';
        const filepath = 'file.txt';

        const page = browser.page.contactForm();

        page
            .navigate()
            .click('@contactSelector')
            .selectSubjectHeading('Webmaster')
            .setEmail(email)
            .setOrderID(orderid)
            .enterMessage('') // Set an empty message to test invalid submission
            .uploaderFile(filepath)
            .click('@submitButton')
            .assertSubmissionErrorMessage();

        browser.end();
    },

    'Test invalid form submission - missing subject': function (browser) {
        const email = 'anotheremail@example.com';
        const orderid = '78901';
        const filepath = 'file.txt';
        const message = 'This is a message';


        const page = browser.page.contactForm();

        page
            .navigate()
            .click('@contactSelector')
            .setEmail(email)
            .setOrderID(orderid)
            .enterMessage(message) // Set an empty message to test invalid submission
            .uploaderFile(filepath)
            .click('@submitButton')
            .assertSubmissionErrorSubject();

        browser.end();
    },

    'Test Invalid Form Submission - Missing Email and Message': function (browser) {
        const orderid = '54321';
        const filepath = 'file.txt';

        const page = browser.page.contactForm();

        page
            .navigate()
            .click('@contactSelector')
            .selectSubjectHeading('Webmaster')
            .setEmail('') // Set an empty email to test invalid submission
            .setOrderID(orderid)
            .enterMessage('') // Set an empty message to test invalid submission
            .uploaderFile(filepath)
            .click('@submitButton')
            .assertSubmissionErrorEmail()
        // .assertSubmissionErrorMessage();

        browser.end();
    },

    'Test Form Submission Without Uploading a File': function (browser) {
        const email = 'validemail@example.com';
        const message = 'This is a valid message';
        const orderid = '12345';

        const page = browser.page.contactForm();

        page
            .navigate()
            .click('@contactSelector')
            .selectSubjectHeading('Webmaster')
            .setEmail(email)
            .setOrderID(orderid)
            .enterMessage(message)
            .click('@submitButton')
            .assertSubmissionSuccess();

        browser.end();
    },

    'Test Form Submission With Wrong File Extension': function (browser) {
        const email = 'validemail@example.com';
        const message = 'This is a valid message';
        const orderid = '12345';
        const largeFilepath = 'largefile.rar';

        const page = browser.page.contactForm();

        page
            .navigate()
            .click('@contactSelector')
            .selectSubjectHeading('Webmaster')
            .setEmail(email)
            .setOrderID(orderid)
            .enterMessage(message)
            .uploaderFile(largeFilepath)
            .click('@submitButton')
            .assertSubmissionErrorFile(); // Define this function in your page object

        browser.end();
    },

};
