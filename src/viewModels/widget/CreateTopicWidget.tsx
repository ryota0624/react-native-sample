import {TagName} from "../../domains/tag/Tag";
import {TopicDescribe, TopicImageUrl, TopicTitle} from "../../domains/topic/Topic";
import {CreateTopicArgs, CreateTopicUseCase, TopicDTO} from "../../usecases/CreateTopicUseCase";
import {UseCase} from "../../usecases/UseCase";
import {TagRepository} from "../../domains/tag/TagRepository";
import {TopicWriteRepository} from "../../domains/topic/TopicRepository";
import {ViewModel} from "../ViewModel";
export enum CreateTopicWidgetScene {
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

interface SuggestTags {
    recentlySeeTags: TagName[];
    alreadyTags: TagName[];
}

export abstract class CreateTopicWidget extends ViewModel {
    static readonly TopicTitleTemplateNumbers = Object.keys(TopicTitleTemplate).map(key => Number(key)).filter(num => Number.isInteger(num));
    abstract tagRepository: TagRepository;
    abstract userId: number;
    abstract topicRepository: TopicWriteRepository;
    visible: boolean = true;
    scene: CreateTopicWidgetScene = CreateTopicWidgetScene.InputTitle;
    inputFormTopicTitle: TopicTitle = new TopicTitle("");
    inputFormTopicDescribe: TopicDescribe = new TopicDescribe("");
    selectTitleTemplate: TopicTitleTemplate = TopicTitleTemplate.が好きすぎる;
    inputFormImageUrl: TopicImageUrl = new TopicImageUrl("");
    inputFormTagName: TagName = new TagName("");
    selectTags: TagName[] = [];
    suggestTags: SuggestTags = {
        recentlySeeTags: [],
        alreadyTags: []
    };

    show = () => {
        this.visible = true;
        this.viewUpdate();
    };

    hide = () => {
        this.visible = false;
        this.viewUpdate();
    };

    transitionScene = (scene: CreateTopicWidgetScene) => {
        this.scene = scene;
        this.viewUpdate();
    };

    setTopicTitle = (title: string) => {
        this.inputFormTopicTitle = new TopicTitle(title);
        this.viewUpdate();
    };

    setTopicDescribe = (describe: string) => {
        this.inputFormTopicDescribe = new TopicDescribe(describe);
        this.viewUpdate();
    };

    setTopicTitleTemplate = (templateNumber: number) => {
        this.selectTitleTemplate = templateNumber;
        this.viewUpdate();
    };

    setImageUrl = (url: string) => {
        this.inputFormImageUrl = new TopicImageUrl(url);
        this.viewUpdate();
    };

    setTagName = (tagName: string) => {
        this.inputFormTagName = new TagName(tagName);
        this.viewUpdate();
    };

    appendSelectTags = (tagNameStr: string) => {
        const tagName = new TagName(tagNameStr);
        if (this.selectTags.some(selectedTag => selectedTag.equals(tagName))) {
            return;
        }
        this.selectTags.push(tagName);
        this.viewUpdate();
    };

    createTopic = () => {
        const describe = this.inputFormTopicDescribe.value + TopicTitleTemplate[this.selectTitleTemplate];
        const topicDto = new TopicDTO(this.inputFormTopicTitle.value, describe, this.inputFormImageUrl.value);
        const tagNames = this.selectTags.map(tag => tag.value);
        const args: CreateTopicArgs = {
            userId: this.userId,
            topicDto,
            tagNames
        };
        const useCase = new CreateTopicUseCase(this.topicRepository, this.tagRepository);
        UseCase.execute(args, useCase);
        useCase.onStart(() => {
            this.transitionScene(CreateTopicWidgetScene.CreateWaiting);
            this.viewUpdate();
        });
        useCase.onResult(() => {
            this.hide();
            this.viewUpdate();
        });
    };
}