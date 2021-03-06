const axios = require("axios")
const { getJobs, cleanGithubResponse } = require("./getJobs")
const assert = require("assert");
const express = require("express");
const nock = require("nock");
const supertest = require("supertest");
const router = require("../router");
const app = require("../server.js");


describe("test the server's handling of a GET request", () => {


    const mockJob = [{
        "id": "2a6eedca-1cb3-42a6-b469-78b43750366b",
        "type": "Full Time",
        "url": "https://jobs.github.com/positions/2a6eedca-1cb3-42a6-b469-78b43750366b",
        "created_at": "Wed Nov 13 11:53:54 UTC 2019",
        "company": "Blackbox Company (UK) Ltd.",
        "company_url": "https://www.blackbox-co.com",
        "location": "Crowthorne",
        "title": "Front-End Developer",
        "description": "<h2>Job Description</h2>\n<p>Blackbox is looking for a strong front-end developer to join our UK dev team, to help build the next generation of information control systems for the ...",
        "how_to_apply": "<p><a href=\"mailto:jobs@blackbox-co.com\">jobs@blackbox-co.com</a></p>\n",
        "company_logo": "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa2gzIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--482f93948fc8f680f874a7a28aaaa366b8a428e3/bbx-logo-black.png"
    }];


    it("sends a response of json format", done => {

        nock("https://jobs.github.com")
            .get("/positions.json")
            .query(true)
            .reply(200, mockJob);

        return supertest(app)
            .get("/jobs")
            .query({ location: "madagascar" })
            .expect(200)
            .end(function (err, res) {
                expect(res.body).toEqual(cleanGithubResponse(mockJob));
                if (err) { return done(err); }
                done();

            });

    });
});




test("cleanGithubResponse should return clean data", () => {
    const input = [{
        "id": "6bbe0cd6-95fd-461c-a194-746872465b7e",
        "type": "Contract",
        "url": "https://jobs.github.com/positions/6bbe0cd6-95fd-461c-a194-746872465b7e",
        "created_at": "Sun Oct 27 11:58:38 UTC 2019",
        "company": "Imperial Leisure",
        "company_url": "https://www.imperialleisure.com",
        "location": "London",
        "title": "Freelance React Native/Flutter Developer – Immediate Start",
        "description": "<p>Immediate start. Can work remotely.</p>\n<p>We are looking for a React Native or Flutter developer to build a small mobile app, for charity, that will work on iOS and Android.</p>\n<p>The app will let deaf people download a signed video of a speech that will be given at an event so that they can watch the signed video through the app when they attend the event - there will be no data connection (Wi-Fi or cellular) at the event, so the user will need to download the video before the event and play it back without data. Every week, there'll be a new event and a new video. The data in the app will be available through a JSON feed – e.g. the app will be able to pull the JSON feed detect the new video and download it.</p>\n<p>Here's a summary of how the app will work:</p>\n<ol>\n<li>Every week, a new signed video of a speech will become available to download on the app.</li>\n<li>The user will download the video into the app and save the video in the app to watch later.</li>\n<li>When the user attends the event later on, s/he'll be open up the app and play the video. Please note there'll be no data connection at the event so the user has to be able to download and save the video and play it back without a data connection.</li>\n<li>There will be some other static sections within the app that provide some information about the charity and links to external sites.</li>\n<li>There will be a data collection from inside the app that will allow users to submit their personal details and name so that they can receive email notifications.</li>\n</ol>\n<p>Considerations</p>\n<p>– There is no need for users to sign in or create accounts in the app.\n–  All designs will be provided by us.\n– The app should be multilingual and support two languages.\n–  We'll host the videos.\n– We'd like to be able to deliver push messages and in-app messages to users through a tool such as One Signal</p>\n",
        "how_to_apply": "<p>Please send a copy of your CV to <a href=\"mailto:jobs@imperialleisure.com\">jobs@imperialleisure.com</a></p>\n",
        "company_logo": "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc0YxIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2990a63e7cfc9a32e897832fc947ad89a0e2aef4/il-logo.png"
    }]

    const expected = [
        {
            id: '6bbe0cd6-95fd-461c-a194-746872465b7e',
            url: 'https://jobs.github.com/positions/6bbe0cd6-95fd-461c-a194-746872465b7e',
            company: 'Imperial Leisure',
            location: 'London',
            title: 'Freelance React Native/Flutter Developer – Immediate Start',
            company_logo: 'https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc0YxIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2990a63e7cfc9a32e897832fc947ad89a0e2aef4/il-logo.png',
            created_at: 'Sun, 27 Oct 2019 11:58:38 GMT'
        }
    ]

    const actual = cleanGithubResponse(input)
    //  get rid of whitespace to avoid false-negatives due to string formatting.
    expect(JSON.stringify(actual).replace(/\s/g, '')).toEqual(JSON.stringify(expected).replace(/\s/g, ''))
})

