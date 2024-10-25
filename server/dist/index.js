"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const index_db_1 = __importDefault(require("./db/index.db"));
const PORT = process.env.PORT || 3000;
//connect db safely
(0, index_db_1.default)().then(() => {
    app_1.default.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.log(`Error connecting to database: ${err}`);
});
