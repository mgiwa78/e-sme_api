"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URI = void 0;
exports.MONGO_URI = process.env.NODE_ENV === "development"
    ? "mongodb://127.0.0.1:27017"
    : "mongodb+srv://vercel-admin-user:XSUQj0QdXR7G61It@cluster0.za7xrpe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//# sourceMappingURL=__CONSTANTS__.js.map