import { Entity } from './entity';

const getFavoriteHierarchy = () => [
    {
        type: 'subject',
        name: 'cats',
        reason: "They're hilarious creatures."
    },
    {
        type: 'subject',
        name: 'spaces',
        reason: "They're easier to manage when working with more than one environment."
    },
    {
        type: 'subject',
        name: 'water',
        reason: "I really don't have a good reason, I just love water."
    },
    {
        type: 'subject',
        name: 'javascript',
        reason: "It's such a versatile language."
    }
];
const getFavorites = () => [
    {
        type: 'game',
        name: 'Uncharted 4',
        reason: 'I love adventure games!'
    },
    {
        type: 'programming language',
        name: 'JavaScript',
        reason: 'It is usable by anyone.'
    },
    {
        type: 'vehicle',
        name: 'Daytona 675r',
        reason: 'It is the most beautiful bike out there.'
    },
    {
        type: 'show',
        name: 'Futurama',
        reason: 'Have you watched it?'
    }
];
const getAccounts = () => [
    {
        type: 'github account',
        name: 'https://github.com/emilionavarro'
    }
];
const getAcronyms = () => [
    {
        type: 'json',
        name: 'JavaScript Object Notation'
    },
    {
        type: 'html',
        name: 'Hypertext Markup Language'
    }
];

export class Answer {
    intent: string;
    entities: Entity[];
    value: string;
    futurama: boolean;

    constructor(intent: string, entities: any[]) {
        this.intent = intent;
        this.entities = [];
        this.futurama = false;

        for (var i = 0, len = entities.length; i < len; i++) {
            this.entities.push(new Entity(entities[i].entity, entities[i].type));
        }
    }

    process() {
        switch (this.intent) {
            case 'defineSubject':
                var favorites = getFavorites();
                var chosenFavorite = void 0;
                var needsReason = false;

                for (var i = 0, len = favorites.length; i < len; i++) {
                    for (var j = 0, len2 = this.entities.length; j < len2; j++) {
                        if (this.entities[j].value === favorites[i].type) {
                            chosenFavorite = favorites[i];
                        }

                        if (this.entities[j].type === "secondaryQuestion" && this.entities[j].value === "why") {
                            needsReason = true;
                        }
                    }
                }

                if (chosenFavorite) {
                    this.value = chosenFavorite.name + ".";

                    if (chosenFavorite.name.toLowerCase() === "futurama") {
                        this.futurama = true;
                    }

                    if (needsReason) {
                        this.value += " " + chosenFavorite.reason;
                    }
                } else {
                    this.value = "I don't have one."
                }

                break;

            case 'ownsSubject':
                var accounts = getAccounts();
                var chosenAccount = void 0;

                for (var i = 0, len = accounts.length; i < len; i++) {
                    for (var j = 0, len2 = this.entities.length; j < len2; j++) {
                        if (this.entities[j].value === accounts[i].type) {
                            chosenAccount = accounts[i];
                            break;
                        }
                    }

                    if (chosenAccount) {
                        break;
                    }
                }

                if (chosenAccount) {
                    this.value = "I do! Here's my profile: " + chosenAccount.name;
                } else {
                    this.value = "I do not have one."
                }

                break;

            case 'standsFor':
                var acronyms = getAcronyms();
                var chosenAcronym = void 0;

                for (var i = 0, len = acronyms.length; i < len; i++) {
                    for (var j = 0, len2 = this.entities.length; j < len2; j++) {
                        if (this.entities[j].type === 'acronym'
                            && this.entities[j].value === acronyms[i].type) {
                            chosenAcronym = acronyms[i];
                        }
                    }

                    if (chosenAcronym) {
                        break;
                    }
                }

                if (chosenAcronym) {
                    this.value = chosenAcronym.type + " stands for " + chosenAcronym.name;
                } else {
                    this.value = "I'm not sure!";
                }

                break;

            case 'thisOrThat':
                var favoritesHierarchy = getFavoriteHierarchy();
                var chosenFavorite = void 0;
                var needsReason = false;

                for (var i = 0, len = favoritesHierarchy.length; i < len; i++) {
                    for (var j = 0, len2 = this.entities.length; j < len2; j++) {
                        if (this.entities[j].value === favoritesHierarchy[i].name) {
                            chosenFavorite = favoritesHierarchy[i];
                        }

                        if (this.entities[j].type === "secondaryQuestion" && this.entities[j].value === "why") {
                            needsReason = true;
                        }
                    }
                }

                if (chosenFavorite) {
                    this.value = "Definitely " + chosenFavorite.name + ".";
                    
                    if (needsReason) {
                        this.value += " " + chosenFavorite.reason;
                    }
                } else {
                    this.value = "I have no strong feelings one way or the other.";
                }

                break;
        }
    }

}