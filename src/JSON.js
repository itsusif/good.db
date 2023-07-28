"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _DataBase_fileName, _DataBase_nestedEnabled, _DataBase_separator;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Error_1 = __importDefault(require("./Error"));
class DataBase {
    constructor(fileName = 'joe.json', nestedEnabled = true, separator = '..') {
        _DataBase_fileName.set(this, void 0);
        _DataBase_nestedEnabled.set(this, void 0);
        _DataBase_separator.set(this, void 0);
        __classPrivateFieldSet(this, _DataBase_fileName, fileName, "f");
        __classPrivateFieldSet(this, _DataBase_nestedEnabled, nestedEnabled, "f");
        __classPrivateFieldSet(this, _DataBase_separator, separator, "f");
        const lastIndex = __classPrivateFieldGet(this, _DataBase_fileName, "f").lastIndexOf('/');
        const databaseDir = __classPrivateFieldGet(this, _DataBase_fileName, "f").substring(0, lastIndex);
        if (!fs_1.default.existsSync(databaseDir) && databaseDir)
            fs_1.default.mkdirSync(databaseDir, { recursive: true });
        if (!fs_1.default.existsSync(__classPrivateFieldGet(this, _DataBase_fileName, "f")))
            fs_1.default.writeFileSync(__classPrivateFieldGet(this, _DataBase_fileName, "f"), "{}");
    }
    set(key, value, nestedEnabled = __classPrivateFieldGet(this, _DataBase_nestedEnabled, "f"), separator = __classPrivateFieldGet(this, _DataBase_separator, "f")) {
        if (!key)
            throw new Error_1.default("The key is not defined!");
        if (typeof key !== 'string')
            throw new Error_1.default("The key must be a string!");
        const fileContent = fs_1.default.readFileSync(__classPrivateFieldGet(this, _DataBase_fileName, "f"), "utf8");
        const file = fileContent ? JSON.parse(fileContent) : {};
        if (nestedEnabled) {
            const keyParts = key.split(separator);
            let currentObject = file;
            for (let i = 0; i < keyParts.length - 1; i++) {
                const part = keyParts[i];
                if (!currentObject[part])
                    currentObject[part] = {};
                else if (typeof currentObject[part] !== 'object')
                    throw new Error_1.default(`Cannot create property '${part}' on ${typeof currentObject[part]}`);
                currentObject = currentObject[part];
            }
            const lastPart = keyParts[keyParts.length - 1];
            currentObject[lastPart] = value;
        }
        else {
            file[key] = value;
        }
        fs_1.default.writeFileSync(__classPrivateFieldGet(this, _DataBase_fileName, "f"), JSON.stringify(file, null, 2));
    }
    get(key, nestedEnabled = __classPrivateFieldGet(this, _DataBase_nestedEnabled, "f"), separator = __classPrivateFieldGet(this, _DataBase_separator, "f")) {
        if (!key)
            throw new Error_1.default("The key is not defined!");
        if (typeof key !== 'string')
            throw new Error_1.default("The key must be a string!");
        const fileContent = fs_1.default.readFileSync(__classPrivateFieldGet(this, _DataBase_fileName, "f"), "utf8");
        const file = fileContent ? JSON.parse(fileContent) : {};
        if (nestedEnabled) {
            const keyParts = key.split(separator);
            let currentValue = file;
            for (const part of keyParts) {
                if (!currentValue.hasOwnProperty(part))
                    return undefined;
                currentValue = currentValue[part];
            }
            return currentValue;
        }
        else {
            return file[key];
        }
    }
    fetch(key, nestedEnabled = __classPrivateFieldGet(this, _DataBase_nestedEnabled, "f"), separator = __classPrivateFieldGet(this, _DataBase_separator, "f")) {
        if (!key)
            throw new Error_1.default("The key is not defined!");
        if (typeof key !== 'string')
            throw new Error_1.default("The key must be a string!");
        const fileContent = fs_1.default.readFileSync(__classPrivateFieldGet(this, _DataBase_fileName, "f"), "utf8");
        const file = fileContent ? JSON.parse(fileContent) : {};
        if (nestedEnabled) {
            const keyParts = key.split(separator);
            let currentValue = file;
            for (const part of keyParts) {
                if (!currentValue.hasOwnProperty(part))
                    return undefined;
                currentValue = currentValue[part];
            }
            return currentValue;
        }
        else {
            return file[key];
        }
    }
    delete(key, nestedEnabled = __classPrivateFieldGet(this, _DataBase_nestedEnabled, "f"), separator = __classPrivateFieldGet(this, _DataBase_separator, "f")) {
        if (!key)
            throw new Error_1.default("The key is not defined!");
        if (typeof key !== 'string')
            throw new Error_1.default("The key must be a string!");
        const fileContent = fs_1.default.readFileSync(__classPrivateFieldGet(this, _DataBase_fileName, "f"), "utf8");
        const file = fileContent ? JSON.parse(fileContent) : {};
        if (nestedEnabled) {
            const keyParts = key.split(separator);
            let currentValue = file;
            for (let i = 0; i < keyParts.length - 1; i++) {
                const part = keyParts[i];
                if (!currentValue.hasOwnProperty(part))
                    return false;
                currentValue = currentValue[part];
            }
            const lastPart = keyParts[keyParts.length - 1];
            if (currentValue.hasOwnProperty(lastPart)) {
                delete currentValue[lastPart];
                fs_1.default.writeFileSync(__classPrivateFieldGet(this, _DataBase_fileName, "f"), JSON.stringify(file, null, 2));
                return true;
            }
            else
                return false;
        }
        else {
            if (file.hasOwnProperty(key)) {
                delete file[key];
                fs_1.default.writeFileSync(__classPrivateFieldGet(this, _DataBase_fileName, "f"), JSON.stringify(file, null, 2));
                return true;
            }
            else
                return false;
        }
    }
    has(key, nestedEnabled = __classPrivateFieldGet(this, _DataBase_nestedEnabled, "f"), separator = __classPrivateFieldGet(this, _DataBase_separator, "f")) {
        if (!key)
            throw new Error_1.default("The key is not defined!");
        if (typeof key !== 'string')
            throw new Error_1.default("The key must be a string!");
        const fileContent = fs_1.default.readFileSync(__classPrivateFieldGet(this, _DataBase_fileName, "f"), "utf8");
        const file = fileContent ? JSON.parse(fileContent) : {};
        if (nestedEnabled) {
            const keyParts = key.split(separator);
            let currentValue = file;
            for (const part of keyParts) {
                if (!currentValue.hasOwnProperty(part))
                    return false;
                currentValue = currentValue[part];
            }
            return true;
        }
        else
            return file.hasOwnProperty(key);
    }
    add(key, value, nestedEnabled = __classPrivateFieldGet(this, _DataBase_nestedEnabled, "f"), separator = __classPrivateFieldGet(this, _DataBase_separator, "f")) {
        if (!key)
            throw new Error_1.default("The key is not defined!");
        if (typeof key !== 'string')
            throw new Error_1.default("The key must be a string!");
        if (typeof value !== 'number')
            throw new Error_1.default("The value must be a number!");
        const fileContent = fs_1.default.readFileSync(__classPrivateFieldGet(this, _DataBase_fileName, "f"), "utf8");
        const file = fileContent ? JSON.parse(fileContent) : {};
        if (nestedEnabled) {
            const keyParts = key.split(separator);
            let currentObject = file;
            for (let i = 0; i < keyParts.length - 1; i++) {
                const part = keyParts[i];
                if (!currentObject.hasOwnProperty(part)) {
                    currentObject[part] = {};
                }
                else if (typeof currentObject[part] !== 'object') {
                    throw new Error_1.default(`Cannot create property '${part}' on ${typeof currentObject[part]}`);
                }
                currentObject = currentObject[part];
            }
            const lastPart = keyParts[keyParts.length - 1];
            if (!currentObject[lastPart])
                currentObject[lastPart] = +value;
            else if (typeof currentObject[lastPart] === 'number')
                currentObject[lastPart] += value;
            else
                throw new Error_1.default(`Cannot add a number to a non-numeric value at key '${key}'`);
        }
        else {
            if (!file.hasOwnProperty(key))
                file[key] = +value;
            else if (typeof file[key] !== 'number')
                throw new Error_1.default(`Cannot add a number to a non-numeric value at key '${key}'`);
            else
                file[key] += value;
        }
        fs_1.default.writeFileSync(__classPrivateFieldGet(this, _DataBase_fileName, "f"), JSON.stringify(file, null, 2));
    }
    subtract(key, value, nestedEnabled = __classPrivateFieldGet(this, _DataBase_nestedEnabled, "f"), separator = __classPrivateFieldGet(this, _DataBase_separator, "f")) {
        if (!key)
            throw new Error_1.default("The key is not defined!");
        if (typeof key !== 'string')
            throw new Error_1.default("The key must be a string!");
        if (typeof value !== 'number')
            throw new Error_1.default("The value must be a number!");
        const fileContent = fs_1.default.readFileSync(__classPrivateFieldGet(this, _DataBase_fileName, "f"), "utf8");
        const file = fileContent ? JSON.parse(fileContent) : {};
        if (nestedEnabled) {
            const keyParts = key.split(separator);
            let currentObject = file;
            for (let i = 0; i < keyParts.length - 1; i++) {
                const part = keyParts[i];
                if (!currentObject.hasOwnProperty(part)) {
                    currentObject[part] = {};
                }
                else if (typeof currentObject[part] !== 'object') {
                    throw new Error_1.default(`Cannot create property '${part}' on ${typeof currentObject[part]}`);
                }
                currentObject = currentObject[part];
            }
            const lastPart = keyParts[keyParts.length - 1];
            if (!currentObject[lastPart])
                currentObject[lastPart] = -value;
            else if (typeof currentObject[lastPart] === 'number')
                currentObject[lastPart] -= value;
            else
                throw new Error_1.default(`Cannot add a number to a non-numeric value at key '${key}'`);
        }
        else {
            if (!file.hasOwnProperty(key))
                file[key] = -value;
            else if (typeof file[key] !== 'number')
                throw new Error_1.default(`Cannot add a number to a non-numeric value at key '${key}'`);
            else
                file[key] -= value;
        }
        fs_1.default.writeFileSync(__classPrivateFieldGet(this, _DataBase_fileName, "f"), JSON.stringify(file, null, 2));
    }
    push(key, value, nestedEnabled = __classPrivateFieldGet(this, _DataBase_nestedEnabled, "f"), separator = __classPrivateFieldGet(this, _DataBase_separator, "f")) {
        if (!key)
            throw new Error_1.default("The key is not defined!");
        if (typeof key !== 'string')
            throw new Error_1.default("The key must be a string!");
        const fileContent = fs_1.default.readFileSync(__classPrivateFieldGet(this, _DataBase_fileName, "f"), "utf8");
        const file = fileContent ? JSON.parse(fileContent) : {};
        if (nestedEnabled) {
            const keyParts = key.split(separator);
            let currentObject = file;
            for (let i = 0; i < keyParts.length - 1; i++) {
                const part = keyParts[i];
                if (!currentObject.hasOwnProperty(part)) {
                    currentObject[part] = {};
                }
                else if (typeof currentObject[part] !== 'object') {
                    throw new Error_1.default(`Cannot create property '${part}' on ${typeof currentObject[part]}`);
                }
                currentObject = currentObject[part];
            }
            const lastPart = keyParts[keyParts.length - 1];
            if (!currentObject || typeof currentObject !== 'object') {
                throw new Error_1.default(`Cannot push to a non-array value at key '${key}'`);
            }
            if (!currentObject[lastPart]) {
                currentObject[lastPart] = [];
            }
            else if (!Array.isArray(currentObject[lastPart])) {
                throw new Error_1.default(`Cannot push to a non-array value at key '${key}'`);
            }
            currentObject[lastPart].push(value);
        }
        else {
            if (!file.hasOwnProperty(key)) {
                file[key] = [value];
            }
            else {
                if (!Array.isArray(file[key])) {
                    throw new Error_1.default(`Cannot push to a non-array value at key '${key}'`);
                }
                file[key].push(value);
            }
        }
        fs_1.default.writeFileSync(__classPrivateFieldGet(this, _DataBase_fileName, "f"), JSON.stringify(file, null, 2));
    }
    pull(key, callbackOrValue, pullAll = false, nestedEnabled = __classPrivateFieldGet(this, _DataBase_nestedEnabled, "f"), separator = __classPrivateFieldGet(this, _DataBase_separator, "f")) {
        if (!key)
            throw new Error_1.default("The key is not defined!");
        if (typeof key !== 'string')
            throw new Error_1.default("The key must be a string!");
        const fileContent = fs_1.default.readFileSync(__classPrivateFieldGet(this, _DataBase_fileName, "f"), "utf8");
        const file = fileContent ? JSON.parse(fileContent) : {};
        const traverseAndPull = (currentObject, keyParts, depth) => {
            const part = keyParts[depth];
            if (depth === keyParts.length - 1) {
                if (!currentObject.hasOwnProperty(part) || !Array.isArray(currentObject[part])) {
                    throw new Error_1.default(`Cannot pull from a non-array value at key '${key}'`);
                }
                const array = currentObject[part];
                let removed = false;
                if (pullAll) {
                    const indexesToRemove = array.reduce((acc, element, index) => {
                        if (typeof callbackOrValue === 'function') {
                            const callback = callbackOrValue;
                            if (callback(element, index, array)) {
                                acc.push(index);
                            }
                        }
                        else {
                            const value = callbackOrValue;
                            if (element === value) {
                                acc.push(index);
                            }
                        }
                        return acc;
                    }, []);
                    if (indexesToRemove.length > 0) {
                        for (let i = indexesToRemove.length - 1; i >= 0; i--) {
                            array.splice(indexesToRemove[i], 1);
                        }
                        removed = true;
                    }
                }
                else {
                    const index = array.indexOf(callbackOrValue);
                    if (index !== -1) {
                        array.splice(index, 1);
                        removed = true;
                    }
                }
                if (removed) {
                    fs_1.default.writeFileSync(__classPrivateFieldGet(this, _DataBase_fileName, "f"), JSON.stringify(file, null, 2));
                }
                return removed;
            }
            else {
                if (!currentObject.hasOwnProperty(part) || typeof currentObject[part] !== 'object') {
                    throw new Error_1.default(`Cannot pull from a non-array value at key '${key}'`);
                }
                const updated = traverseAndPull(currentObject[part], keyParts, depth + 1);
                if (updated)
                    fs_1.default.writeFileSync(__classPrivateFieldGet(this, _DataBase_fileName, "f"), JSON.stringify(file, null, 2));
                return updated;
            }
        };
        if (nestedEnabled) {
            const keyParts = key.split(separator);
            return traverseAndPull(file, keyParts, 0);
        }
        else {
            if (!file.hasOwnProperty(key) || !Array.isArray(file[key])) {
                throw new Error_1.default(`Cannot pull from a non-array value at key '${key}'`);
            }
            const array = file[key];
            let removed = false;
            if (pullAll) {
                const indexesToRemove = array.reduce((acc, element, index) => {
                    if (typeof callbackOrValue === 'function') {
                        const callback = callbackOrValue;
                        if (callback(element, index, array)) {
                            acc.push(index);
                        }
                    }
                    else {
                        const value = callbackOrValue;
                        if (element === value) {
                            acc.push(index);
                        }
                    }
                    return acc;
                }, []);
                if (indexesToRemove.length > 0) {
                    for (let i = indexesToRemove.length - 1; i >= 0; i--) {
                        array.splice(indexesToRemove[i], 1);
                    }
                    removed = true;
                }
            }
            else {
                const index = array.indexOf(callbackOrValue);
                if (index !== -1) {
                    array.splice(index, 1);
                    removed = true;
                }
            }
            if (removed) {
                fs_1.default.writeFileSync(__classPrivateFieldGet(this, _DataBase_fileName, "f"), JSON.stringify(file, null, 2));
            }
            return removed;
        }
    }
    all() {
        const fileContent = fs_1.default.readFileSync(__classPrivateFieldGet(this, _DataBase_fileName, "f"), "utf8");
        const file = fileContent ? JSON.parse(fileContent) : {};
        const keys = Object.keys(file);
        const result = [];
        for (const key of keys) {
            result.push({ ID: key, data: file[key] });
        }
        return result;
    }
    reset() {
        return fs_1.default.writeFileSync(__classPrivateFieldGet(this, _DataBase_fileName, "f"), JSON.stringify({}, null, 2));
    }
}
exports.default = DataBase;
_DataBase_fileName = new WeakMap(), _DataBase_nestedEnabled = new WeakMap(), _DataBase_separator = new WeakMap();
