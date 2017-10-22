"use strict";
/**
 * Created by ryota on 2017/10/21.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValueObject_1 = require("../../modelingSupport/ValueObject");
var TalkId = (function (_super) {
    __extends(TalkId, _super);
    function TalkId() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TalkId;
}(ValueObject_1.StringValue));
exports.TalkId = TalkId;
var Talk = (function () {
    function Talk(id, text, createdUserId, createdAt) {
        this.id = id;
        this.text = text;
        this.createdUserId = createdUserId;
        this.createdAt = createdAt;
    }
    return Talk;
}());
exports.Talk = Talk;
