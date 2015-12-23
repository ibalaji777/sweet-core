/* flow */

import { List } from "immutable";
import { Token } from "./reader";
import { Symbol } from "./symbol";

export function makeString(value, ctx) {
    let ss = ctx && ctx.scopeset ? ctx.scopeset : undefined;
    return new Syntax({
        value: value
    }, ss);
}

export function makeIdentifier(value, ctx) {
    let ss = ctx && ctx.scopeset ? ctx.scopeset : undefined;
    return new Syntax({
        type: Token.Identifier,
        value: value
    }, ss);
}

export default class Syntax {
    constructor(token, scopeset = List()) {
        this.token = token;
        this.scopeset = scopeset;
    }

    resolve() {
        if (this.scopeset.size === 0) {
            return this.token.value;
        }
        let scope = this.scopeset.last();
        if (scope) {
            let scopesetBindingList = scope.bindings.get(this);
            return scopesetBindingList.get(0).get(1);
        } else {
            return this.token.value;
        }

    }

    val() {
        return this.token.value;
    }

    addScope(scope) {
        return new Syntax(this.token, this.scopeset.push(scope));
    }

    isIdentifier() {
        return this.token.type === Token.Identifier;
    }
    isBooleanLiteral() {
        return this.token.type === Token.BooleanLiteral;
    }
    isKeyword() {
        return this.token.type === Token.Keyword;
    }
    isNullLiteral() {
        return this.token.type === Token.NullLiteral;
    }
    isNumericLiteral() {
        return this.token.type === Token.NumericLiteral;
    }
    isPunctuator() {
        return this.token.type === Token.Punctuator;
    }
    isStringLiteral() {
        return this.token.type === Token.StringLiteral;
    }
    isRegularExpression() {
        return this.token.type === Token.RegularExpression;
    }
    isTemplate() {
        return this.token.type === Token.Template;
    }
    isDelimiter() {
        return this.token.type === Token.Delimiter;
    }
    isParenDelimiter() {
        return this.token.type === Token.Delimiter &&
               this.token.value === "()";
    }
    isCurlyDelimiter() {
        return this.token.type === Token.Delimiter &&
            this.token.value === "{}";
    }
    isSquareDelimiter() {
        return this.token.type === Token.Delimiter &&
            this.token.value === "[]";
    }
    isEOF() {
        return this.token.type === Token.EOF;
    }

    toString() {
        return this.token.value;
    }
}
