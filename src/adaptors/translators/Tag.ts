

import {LoveLevel, Tag, TagName} from "../../domains/tag/Tag";
export function tag2Dto(tag: Tag) {
    return {
        name: tag.id.value,
        loveLevel: tag.loveLevel.toFixed()
    }
}

export function dto2Tag(dto: any) {
    function number2LoveLevel(num: number): LoveLevel {
        switch (num) {
            case 0: return LoveLevel.Zero;
            case 1: return LoveLevel.One;
            case 2: return LoveLevel.Two;
            case 3: return LoveLevel.Three;
            default: {
                throw new Error("invalid loveLevel number");
            }
        }
    }
    return Tag.factory({
        id: new TagName(dto.id),
        loveLevel: number2LoveLevel(dto.loveLevel)
    })
}