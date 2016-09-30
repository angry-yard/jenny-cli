export interface ITypeConvertor {
    toJavascriptType(): string;
    toDatabaseType(): string;
    toCSharpType(): string;
}