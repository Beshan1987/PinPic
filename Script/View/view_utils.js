import { AddBtnNames, boardNames, HeaderAction, BoardsAction, GropuInfoBoxes } from './view_constants.js';
import { CausesComplains } from '../View/ModalView/ModalAddBan/ModalAddBan_constants.js';

export function createBtn(title, buttonProps) {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-lg');
    button.textContent = title;

    for (const key in buttonProps) {
        button.setAttribute(key, buttonProps[key]);
    }

    return button;
}

export function createSearchInput() {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('data-header-action', `${HeaderAction.search}`);
    input.setAttribute('placeholder', 'search...');
    input.setAttribute('id', 'search-input');
    input.classList.add('form-control', 'text-center', 'input-gap', 'rounded-pill');

    return input;
}

export function createBoard() {
    const boardContainer = document.createElement('div');
    boardContainer.classList.add('dropdown');


    const boardBtn = document.createElement('button');
    boardBtn.classList.add('btn', 'btn-outline-success', 'btn-lg');
    boardBtn.setAttribute('data-header-action', `${HeaderAction.openDropBoard}`);
    boardBtn.textContent = `${AddBtnNames.pickBoard}`;
    boardBtn.setAttribute('id', 'dropDownBtn');

    const boardDrop = document.createElement('div');
    boardDrop.classList.add('dropdown-content');
    boardDrop.setAttribute('id', 'dropDownList');

    for (const name of boardNames) {
        const boardItem = document.createElement('a');
        boardItem.setAttribute('data-board-action', BoardsAction.loadBoard);
        boardItem.setAttribute('name', `${name}`);
        boardItem.textContent = name;
        boardItem.setAttribute('id', `${name}`);

        boardDrop.append(boardItem);
    }

    const boardItemDelete = document.createElement('a');
    boardItemDelete.textContent = AddBtnNames.deleteAllboards;
    boardItemDelete.setAttribute('data-board-action', BoardsAction.cleanBoardsCards);
    boardItemDelete.classList.add('bg-danger', 'text-light');
    boardDrop.append(boardItemDelete)

    const returnToSearch = document.createElement('a');
    returnToSearch.textContent = BoardsAction.returnToSearch;
    returnToSearch.setAttribute('data-board-action', BoardsAction.returnToSearch);
    returnToSearch.classList.add('bg-warning', 'bg-gradient', 'fs-6');
    boardDrop.append(returnToSearch);

    boardContainer.append(boardBtn, boardDrop);
    return boardContainer;
}

export function createReturnBtnMain() {
    const container = document.getElementById('container-btn-board');
    const returnMainBtn = document.createElement('button');
    returnMainBtn.classList.add('btn', 'btn-sm', 'btn-success', 'width-btn-board');
    returnMainBtn.setAttribute('data-board-action', BoardsAction.returnToTheMainPage);
    returnMainBtn.textContent = `${BoardsAction.returnToTheMainPage}`;
    returnMainBtn.setAttribute('id', 'returnMain');

    return container.append(returnMainBtn);
}

export function createCleanBtn(name) {
    const container = document.getElementById('container-btn-board');

    const cleanBtn = document.createElement('button');
    cleanBtn.classList.add('btn', 'btn-sm', 'btn-dark', 'width-btn-board');

    cleanBtn.setAttribute('data-board-action', BoardsAction.cleanBoard);
    cleanBtn.setAttribute('name', `${name}`);
    cleanBtn.textContent = `clean ${name}`;
    cleanBtn.setAttribute('id', 'cleanBoard');

    cleanBtn.addEventListener('click', () => {
        cleanBtn.setAttribute('disabled', 'disabled');
    })

    return container.append(cleanBtn);
}


export function createCheckBoxesСomplain(causes) {
    const checkBoxContainerBasic = document.createElement('div');
    checkBoxContainerBasic.setAttribute('id', 'check-boxes')
    for (const key in CausesComplains) {
        const checkBoxContainer = document.createElement('div');
        checkBoxContainer.classList.add('form-check', 'check-gap');
        checkBoxContainer.setAttribute('id', 'modalComplainCheckBox');

        const checkBoxinput = document.createElement('input');
        checkBoxinput.classList.add('form-check-input');
        checkBoxinput.setAttribute('type', 'checkbox');

        const checkBoxLabel = document.createElement('label');
        checkBoxLabel.classList.add('form-check-label');

        checkBoxLabel.textContent = CausesComplains[key];
        checkBoxLabel.append(checkBoxinput)
        checkBoxContainer.append(checkBoxLabel)

        checkBoxContainerBasic.append(checkBoxContainer);
    }
    return checkBoxContainerBasic;
}

