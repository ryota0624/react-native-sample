/**
 * Created by ryota on 2017/06/25.
 */

import {TagName} from "../../domains/tag/Tag";
import {TopicDescribe, TopicImageUrl, TopicTitle} from "../../domains/topic/Topic";
import {Presenter} from "./Presenter";
import {ICreateTopicInteractor} from "../interactors/CreateTopicInteractor";
import {TopicDTO} from "../../usecases/CreateTopicUseCase";
export enum CreateTopicScene {
    InputTitle,
    Preview,
    EditTag,
    CreateWaiting
}

export enum TopicTitleTemplate {
    "が好きすぎる",
    "のよさについて",
    "はもっと評価されていい",
    "について語り合おう",
    "の素晴らしさを知って欲しい",
    "が一番好き",
    "に人生を捧げている",
    None,
}

// TODO: ↑から生成
export const TopicTitleTemplateNumbers = [0,1,2,3,4,5,6,7];

interface SuggestTags {
    recentlySeeTags: TagName[];
    alreadyTags: TagName[];
}

export interface CreateTopicPresenterState {
    visible: boolean;
    scene: CreateTopicScene;
    inputFormTopicTitle: TopicTitle;
    inputFormTopicDescribe: TopicDescribe;
    selectTitleTemplate: TopicTitleTemplate;
    inputFormImageUrl: TopicImageUrl;
    inputFormTagName: TagName;
    selectTags: TagName[];
    suggestTags: SuggestTags;
}

export interface ICreateTopicPresenter extends Presenter<CreateTopicPresenterState> {
    show: () => void;
    hide: () => void;
    transitionScene: (scene: CreateTopicScene) => void;
    setTopicTitle: (title: string) => void;
    setTopicDescribe: (describe: string) => void;
    setTopicTitleTemplate: (tampleteNumber: number) => void;
    setImageUrl: (url: string) => void;
    setTagName: (tagName: string) => void;
    appendSelectTags: (tagName: string) => void;
    createTopic: () => void;
}


export interface CreateTopicPresenterViewProps extends CreateTopicPresenterState {
    presenter: ICreateTopicPresenter
}
export type CreateTopicViewType = (props: CreateTopicPresenterViewProps) => JSX.Element

export class CreateTopicPresenter extends Presenter<CreateTopicPresenterState> implements ICreateTopicPresenter {
    constructor(private interactor: ICreateTopicInteractor,
                view: CreateTopicViewType) {
        super(view);
    }

    get getInitialState() {
        return {
            visible: false,
            scene: CreateTopicScene.InputTitle,
            inputFormTopicTitle: new TopicTitle(""),
            inputFormTopicDescribe: new TopicDescribe(""),
            selectTitleTemplate: TopicTitleTemplate.が好きすぎる,
            inputFormImageUrl: new TopicImageUrl(""),
            inputFormTagName: new TagName(""),
            selectTags: [],
            suggestTags: {
                recentlySeeTags: [],
                alreadyTags: []
            }
        };
    }

    show = () => this.updater((state, update) => update({...state, visible: true}));
    hide = () => this.updater((state, update) => update({...state, visible: false}));
    transitionScene = (scene: CreateTopicScene) => this.updater((state, update) => update({...state, scene}));
    setTopicTitle = (title: string) => this.updater((state, update) => update({
        ...state,
        inputFormTopicTitle: new TopicTitle(title)
    }));
    setTopicDescribe = (describe: string) => this.updater((state, update) => update({
        ...state,
        inputFormTopicDescribe: new TopicDescribe(describe)
    }));
    setTopicTitleTemplate = (num: number) => this.updater((state, update) => update({
        ...state,
        selectTitleTemplate: num
    }));
    setImageUrl = (url: string) => this.updater((state, update) => update({
        ...state,
        inputFormImageUrl: new TopicImageUrl(url)
    }));
    setTagName = (tagName: string) => this.updater((state, update) => update({
        ...state,
        inputFormTagName: new TagName(tagName)
    }));
    appendSelectTags = (tagNameStr: string) => {
        this.updater((state, update) => {
            const tagName = new TagName(tagNameStr);
            if (state.selectTags.some(selectedTag => selectedTag.equals(tagName))) {
                return;
            }
            update({...state, selectTags: state.selectTags.concat(tagName)});
        });
    };

    createTopic = () => {
        const describe = this.state.inputFormTopicDescribe.value + TopicTitleTemplate[this.state.selectTitleTemplate];
        const topicDto = new TopicDTO(this.state.inputFormTopicTitle.value, describe, this.state.inputFormImageUrl.value);
        const tagNames = this.state.selectTags;

        const useCase = this.interactor.createTopic(topicDto, tagNames);
        useCase.onStart(() => {
            this.transitionScene(CreateTopicScene.CreateWaiting);
        });
        useCase.onResult(() => {
            this.hide();
        });
    };
}