/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Initial D Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.ask.skill.1b50aa3d-2078-4a88-ad1e-d4b8ee269089"; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var FACTS = [
    "It was written and illustrated by Shuichi Shigeno, originally as a comic book, from 1995 to 2013.",
    "It is a manga series.  Manga are comics created in Japan or by their creators in the Japanese language, conforming to a style developed in Japan in the late nineteenth century.",
    "Although some of the names of the locations the characters race in have been fictionalized, all of the locations in the series are based on actual locations in Japan.",
    "Initial D was originally published in Young magazine, a weekly manga magazine that generally includes violent, sexy and action-oriented concurrent stories.",
    "Initial D has been adapted into a television anime series, anime movie and a live action film.",
    "Takumi started delivering tofu each morning since the seventh grade, five years prior to the start of the series.",
    "The Toyota Trueno AE Eight Six was originally known as the Ghost of Akina.",
    "Mount Akina, home of the Akina Speed Stars is not real.  It is based off of Mount Haruna and can be found on the northern border of Gunma prefecture between Seibu and Chubu",
    "Mount Akagi, the home of the Red Suns is real. It is actually a volcano, although it is not considered active or likely to ever be active. reports of activity in 1938 are disputed.",
    "Mount Miyogi, home of the Night Kids is a real mountain.",
    "Takumi Fujiwara is voiced by two different people in the english versions.  Dave Wittenberg voiced the Tokoypop production and Joel McDonal voiced the Funimation production.",
    "The first Initial D manga volume was released on November six, nineteen-ninety-five and concluded it's production run on July twenty-nine, two-thousand-thirteen.",
    "Initial D Manga was officially translated into Chinese, French and English during it's production run.",
    "The first Initial D anime episode premiered on Fuji TV on April eight, nineteen-ninety-eight.",
    "It took over sixteen years for all of the anime adaptations of Initial D to be aired, most on a pay-per-view basis.",
    "Both funimation and tokyopop changed the soundtracks of the original Japanese anime productions, to better suit the american audience and try to be aired on television.",
    "A live action film adaptation of Intial D was released on June twenty-third, two-thousand and five to mixed reviews.  A sequel has been rumored for several years but no official announcements as of two-thousand-seventeen.",
    "The Toyota AE eight-six was produced from ninteen-eighty-three to nineteen-eighty-seven in two major configurations, the Corolla Levin and the Sprinter Trueno.",
    "The chassis code AE eight-six depicts the rear wheel drive sixteen-hundred CC model, with the A representing the four A engine code, the E representing the corolla, the eight representing the fifth generation and the six represents the varion within its generation.",
    "The AE eight-six came in both a two door coupe and 3 door hatchback.",
    "The AE eight-six originally had three different engine options, all of them a variation of a one-point-six liter, four cylinder engine.",
    "Trueno is Spanish for thunder.",
    "Levin is middle-english for lightning",
    "The Sprinter Trueno was exclusively sold new to Toyota dealerships called Toyota Vista Stores.",
    "The four-A-G-E engine used in the AE eight six car was also used in the Toyota MR two, Toyota Celica GT-R and GT Carina.",
    "The author of Initial D also is behind Shakotan Boogie and Wangan Midnight, which are also motorsport focused manga series.",
    "Impact Blue driver, Majo Sato drives a sil-eighty, which is a Nissan one-eighty-es-ex with a Nissan Silvia's headlights, front fenders, hood and front bumper.  So a combination of a Silvia and a One-eighty-es-ex."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * Initial D Geek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me an Initial D fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};

