const MailSlurp = require('mailslurp-client').default
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
require('dotenv').config();

const mailslurp = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY });


async function createInbox() {
    try {
        const inbox = await mailslurp.createInbox();
        return inbox;
    } catch (error) {
        console.log("Error occurred: " + error.message);
    }
}

async function getInbox(inboxId) {
    try {
        const getInbox = await mailslurp.getInbox(inboxId);

        return getInbox;
    } catch (error) {
        console.log("Unexpected error: " + error.message)
    }
}

async function getEmails(inboxId) {
    try {
        const emails = await mailslurp.getEmails(inboxId);
        return emails;
    } catch (error) {
        console.log("Unexpected error: " + error.message)
    }
}

async function getAllEmails() {
    try {
        const emails = await mailslurp.getAllEmails();
        return emails;
    } catch (error) {
        console.log("Unexpected error: " + error.message)
    }
}

async function getHtmlFromEmailBody(inboxId) {
    try {
        const email = await mailslurp.waitForLatestEmail(inboxId);
        return email.body;
    } catch (error) {
        console.log("Unexpected error" + error.message);
    }
}

async function saveInboxId(inboxId) {
    try {
        const envPath = path.join(__dirname, '../.env');

        let envFileContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
 

        const updatedContent = envFileContent.includes('CURRENT_INBOX_ID')
            ? envFileContent.replace(/CURRENT_INBOX_ID=.*/, `CURRENT_INBOX_ID=${inboxId}`)
            : `${envFileContent}\nCURRENT_INBOX_ID=${inboxId}`;

        fs.writeFileSync(envPath, updatedContent, 'utf8');
        
    } catch (error) {   
        console.error('Unexpected error', error.message)
    }
}

async function getActivationLink(htmlBody) {
    try {
        
        const $ = cheerio.load(htmlBody);

        const activationLink = $('a:contains("Activate Account")').attr('href');

        return activationLink;

    } catch (error) {
        console.error('Error fetching activation link:', error.message);
    }
}


module.exports = {getHtmlFromEmailBody, getActivationLink};