export function addSearchElements(searchURL, amount) {
    const btnContainer = document.createElement('div');
    btnContainer.setAttribute('id', 'btn-container');

    const firstBtn = document.createElement('button');
    firstBtn.setAttribute('id', 'button_first');
    firstBtn.classList.add('button-page', 'first', 'btn', 'btn-warning');

    const prevBtn = document.createElement('button');
    prevBtn.setAttribute('id', 'button_prev');
    prevBtn.classList.add('button-page', 'prev', 'btn', 'btn-warning');

    const currBtn = document.createElement('button');
    currBtn.setAttribute('id', 'button_curr');
    currBtn.classList.add('button_curr', 'btn');

    const nextBtn = document.createElement('button');

    nextBtn.setAttribute('id', 'button_next');
    nextBtn.classList.add('button-page', 'next', 'btn', 'btn-warning');

    const lastBtn = document.createElement('button');
    lastBtn.setAttribute('id', 'button_last');
    lastBtn.classList.add('button-page', 'last', 'btn', 'btn-warning');

    btnContainer.append(firstBtn, prevBtn, currBtn, nextBtn, lastBtn);

    document.getElementById('card-container').after(btnContainer);
    document.getElementById('search-input').after(addSearchInfo(searchURL, amount));
}

export function addSearchInfo(searchURL, amount) {
    const searchInfo = document.createElement('p');
    searchInfo.setAttribute('id', `${GropuInfoBoxes.searchInfo}`);
    searchInfo.classList.add('search-info', 'container-sm', 'd-flex', 'justify-content-evenly');

    const searchParams = new URLSearchParams(searchURL);
    const searchQuery = searchParams.get('query');
    searchInfo.textContent = `${amount} pictures found for : "${searchQuery}"`;

    return searchInfo;
}

export function removeSearchElements() {
    if (document.getElementById('btn-container')) {
        document.getElementById('btn-container').remove();
        document.getElementById('search-info').remove();
    }
}

export function removeCleanBar() {
    if (document.getElementById('cleanBoard')) {
        document.getElementById('cleanBoard').remove();
    }
}

export function removeReturnBtn() {
    if (document.getElementById('returnMain')) {
        document.getElementById('returnMain').remove();
    }
}

export function createBtnRemoveToHeader() {
    const cardButton = document.createElement('button');
    cardButton.setAttribute('id', 'return-button');
    cardButton.setAttribute('data-card-action', 'return-button');
    const cardImg = document.createElement('img');
    cardImg.setAttribute('src', '././style/img/up-arrow.svg');
    cardImg.classList.add('return-btnImg');
    cardButton.append(cardImg);
    cardButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    })

    return cardButton;
}

let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    const header = document.getElementById("header");
    const headerReturn = document.getElementById("return-button");
    if (prevScrollpos > currentScrollPos) {
        header.style.opacity = "1";
        headerReturn.style.opacity = "1";
    } if (prevScrollpos < currentScrollPos && window.pageYOffset > 50) {
        header.style.opacity = "0";
        headerReturn.style.opacity = "0";
    }

    if (window.pageYOffset > 500) {
        headerReturn.style.opacity = "0.8";
    } if (window.pageYOffset < 500) { headerReturn.style.opacity = "0"; }

    prevScrollpos = currentScrollPos;
}

export function errorPage(err) {
    const root = document.getElementById('root');
    const footer = document.getElementById('footer');
    const appCard = document.getElementById('app-card');
    footer.remove();
    appCard.remove();
    const errorPage = document.createElement('div');
    errorPage.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'text-center', 'text-warning', 'error', 'bg-dark');
    if (err === `SyntaxError: Unexpected token 'R', "Rate Limit Exceeded" is not valid JSON`) {
        errorPage.textContent = 'Rate Limit Exceeded. Try again later';
    } else {
        errorPage.textContent = err;
    };
    root.append(errorPage);
    return root;
}

