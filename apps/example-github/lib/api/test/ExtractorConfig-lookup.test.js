"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const node_core_library_1 = require("@rushstack/node-core-library");
const ExtractorConfig_1 = require("../ExtractorConfig");
const testDataFolder = path.join(__dirname, 'test-data');
function expectEqualPaths(path1, path2) {
    if (!node_core_library_1.Path.isEqual(path1, path2)) {
        fail('Expected paths to be equal:\npath1: ' + path1 + '\npath2: ' + path2);
    }
}
// Tests for expanding the "<lookup>" token for the "projectFolder" setting in api-extractor.json
describe(`${ExtractorConfig_1.ExtractorConfig.name}.${ExtractorConfig_1.ExtractorConfig.loadFileAndPrepare.name}`, () => {
    it.only('config-lookup1: looks up ./api-extractor.json', () => {
        const extractorConfig = ExtractorConfig_1.ExtractorConfig.loadFileAndPrepare(path.join(testDataFolder, 'config-lookup1/api-extractor.json'));
        expectEqualPaths(extractorConfig.projectFolder, path.join(testDataFolder, 'config-lookup1'));
    });
    it.only('config-lookup2: looks up ./config/api-extractor.json', () => {
        const extractorConfig = ExtractorConfig_1.ExtractorConfig.loadFileAndPrepare(path.join(testDataFolder, 'config-lookup2/config/api-extractor.json'));
        expectEqualPaths(extractorConfig.projectFolder, path.join(testDataFolder, 'config-lookup2'));
    });
    it.only('config-lookup3a: looks up ./src/test/config/api-extractor.json', () => {
        const extractorConfig = ExtractorConfig_1.ExtractorConfig.loadFileAndPrepare(path.join(testDataFolder, 'config-lookup3/src/test/config/api-extractor.json'));
        expectEqualPaths(extractorConfig.projectFolder, path.join(testDataFolder, 'config-lookup3/src/test/'));
    });
});
//# sourceMappingURL=ExtractorConfig-lookup.test.js.map