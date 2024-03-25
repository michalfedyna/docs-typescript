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
const tsdoc_1 = require("@microsoft/tsdoc");
const path = __importStar(require("path"));
const ExtractorConfig_1 = require("../ExtractorConfig");
const testDataFolder = path.join(__dirname, 'test-data');
describe('Extractor-custom-tags', () => {
    describe('should use a TSDocConfiguration', () => {
        it.only("with custom TSDoc tags defined in the package's tsdoc.json", () => {
            const extractorConfig = ExtractorConfig_1.ExtractorConfig.loadFileAndPrepare(path.join(testDataFolder, 'custom-tsdoc-tags/api-extractor.json'));
            const { tsdocConfiguration } = extractorConfig;
            expect(tsdocConfiguration.tryGetTagDefinition('@block')).not.toBe(undefined);
            expect(tsdocConfiguration.tryGetTagDefinition('@inline')).not.toBe(undefined);
            expect(tsdocConfiguration.tryGetTagDefinition('@modifier')).not.toBe(undefined);
        });
        it.only("with custom TSDoc tags enabled per the package's tsdoc.json", () => {
            const extractorConfig = ExtractorConfig_1.ExtractorConfig.loadFileAndPrepare(path.join(testDataFolder, 'custom-tsdoc-tags/api-extractor.json'));
            const { tsdocConfiguration } = extractorConfig;
            const block = tsdocConfiguration.tryGetTagDefinition('@block');
            const inline = tsdocConfiguration.tryGetTagDefinition('@inline');
            const modifier = tsdocConfiguration.tryGetTagDefinition('@modifier');
            expect(tsdocConfiguration.isTagSupported(block)).toBe(true);
            expect(tsdocConfiguration.isTagSupported(inline)).toBe(true);
            expect(tsdocConfiguration.isTagSupported(modifier)).toBe(false);
        });
        it.only("with standard tags and API Extractor custom tags defined and supported when the package's tsdoc.json extends API Extractor's tsdoc.json", () => {
            const extractorConfig = ExtractorConfig_1.ExtractorConfig.loadFileAndPrepare(path.join(testDataFolder, 'custom-tsdoc-tags/api-extractor.json'));
            const { tsdocConfiguration } = extractorConfig;
            expect(tsdocConfiguration.tryGetTagDefinition('@inline')).not.toBe(undefined);
            expect(tsdocConfiguration.tryGetTagDefinition('@block')).not.toBe(undefined);
            expect(tsdocConfiguration.tryGetTagDefinition('@modifier')).not.toBe(undefined);
            tsdoc_1.StandardTags.allDefinitions
                .concat([
                tsdocConfiguration.tryGetTagDefinition('@betaDocumentation'),
                tsdocConfiguration.tryGetTagDefinition('@internalRemarks'),
                tsdocConfiguration.tryGetTagDefinition('@preapproved')
            ])
                .forEach((tag) => {
                expect(tsdocConfiguration.tagDefinitions.includes(tag));
                expect(tsdocConfiguration.supportedTagDefinitions.includes(tag));
            });
        });
    });
});
//# sourceMappingURL=Extractor-custom-tags.test.js.map