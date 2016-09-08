"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
require("rxjs/add/operator/share");
require("rxjs/add/operator/map");
require("rxjs/add/operator/merge");
require("rxjs/add/operator/toArray");
var translate_parser_1 = require("./translate.parser");
var MissingTranslationHandler = (function () {
    function MissingTranslationHandler() {
    }
    return MissingTranslationHandler;
}());
exports.MissingTranslationHandler = MissingTranslationHandler;
var TranslateLoader = (function () {
    function TranslateLoader() {
    }
    return TranslateLoader;
}());
exports.TranslateLoader = TranslateLoader;
var TranslateStaticLoader = (function () {
    function TranslateStaticLoader(http, prefix, suffix) {
        if (prefix === void 0) { prefix = "i18n"; }
        if (suffix === void 0) { suffix = ".json"; }
        this.http = http;
        this.prefix = prefix;
        this.suffix = suffix;
    }
    /**
     * Gets the translations from the server
     * @param lang
     * @returns {any}
     */
    TranslateStaticLoader.prototype.getTranslation = function (lang) {
        return this.http.get(this.prefix + "/" + lang + this.suffix)
            .map(function (res) { return res.json(); });
    };
    return TranslateStaticLoader;
}());
exports.TranslateStaticLoader = TranslateStaticLoader;
var TranslateService = (function () {
    /**
     *
     * @param http The Angular 2 http provider
     * @param currentLoader An instance of the loader currently used
     * @param missingTranslationHandler A handler for missing translations.
     */
    function TranslateService(currentLoader, missingTranslationHandler) {
        this.currentLoader = currentLoader;
        this.missingTranslationHandler = missingTranslationHandler;
        /**
         * The lang currently used
         */
        this.currentLang = this.defaultLang;
        /**
         * An EventEmitter to listen to translation change events
         * onTranslationChange.subscribe((params: TranslationChangeEvent) => {
         *     // do something
         * });
         * @type {ng.EventEmitter<TranslationChangeEvent>}
         */
        this.onTranslationChange = new core_1.EventEmitter();
        /**
         * An EventEmitter to listen to lang change events
         * onLangChange.subscribe((params: LangChangeEvent) => {
         *     // do something
         * });
         * @type {ng.EventEmitter<LangChangeEvent>}
         */
        this.onLangChange = new core_1.EventEmitter();
        this.translations = {};
        this.langs = [];
        this.parser = new translate_parser_1.Parser();
    }
    /**
     * Sets the default language to use as a fallback
     * @param lang
     */
    TranslateService.prototype.setDefaultLang = function (lang) {
        this.defaultLang = lang;
    };
    /**
     * Changes the lang currently used
     * @param lang
     * @returns {Observable<*>}
     */
    TranslateService.prototype.use = function (lang) {
        var _this = this;
        var pending;
        // check if this language is available
        if (typeof this.translations[lang] === "undefined") {
            // not available, ask for it
            pending = this.getTranslation(lang);
        }
        if (typeof pending !== "undefined") {
            // on init set the currentLang immediately
            if (!this.currentLang) {
                this.currentLang = lang;
            }
            pending.subscribe(function (res) {
                _this.changeLang(lang);
            });
            return pending;
        }
        else {
            this.changeLang(lang);
            return Observable_1.Observable.of(this.translations[lang]);
        }
    };
    /**
     * Gets an object of translations for a given language with the current loader
     * @param lang
     * @returns {Observable<*>}
     */
    TranslateService.prototype.getTranslation = function (lang) {
        var _this = this;
        this.pending = this.currentLoader.getTranslation(lang).share();
        this.pending.subscribe(function (res) {
            _this.translations[lang] = res;
            _this.updateLangs();
        }, function (err) {
            throw err;
        }, function () {
            _this.pending = undefined;
        });
        return this.pending;
    };
    /**
     * Manually sets an object of translations for a given language
     * @param lang
     * @param translations
     * @param shouldMerge
     */
    TranslateService.prototype.setTranslation = function (lang, translations, shouldMerge) {
        if (shouldMerge === void 0) { shouldMerge = false; }
        if (shouldMerge && this.translations[lang]) {
            Object.assign(this.translations[lang], translations);
            this.onTranslationChange.emit({ translations: translations, lang: lang });
        }
        else {
            this.translations[lang] = translations;
        }
        this.updateLangs();
    };
    /**
     * Returns an array of currently available langs
     * @returns {any}
     */
    TranslateService.prototype.getLangs = function () {
        return this.langs;
    };
    /**
     * @param langs
     * Add available langs
     */
    TranslateService.prototype.addLangs = function (langs) {
        var _this = this;
        langs.forEach(function (lang) {
            if (_this.langs.indexOf(lang) === -1) {
                _this.langs.push(lang);
            }
        });
    };
    /**
     * Update the list of available langs
     */
    TranslateService.prototype.updateLangs = function () {
        this.addLangs(Object.keys(this.translations));
    };
    /**
     * Returns the parsed result of the translations
     * @param translations
     * @param key
     * @param interpolateParams
     * @returns {any}
     */
    TranslateService.prototype.getParsedResult = function (translations, key, interpolateParams) {
        var res;
        if (key instanceof Array) {
            var result = {}, observables = false;
            for (var _i = 0, key_1 = key; _i < key_1.length; _i++) {
                var k = key_1[_i];
                result[k] = this.getParsedResult(translations, k, interpolateParams);
                if (typeof result[k].subscribe === "function") {
                    observables = true;
                }
            }
            if (observables) {
                var mergedObs = void 0;
                for (var _a = 0, key_2 = key; _a < key_2.length; _a++) {
                    var k = key_2[_a];
                    var obs = typeof result[k].subscribe === "function" ? result[k] : Observable_1.Observable.of(result[k]);
                    if (typeof mergedObs === "undefined") {
                        mergedObs = obs;
                    }
                    else {
                        mergedObs = mergedObs.merge(obs);
                    }
                }
                return mergedObs.toArray().map(function (arr) {
                    var obj = {};
                    arr.forEach(function (value, index) {
                        obj[key[index]] = value;
                    });
                    return obj;
                });
            }
            return result;
        }
        if (translations) {
            res = this.parser.interpolate(this.parser.getValue(translations, key), interpolateParams);
        }
        if (typeof res === "undefined" && this.defaultLang && this.defaultLang !== this.currentLang) {
            res = this.parser.interpolate(this.parser.getValue(this.translations[this.defaultLang], key), interpolateParams);
        }
        if (!res && this.missingTranslationHandler) {
            res = this.missingTranslationHandler.handle(key);
        }
        return res || key;
    };
    /**
     * Gets the translated value of a key (or an array of keys)
     * @param key
     * @param interpolateParams
     * @returns {any} the translated key, or an object of translated keys
     */
    TranslateService.prototype.get = function (key, interpolateParams) {
        var _this = this;
        if (!key) {
            throw new Error("Parameter \"key\" required");
        }
        // check if we are loading a new translation to use
        if (this.pending) {
            return Observable_1.Observable.create(function (observer) {
                var onComplete = function (res) {
                    observer.next(res);
                    observer.complete();
                };
                _this.pending.subscribe(function (res) {
                    res = _this.getParsedResult(res, key, interpolateParams);
                    if (typeof res.subscribe === "function") {
                        res.subscribe(onComplete);
                    }
                    else {
                        onComplete(res);
                    }
                });
            });
        }
        else {
            var res = this.getParsedResult(this.translations[this.currentLang], key, interpolateParams);
            if (typeof res.subscribe === "function") {
                return res;
            }
            else {
                return Observable_1.Observable.of(res);
            }
        }
    };
    /**
     * Returns a translation instantly from the internal state of loaded translation.
     * All rules regarding the current language, the preferred language of even fallback languages will be used except any promise handling.
     * @param key
     * @param interpolateParams
     * @returns {string}
     */
    TranslateService.prototype.instant = function (key, interpolateParams) {
        if (!key) {
            throw new Error("Parameter \"key\" required");
        }
        var res = this.getParsedResult(this.translations[this.currentLang], key, interpolateParams);
        if (typeof res.subscribe !== "undefined") {
            if (key instanceof Array) {
                var obj_1 = {};
                key.forEach(function (value, index) {
                    obj_1[key[index]] = key[index];
                });
                return obj_1;
            }
            return key;
        }
        else {
            return res;
        }
    };
    /**
     * Sets the translated value of a key
     * @param key
     * @param value
     * @param lang
     */
    TranslateService.prototype.set = function (key, value, lang) {
        if (lang === void 0) { lang = this.currentLang; }
        this.translations[lang][key] = value;
        this.updateLangs();
        this.onTranslationChange.emit({ translations: (_a = {}, _a[key] = value, _a), lang: lang });
        var _a;
    };
    /**
     * Changes the current lang
     * @param lang
     */
    TranslateService.prototype.changeLang = function (lang) {
        this.currentLang = lang;
        this.onLangChange.emit({ lang: lang, translations: this.translations[lang] });
    };
    /**
     * Allows to reload the lang file from the file
     * @param lang
     * @returns {Observable<any>}
     */
    TranslateService.prototype.reloadLang = function (lang) {
        this.resetLang(lang);
        return this.getTranslation(lang);
    };
    /**
     * Deletes inner translation
     * @param lang
     */
    TranslateService.prototype.resetLang = function (lang) {
        this.translations[lang] = undefined;
    };
    TranslateService.prototype.getBrowserLang = function () {
        if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
            return undefined;
        }
        var browserLang;
        if (typeof window.navigator['languages'] !== 'undefined' && window.navigator['languages'].length > 0) {
            browserLang = window.navigator['languages'][0].indexOf('-') !== -1 || window.navigator['languages'].length < 2 ? window.navigator['languages'][0] : window.navigator['languages'][1];
        }
        else {
            browserLang = window.navigator['language'] || window.navigator['browserLanguage'];
        }
        return browserLang && browserLang.length ? browserLang.split('-')[0] : undefined; // use navigator lang if available
    };
    TranslateService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Optional()), 
        __metadata('design:paramtypes', [TranslateLoader, MissingTranslationHandler])
    ], TranslateService);
    return TranslateService;
}());
exports.TranslateService = TranslateService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0cmFuc2xhdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEscUJBQWlELGVBQWUsQ0FBQyxDQUFBO0FBRWpFLDJCQUF5QixpQkFBaUIsQ0FBQyxDQUFBO0FBRTNDLFFBQU8sd0JBQXdCLENBQUMsQ0FBQTtBQUNoQyxRQUFPLHlCQUF5QixDQUFDLENBQUE7QUFDakMsUUFBTyx1QkFBdUIsQ0FBQyxDQUFBO0FBQy9CLFFBQU8seUJBQXlCLENBQUMsQ0FBQTtBQUNqQyxRQUFPLDJCQUEyQixDQUFDLENBQUE7QUFFbkMsaUNBQXFCLG9CQUFvQixDQUFDLENBQUE7QUFpQjFDO0lBQUE7SUFVQSxDQUFDO0lBQUQsZ0NBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQztBQVZxQixpQ0FBeUIsNEJBVTlDLENBQUE7QUFFRDtJQUFBO0lBRUEsQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGcUIsdUJBQWUsa0JBRXBDLENBQUE7QUFFRDtJQUNJLCtCQUFvQixJQUFVLEVBQVUsTUFBdUIsRUFBVSxNQUF3QjtRQUFqRSxzQkFBK0IsR0FBL0IsZUFBK0I7UUFBRSxzQkFBZ0MsR0FBaEMsZ0JBQWdDO1FBQTdFLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFpQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBQ2pHLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksOENBQWMsR0FBckIsVUFBc0IsSUFBWTtRQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksSUFBSSxDQUFDLE1BQU0sU0FBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQVEsQ0FBQzthQUN2RCxHQUFHLENBQUMsVUFBQyxHQUFhLElBQUssT0FBQSxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQVYsQ0FBVSxDQUFD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U0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFDRCxJQUFJLFdBQWdCLENBQUM7UUFDckIsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25HLFdBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pMLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLFdBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN0RixDQUFDO1FBRUQsTUFBTSxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsa0NBQWtDO0lBQ3hILENBQUM7SUFyVEw7UUFBQyxpQkFBVSxFQUFFO21CQXFDMkMsZUFBUSxFQUFFOzt3QkFyQ3JEO0lBc1RiLHVCQUFDO0FBQUQsQ0FBQyxBQXJURCxJQXFUQztBQXJUWSx3QkFBZ0IsbUJBcVQ1QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIsIE9wdGlvbmFsfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtIdHRwLCBSZXNwb25zZX0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHtPYnNlcnZlcn0gZnJvbSBcInJ4anMvT2JzZXJ2ZXJcIjtcbmltcG9ydCBcInJ4anMvYWRkL29ic2VydmFibGUvb2ZcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL3NoYXJlXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21lcmdlXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci90b0FycmF5XCI7XG5cbmltcG9ydCB7UGFyc2VyfSBmcm9tIFwiLi90cmFuc2xhdGUucGFyc2VyXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhbnNsYXRpb25DaGFuZ2VFdmVudCB7XG4gICAgdHJhbnNsYXRpb25zOiBhbnk7XG4gICAgbGFuZzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExhbmdDaGFuZ2VFdmVudCB7XG4gICAgbGFuZzogc3RyaW5nO1xuICAgIHRyYW5zbGF0aW9uczogYW55O1xufVxuXG5kZWNsYXJlIGludGVyZmFjZSBXaW5kb3cge1xuICAgIG5hdmlnYXRvcjogYW55O1xufVxuZGVjbGFyZSB2YXIgd2luZG93OiBXaW5kb3c7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyIHtcbiAgICAvKipcbiAgICAgKiBBIGZ1bmN0aW9uIHRoYXQgaGFuZGxlcyBtaXNzaW5nIHRyYW5zbGF0aW9ucy5cbiAgICAgKiBAcGFyYW0ga2V5IHRoZSBtaXNzaW5nIGtleVxuICAgICAqIEByZXR1cm5zIHthbnl9IGEgdmFsdWUgb3IgYW4gb2JzZXJ2YWJsZVxuICAgICAqIElmIGl0IHJldHVybnMgYSB2YWx1ZSwgdGhlbiB0aGlzIHZhbHVlIGlzIHVzZWQuXG4gICAgICogSWYgaXQgcmV0dXJuIGFuIG9ic2VydmFibGUsIHRoZSB2YWx1ZSByZXR1cm5lZCBieSB0aGlzIG9ic2VydmFibGUgd2lsbCBiZSB1c2VkIChleGNlcHQgaWYgdGhlIG1ldGhvZCB3YXMgXCJpbnN0YW50XCIpLlxuICAgICAqIElmIGl0IGRvZXNuJ3QgcmV0dXJuIHRoZW4gdGhlIGtleSB3aWxsIGJlIHVzZWQgYXMgYSB2YWx1ZVxuICAgICAqL1xuICAgIGFic3RyYWN0IGhhbmRsZShrZXk6IHN0cmluZyk6IGFueTtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFRyYW5zbGF0ZUxvYWRlciB7XG4gICAgYWJzdHJhY3QgZ2V0VHJhbnNsYXRpb24obGFuZzogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+O1xufVxuXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRlU3RhdGljTG9hZGVyIGltcGxlbWVudHMgVHJhbnNsYXRlTG9hZGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAsIHByaXZhdGUgcHJlZml4OiBzdHJpbmcgPSBcImkxOG5cIiwgcHJpdmF0ZSBzdWZmaXg6IHN0cmluZyA9IFwiLmpzb25cIikge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHRyYW5zbGF0aW9ucyBmcm9tIHRoZSBzZXJ2ZXJcbiAgICAgKiBAcGFyYW0gbGFuZ1xuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgcHVibGljIGdldFRyYW5zbGF0aW9uKGxhbmc6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke3RoaXMucHJlZml4fS8ke2xhbmd9JHt0aGlzLnN1ZmZpeH1gKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4gcmVzLmpzb24oKSk7XG4gICAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRlU2VydmljZSB7XG4gICAgLyoqXG4gICAgICogVGhlIGxhbmcgY3VycmVudGx5IHVzZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgY3VycmVudExhbmc6IHN0cmluZyA9IHRoaXMuZGVmYXVsdExhbmc7XG5cbiAgICAvKipcbiAgICAgKiBBbiBFdmVudEVtaXR0ZXIgdG8gbGlzdGVuIHRvIHRyYW5zbGF0aW9uIGNoYW5nZSBldmVudHNcbiAgICAgKiBvblRyYW5zbGF0aW9uQ2hhbmdlLnN1YnNjcmliZSgocGFyYW1zOiBUcmFuc2xhdGlvbkNoYW5nZUV2ZW50KSA9PiB7XG4gICAgICogICAgIC8vIGRvIHNvbWV0aGluZ1xuICAgICAqIH0pO1xuICAgICAqIEB0eXBlIHtuZy5FdmVudEVtaXR0ZXI8VHJhbnNsYXRpb25DaGFuZ2VFdmVudD59XG4gICAgICovXG4gICAgcHVibGljIG9uVHJhbnNsYXRpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxUcmFuc2xhdGlvbkNoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VHJhbnNsYXRpb25DaGFuZ2VFdmVudD4oKTtcblxuICAgIC8qKlxuICAgICAqIEFuIEV2ZW50RW1pdHRlciB0byBsaXN0ZW4gdG8gbGFuZyBjaGFuZ2UgZXZlbnRzXG4gICAgICogb25MYW5nQ2hhbmdlLnN1YnNjcmliZSgocGFyYW1zOiBMYW5nQ2hhbmdlRXZlbnQpID0+IHtcbiAgICAgKiAgICAgLy8gZG8gc29tZXRoaW5nXG4gICAgICogfSk7XG4gICAgICogQHR5cGUge25nLkV2ZW50RW1pdHRlcjxMYW5nQ2hhbmdlRXZlbnQ+fVxuICAgICAqL1xuICAgIHB1YmxpYyBvbkxhbmdDaGFuZ2U6IEV2ZW50RW1pdHRlcjxMYW5nQ2hhbmdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxMYW5nQ2hhbmdlRXZlbnQ+KCk7XG5cbiAgICBwcml2YXRlIHBlbmRpbmc6IGFueTtcbiAgICBwcml2YXRlIHRyYW5zbGF0aW9uczogYW55ID0ge307XG4gICAgcHJpdmF0ZSBkZWZhdWx0TGFuZzogc3RyaW5nO1xuICAgIHByaXZhdGUgbGFuZ3M6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICBwcml2YXRlIHBhcnNlcjogUGFyc2VyID0gbmV3IFBhcnNlcigpO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaHR0cCBUaGUgQW5ndWxhciAyIGh0dHAgcHJvdmlkZXJcbiAgICAgKiBAcGFyYW0gY3VycmVudExvYWRlciBBbiBpbnN0YW5jZSBvZiB0aGUgbG9hZGVyIGN1cnJlbnRseSB1c2VkXG4gICAgICogQHBhcmFtIG1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIgQSBoYW5kbGVyIGZvciBtaXNzaW5nIHRyYW5zbGF0aW9ucy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY3VycmVudExvYWRlcjogVHJhbnNsYXRlTG9hZGVyLCBAT3B0aW9uYWwoKSBwcml2YXRlIG1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXI6IE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBkZWZhdWx0IGxhbmd1YWdlIHRvIHVzZSBhcyBhIGZhbGxiYWNrXG4gICAgICogQHBhcmFtIGxhbmdcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0RGVmYXVsdExhbmcobGFuZzogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGVmYXVsdExhbmcgPSBsYW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoYW5nZXMgdGhlIGxhbmcgY3VycmVudGx5IHVzZWRcbiAgICAgKiBAcGFyYW0gbGFuZ1xuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPCo+fVxuICAgICAqL1xuICAgIHB1YmxpYyB1c2UobGFuZzogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgbGV0IHBlbmRpbmc6IE9ic2VydmFibGU8YW55PjtcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhpcyBsYW5ndWFnZSBpcyBhdmFpbGFibGVcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgLy8gbm90IGF2YWlsYWJsZSwgYXNrIGZvciBpdFxuICAgICAgICAgICAgcGVuZGluZyA9IHRoaXMuZ2V0VHJhbnNsYXRpb24obGFuZyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHBlbmRpbmcgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIC8vIG9uIGluaXQgc2V0IHRoZSBjdXJyZW50TGFuZyBpbW1lZGlhdGVseVxuICAgICAgICAgICAgaWYgKCF0aGlzLmN1cnJlbnRMYW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TGFuZyA9IGxhbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwZW5kaW5nLnN1YnNjcmliZSgocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUxhbmcobGFuZyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHBlbmRpbmc7XG4gICAgICAgIH0gZWxzZSB7IC8vIHdlIGhhdmUgdGhpcyBsYW5ndWFnZSwgcmV0dXJuIGFuIE9ic2VydmFibGVcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlTGFuZyhsYW5nKTtcblxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YodGhpcy50cmFuc2xhdGlvbnNbbGFuZ10pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhbiBvYmplY3Qgb2YgdHJhbnNsYXRpb25zIGZvciBhIGdpdmVuIGxhbmd1YWdlIHdpdGggdGhlIGN1cnJlbnQgbG9hZGVyXG4gICAgICogQHBhcmFtIGxhbmdcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTwqPn1cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0VHJhbnNsYXRpb24obGFuZzogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gdGhpcy5jdXJyZW50TG9hZGVyLmdldFRyYW5zbGF0aW9uKGxhbmcpLnNoYXJlKCk7XG4gICAgICAgIHRoaXMucGVuZGluZy5zdWJzY3JpYmUoKHJlczogT2JqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXSA9IHJlcztcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTGFuZ3MoKTtcbiAgICAgICAgfSwgKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGVuZGluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucGVuZGluZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYW51YWxseSBzZXRzIGFuIG9iamVjdCBvZiB0cmFuc2xhdGlvbnMgZm9yIGEgZ2l2ZW4gbGFuZ3VhZ2VcbiAgICAgKiBAcGFyYW0gbGFuZ1xuICAgICAqIEBwYXJhbSB0cmFuc2xhdGlvbnNcbiAgICAgKiBAcGFyYW0gc2hvdWxkTWVyZ2VcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0VHJhbnNsYXRpb24obGFuZzogc3RyaW5nLCB0cmFuc2xhdGlvbnM6IE9iamVjdCwgc2hvdWxkTWVyZ2U6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgICAgICBpZiAoc2hvdWxkTWVyZ2UgJiYgdGhpcy50cmFuc2xhdGlvbnNbbGFuZ10pIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy50cmFuc2xhdGlvbnNbbGFuZ10sIHRyYW5zbGF0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLm9uVHJhbnNsYXRpb25DaGFuZ2UuZW1pdCh7dHJhbnNsYXRpb25zOiB0cmFuc2xhdGlvbnMsIGxhbmc6IGxhbmd9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRpb25zW2xhbmddID0gdHJhbnNsYXRpb25zO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlTGFuZ3MoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIGN1cnJlbnRseSBhdmFpbGFibGUgbGFuZ3NcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRMYW5ncygpOiBBcnJheTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGFuZ3M7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGxhbmdzXG4gICAgICogQWRkIGF2YWlsYWJsZSBsYW5nc1xuICAgICAqL1xuICAgIHB1YmxpYyBhZGRMYW5ncyhsYW5nczogQXJyYXk8c3RyaW5nPik6IHZvaWQge1xuICAgICAgICBsYW5ncy5mb3JFYWNoKChsYW5nOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGlmKHRoaXMubGFuZ3MuaW5kZXhPZihsYW5nKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxhbmdzLnB1c2gobGFuZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgbGlzdCBvZiBhdmFpbGFibGUgbGFuZ3NcbiAgICAgKi9cbiAgICBwcml2YXRlIHVwZGF0ZUxhbmdzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFkZExhbmdzKE9iamVjdC5rZXlzKHRoaXMudHJhbnNsYXRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcGFyc2VkIHJlc3VsdCBvZiB0aGUgdHJhbnNsYXRpb25zXG4gICAgICogQHBhcmFtIHRyYW5zbGF0aW9uc1xuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKiBAcGFyYW0gaW50ZXJwb2xhdGVQYXJhbXNcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0UGFyc2VkUmVzdWx0KHRyYW5zbGF0aW9uczogYW55LCBrZXk6IGFueSwgaW50ZXJwb2xhdGVQYXJhbXM/OiBPYmplY3QpOiBhbnkge1xuICAgICAgICBsZXQgcmVzOiBzdHJpbmd8T2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gICAgICAgIGlmIChrZXkgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgbGV0IHJlc3VsdDogYW55ID0ge30sXG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAobGV0IGsgb2Yga2V5KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W2tdID0gdGhpcy5nZXRQYXJzZWRSZXN1bHQodHJhbnNsYXRpb25zLCBrLCBpbnRlcnBvbGF0ZVBhcmFtcyk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXN1bHRba10uc3Vic2NyaWJlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvYnNlcnZhYmxlcykge1xuICAgICAgICAgICAgICAgIGxldCBtZXJnZWRPYnM6IGFueTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrIG9mIGtleSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgb2JzID0gdHlwZW9mIHJlc3VsdFtrXS5zdWJzY3JpYmUgPT09IFwiZnVuY3Rpb25cIiA/IHJlc3VsdFtrXSA6IE9ic2VydmFibGUub2YocmVzdWx0W2tdKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXJnZWRPYnMgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lcmdlZE9icyA9IG9icztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lcmdlZE9icyA9IG1lcmdlZE9icy5tZXJnZShvYnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBtZXJnZWRPYnMudG9BcnJheSgpLm1hcCgoYXJyOiBBcnJheTxzdHJpbmc+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBvYmo6IGFueSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBhcnIuZm9yRWFjaCgodmFsdWU6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqW2tleVtpbmRleF1dID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0cmFuc2xhdGlvbnMpIHtcbiAgICAgICAgICAgIHJlcyA9IHRoaXMucGFyc2VyLmludGVycG9sYXRlKHRoaXMucGFyc2VyLmdldFZhbHVlKHRyYW5zbGF0aW9ucywga2V5KSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiByZXMgPT09IFwidW5kZWZpbmVkXCIgJiYgdGhpcy5kZWZhdWx0TGFuZyAmJiB0aGlzLmRlZmF1bHRMYW5nICE9PSB0aGlzLmN1cnJlbnRMYW5nKSB7XG4gICAgICAgICAgICByZXMgPSB0aGlzLnBhcnNlci5pbnRlcnBvbGF0ZSh0aGlzLnBhcnNlci5nZXRWYWx1ZSh0aGlzLnRyYW5zbGF0aW9uc1t0aGlzLmRlZmF1bHRMYW5nXSwga2V5KSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFyZXMgJiYgdGhpcy5taXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyKSB7XG4gICAgICAgICAgICByZXMgPSB0aGlzLm1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIuaGFuZGxlKGtleSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzIHx8IGtleTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB0cmFuc2xhdGVkIHZhbHVlIG9mIGEga2V5IChvciBhbiBhcnJheSBvZiBrZXlzKVxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKiBAcGFyYW0gaW50ZXJwb2xhdGVQYXJhbXNcbiAgICAgKiBAcmV0dXJucyB7YW55fSB0aGUgdHJhbnNsYXRlZCBrZXksIG9yIGFuIG9iamVjdCBvZiB0cmFuc2xhdGVkIGtleXNcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0KGtleTogc3RyaW5nfEFycmF5PHN0cmluZz4sIGludGVycG9sYXRlUGFyYW1zPzogT2JqZWN0KTogT2JzZXJ2YWJsZTxzdHJpbmd8YW55PiB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBcImtleVwiIHJlcXVpcmVkYCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2hlY2sgaWYgd2UgYXJlIGxvYWRpbmcgYSBuZXcgdHJhbnNsYXRpb24gdG8gdXNlXG4gICAgICAgIGlmICh0aGlzLnBlbmRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPHN0cmluZz4pID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgb25Db21wbGV0ZSA9IChyZXM6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlcyk7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnBlbmRpbmcuc3Vic2NyaWJlKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMgPSB0aGlzLmdldFBhcnNlZFJlc3VsdChyZXMsIGtleSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlcy5zdWJzY3JpYmUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnN1YnNjcmliZShvbkNvbXBsZXRlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGUocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgcmVzID0gdGhpcy5nZXRQYXJzZWRSZXN1bHQodGhpcy50cmFuc2xhdGlvbnNbdGhpcy5jdXJyZW50TGFuZ10sIGtleSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiByZXMuc3Vic2NyaWJlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZihyZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHRyYW5zbGF0aW9uIGluc3RhbnRseSBmcm9tIHRoZSBpbnRlcm5hbCBzdGF0ZSBvZiBsb2FkZWQgdHJhbnNsYXRpb24uXG4gICAgICogQWxsIHJ1bGVzIHJlZ2FyZGluZyB0aGUgY3VycmVudCBsYW5ndWFnZSwgdGhlIHByZWZlcnJlZCBsYW5ndWFnZSBvZiBldmVuIGZhbGxiYWNrIGxhbmd1YWdlcyB3aWxsIGJlIHVzZWQgZXhjZXB0IGFueSBwcm9taXNlIGhhbmRsaW5nLlxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKiBAcGFyYW0gaW50ZXJwb2xhdGVQYXJhbXNcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHB1YmxpYyBpbnN0YW50KGtleTogc3RyaW5nfEFycmF5PHN0cmluZz4sIGludGVycG9sYXRlUGFyYW1zPzogT2JqZWN0KTogc3RyaW5nfGFueSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBcImtleVwiIHJlcXVpcmVkYCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzID0gdGhpcy5nZXRQYXJzZWRSZXN1bHQodGhpcy50cmFuc2xhdGlvbnNbdGhpcy5jdXJyZW50TGFuZ10sIGtleSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICAgICAgICBpZiAodHlwZW9mIHJlcy5zdWJzY3JpYmUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIGlmIChrZXkgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIGxldCBvYmo6IGFueSA9IHt9O1xuICAgICAgICAgICAgICAgIGtleS5mb3JFYWNoKCh2YWx1ZTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9ialtrZXlbaW5kZXhdXSA9IGtleVtpbmRleF07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgdHJhbnNsYXRlZCB2YWx1ZSBvZiBhIGtleVxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcGFyYW0gbGFuZ1xuICAgICAqL1xuICAgIHB1YmxpYyBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGxhbmc6IHN0cmluZyA9IHRoaXMuY3VycmVudExhbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvbnNbbGFuZ11ba2V5XSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUxhbmdzKCk7XG4gICAgICAgIHRoaXMub25UcmFuc2xhdGlvbkNoYW5nZS5lbWl0KHt0cmFuc2xhdGlvbnM6IHtba2V5XTogdmFsdWV9LCBsYW5nOiBsYW5nfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hhbmdlcyB0aGUgY3VycmVudCBsYW5nXG4gICAgICogQHBhcmFtIGxhbmdcbiAgICAgKi9cbiAgICBwcml2YXRlIGNoYW5nZUxhbmcobGFuZzogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY3VycmVudExhbmcgPSBsYW5nO1xuICAgICAgICB0aGlzLm9uTGFuZ0NoYW5nZS5lbWl0KHtsYW5nOiBsYW5nLCB0cmFuc2xhdGlvbnM6IHRoaXMudHJhbnNsYXRpb25zW2xhbmddfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxsb3dzIHRvIHJlbG9hZCB0aGUgbGFuZyBmaWxlIGZyb20gdGhlIGZpbGVcbiAgICAgKiBAcGFyYW0gbGFuZ1xuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAgICovXG4gICAgcHVibGljIHJlbG9hZExhbmcobGFuZzogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdGhpcy5yZXNldExhbmcobGFuZyk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFRyYW5zbGF0aW9uKGxhbmcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgaW5uZXIgdHJhbnNsYXRpb25cbiAgICAgKiBAcGFyYW0gbGFuZ1xuICAgICAqL1xuICAgIHB1YmxpYyByZXNldExhbmcobGFuZzogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRpb25zW2xhbmddID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRCcm93c2VyTGFuZygpOiBzdHJpbmcge1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIHdpbmRvdy5uYXZpZ2F0b3IgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGxldCBicm93c2VyTGFuZzogYW55O1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdy5uYXZpZ2F0b3JbJ2xhbmd1YWdlcyddICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cubmF2aWdhdG9yWydsYW5ndWFnZXMnXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBicm93c2VyTGFuZyA9IHdpbmRvdy5uYXZpZ2F0b3JbJ2xhbmd1YWdlcyddWzBdLmluZGV4T2YoJy0nKSAhPT0gLTEgfHwgd2luZG93Lm5hdmlnYXRvclsnbGFuZ3VhZ2VzJ10ubGVuZ3RoIDwgMiA/IHdpbmRvdy5uYXZpZ2F0b3JbJ2xhbmd1YWdlcyddWzBdIDogd2luZG93Lm5hdmlnYXRvclsnbGFuZ3VhZ2VzJ11bMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBicm93c2VyTGFuZyA9IHdpbmRvdy5uYXZpZ2F0b3JbJ2xhbmd1YWdlJ10gfHwgd2luZG93Lm5hdmlnYXRvclsnYnJvd3Nlckxhbmd1YWdlJ107XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYnJvd3NlckxhbmcgJiYgYnJvd3NlckxhbmcubGVuZ3RoID8gYnJvd3Nlckxhbmcuc3BsaXQoJy0nKVswXSA6IHVuZGVmaW5lZDsgLy8gdXNlIG5hdmlnYXRvciBsYW5nIGlmIGF2YWlsYWJsZVxuICAgIH1cbn1cbiJdfQ==