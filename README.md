# OneSeven Automation

This project is an automated testing suite for the OneSeven application, built with **Playwright** and **Cucumber**. It uses **MailSlurp** for handling email verifications and **dotenv** for managing environment variables.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup & Config](#setupconfig)
- [Running Tests](#running-tests)
---

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or later)
- **npm** (Node Package Manager)

## Installation

Clone the repository and install the required packages:

```bash
git clone https://github.com/alexxvazquezz/oneseven-auto.git
cd oneseven-auto
npm install
```

## Setup & Config

1. Create an .env fie at the root of the project:

```.env
MAILSLURP_API_KEY=your_mailslurp_api_key
INBOX_ID=your_inbox_id from maiolslurp
EMAIL_ADDRESS=email_from_Mailslurp
USERNAME=ussernam
ACTIVE_USER_EMAIL=email
ACTIVE_USER_PASS=pass
HEADLESS=true
BROWSER=firefox
```

2. To change browser globally change .env file `BROWSER={ browser }` to either firefox, chromium or webkit.
3. To change from headles globally change .env file `BROWSER={ headless }` to either true or false.

## Running Tests

- Run all test in default browser `npm run test`. Or browser that is specified in the `.env` file.
- To run on a specific browser `npm run test:chrome` for chrome and `npm run test:firefox` for firefox. 

