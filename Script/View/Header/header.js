import { createHeader, boardsInfo } from './header_itils.js';
import { HeaderAction, BoardsAction } from '../view_constants.js';
import { createCleanSearch } from '../view_utils.js';
import { CardModel } from "../../Model/model_index.js";
import { createClearBoardsModalEmpty } from '../ModalView/ModalView_utils.js';


export class Header {
    constructor(onHeaderAction, onBoardAction) {
        this.cardContainer = createHeader();
        this.onHeaderAction = onHeaderAction;
        this.cardContainer.addEventListener('submit', this.onFormSubmit);
        this.cardContainer.addEventListener('click', this.onHeaderClick);
        this.cardContainer.addEventListener('click', ({ target }) => {
            if (Object.values(BoardsAction).includes(target.dataset.boardAction)) {
                onBoardAction(target.dataset.boardAction, target.name);
            } if (Object.values(HeaderAction).includes(target.dataset.headerAction)) {
                onHeaderAction(target.dataset.headerAction, target.name);
            }
        })
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        const { value } = this.cardContainer.children[1].firstChild;
        const formattedValue = value.trim();
        let searchURL = `https://api.unsplash.com/search/photos?client_id=b8ceCX7AhS7wQwR4YPOiDVayRsuU85elxayHop0LvN4&per_page=28&query=${formattedValue}`;
        if (formattedValue) {
            this.onHeaderAction(HeaderAction.search, searchURL);
            this.cardContainer.children[1].reset();
            this.removeBoardsInfo();
            createCleanSearch();
        }
    }

    renderBoardInfo = (numberItems, name) => {
        document.getElementById('container-btn-board').after(boardsInfo(numberItems, name));
    }

    removeBoardsInfo = () => {
        if (document.getElementById('board-info')) {
            return document.getElementById('board-info').remove();
        }
    }
}
