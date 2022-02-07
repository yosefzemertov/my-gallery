var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var STORAGE_KEY = 'questsTreeDB'

function createQuestsTree() {
    var questsTree = loadFromStorage(STORAGE_KEY);
    if (!questsTree) {
        // console.log('ggg');
        questsTree = createQuest('Male?');
        questsTree.yes = createQuest('Gandhi');
        questsTree.no = createQuest('Rita');
    }
    gPrevQuest = null;
    gQuestsTree = questsTree;
    gCurrQuest = gQuestsTree;
    _savegQuestsTreeToStorage();
}

function createQuest(txt, yes = null) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}


function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res]
    // console.log('gCurrQuest[res]',gCurrQuest);
    // TODO: update the gPrevQuest, gCurrQuest global vars
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // console.log('gQuestsTree.lastRes',gQuestsTree[lastRes]);
    // console.log('gPrevQuest',gPrevQuest[lastRes]);
    // console.log('gPrevQuest', lastRes);
    console.log('newQuestTxt', newQuestTxt);
    console.log('newGuessTxt',newGuessTxt);
    var newQuest = createQuest(newQuestTxt);
    console.log(newQuest);
    newQuest.no = gCurrQuest;
    newQuest.yes =  createQuest(newGuessTxt);
    gPrevQuest[lastRes] = newQuest;
    console.log(gQuestsTree);
    gPrevQuest = null;
    gCurrQuest = gQuestsTree;
    _savegQuestsTreeToStorage();
    // TODO: Create and Connect the 2 Quests to the quetsions tree
}

function resetGame(){
    gPrevQuest = null;
    gCurrQuest = gQuestsTree;

}

function getCurrQuest() {
    return gCurrQuest
}

function _savegQuestsTreeToStorage() {
    saveToStorage(STORAGE_KEY, gQuestsTree)
}
