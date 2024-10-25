"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function asyncHandler(requestHandle) {
    return (req, res, next) => {
        Promise.resolve(requestHandle(req, res, next))
            .catch(next);
    };
}
exports.default = asyncHandler;
