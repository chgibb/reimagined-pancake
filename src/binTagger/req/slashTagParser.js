"use strict";
function makeLearnedTagRegex(token) {
    return new RegExp("\\b" + escapeStringRegexp(token) + "\\b", "i");
}
exports.makeLearnedTagRegex = makeLearnedTagRegex;
function makeLearnedTagRegexs(tags) {
    for (var i = 0; i != tags.length; ++i) {
        tags[i].regex = makeLearnedTagRegex(tags[i].token);
    }
}
var learnedTagsPath = "classifiers/learnedTags.json";
var blackListTagsPath = "classifiers/learnedBlackList.json";
var jsonFile = require('./../../jsreq/jsonfile');
var escapeStringRegexp = require("escape-string-regexp");
var organization = new RegExp("\\/ORGANIZATION", "i");
var person = new RegExp("\\/PERSON", "i");
var location = new RegExp("\\/LOCATION", "i");
var nothing = new RegExp("(\\/O)", "i");
exports.splitTokens = new RegExp("(\\s)|(\\n)|( )", "i");
exports.learnedTags = new Array();
var blackListedTags = new Array();
function init() {
    try {
        blackListedTags = jsonFile.readFileSync(blackListTagsPath);
        makeLearnedTagRegexs(blackListedTags);
    }
    catch (err) {
        console.log(err);
        blackListedTags = new Array();
    }
    try {
        exports.learnedTags = jsonFile.readFileSync(learnedTagsPath);
        for (var i = 0; i != exports.learnedTags.length; ++i) {
            if (isOnBlackList(exports.learnedTags[i].token)) {
                exports.learnedTags.splice(i, 1);
                break;
            }
        }
        makeLearnedTagRegexs(exports.learnedTags);
    }
    catch (err) {
        console.log(err);
        exports.learnedTags = new Array();
    }
}
function isOnBlackList(tag) {
    for (var i = 0; i != blackListedTags.length; ++i) {
        if (blackListedTags[i].regex.test(tag)) {
            return true;
        }
    }
    return false;
}
function addNewLearnedTag(tag) {
    if (isOnBlackList(tag.token))
        return;
    for (var i = 0; i != exports.learnedTags.length; ++i) {
        if (exports.learnedTags[i].token == tag.token)
            return;
    }
    exports.learnedTags.push({
        token: tag.token,
        entity: tag.entity,
        regex: makeLearnedTagRegex(tag.token)
    });
}
function testForLearnedTag(item) {
    var res = undefined;
    for (var i = 0; i != exports.learnedTags.length; ++i) {
        if (exports.learnedTags[i].regex.test(item)) {
            res =
                {
                    token: item,
                    entity: exports.learnedTags[i].entity,
                };
            return res;
        }
    }
    return undefined;
}
exports.testForLearnedTag = testForLearnedTag;
function saveLearnedTags() {
    try {
        jsonFile.writeFileSync(learnedTagsPath, exports.learnedTags, { spaces: 4 });
    }
    catch (err) {
        console.log(err);
    }
}
exports.saveLearnedTags = saveLearnedTags;
function parseSlashTags(slashString) {
    var res = new Array();
    var tmp = slashString.split(exports.splitTokens);
    for (var i = 0; i != tmp.length; ++i) {
        var token = "";
        var tmpToken = "";
        if (organization.test(tmp[i])) {
            tmpToken = tmp[i].replace(organization, "");
            if (!isOnBlackList(tmpToken))
                res.push({ token: tmpToken, entity: "organization" });
            continue;
        }
        if (person.test(tmp[i])) {
            tmpToken = tmp[i].replace(person, "");
            if (!isOnBlackList(tmpToken))
                res.push({ token: tmpToken, entity: "person" });
            continue;
        }
        if (location.test(tmp[i])) {
            tmpToken = tmp[i].replace(location, "");
            if (!isOnBlackList(tmpToken))
                res.push({ token: tmpToken, entity: "location" });
            continue;
        }
    }
    for (var i = 0; i != res.length; ++i) {
        addNewLearnedTag(res[i]);
    }
    for (var i = 0; i != tmp.length; ++i) {
        if (tmp[i] && nothing.test(tmp[i])) {
            var tmpToken = tmp[i].replace(nothing, "");
            var learnedTag = testForLearnedTag(tmpToken);
            if (learnedTag)
                res.push(learnedTag);
        }
    }
    for (var i = 0; i != res.length; ++i) {
        if (isOnBlackList(res[i].token)) {
            res.splice(i, 1);
            i--;
        }
    }
    return res;
}
exports.parseSlashTags = parseSlashTags;
init();
