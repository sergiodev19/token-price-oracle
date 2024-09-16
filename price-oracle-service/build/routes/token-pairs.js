"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const utils_1 = require("../utils");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.post('/', middlewares_1.authorize, (0, express_validator_1.checkSchema)(utils_1.tokenPairsValidationSchema), middlewares_1.validationMiddleware, controllers_1.createTokenPair);
router.get('/', middlewares_1.validationMiddleware, controllers_1.getTokenPairs);
router.get('/by-symbol/:symbol', middlewares_1.validationMiddleware, controllers_1.getTokenPairBySymbol);
router.get('/:id', middlewares_1.validationMiddleware, controllers_1.getTokenPairById);
router.put('/:id', middlewares_1.authorize, (0, express_validator_1.checkSchema)(utils_1.tokenPairsValidationSchema), middlewares_1.validationMiddleware, controllers_1.updateTokenPair);
router.delete('/:id', middlewares_1.authorize, middlewares_1.validationMiddleware, controllers_1.deleteTokenPair);
exports.default = router;
//# sourceMappingURL=token-pairs.js.map