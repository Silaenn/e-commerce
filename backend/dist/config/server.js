"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = ({ env }) => ({
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 7860),
    app: {
        keys: env.array('APP_KEYS'),
    },
});
exports.default = config;
