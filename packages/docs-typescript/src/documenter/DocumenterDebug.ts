import {
  ApiClass,
  ApiConstructor,
  ApiItem,
  ApiMethod,
  ApiModel,
  ApiProperty,
} from "@microsoft/api-extractor-model";

type BufferLine = ContentLine | RuleLine;

interface ContentLine {
  kind: "content";
  level: number;
  content: string;
}

interface RuleLine {
  kind: "rule";
  level: number;
}

class DocumenterDebug {
  private _apiModel: ApiModel;
  private _buffer: BufferLine[] = [];

  constructor(apiModel: ApiModel) {
    this._apiModel = apiModel;
  }

  public buildHierarchy(): void {
    this._enumerateApiItems(this._apiModel, "", 0);
    this._printBuffer();
  }

  private _printBuffer(): void {
    for (const line of this._buffer) {
      if (line.kind === "content") {
        console.log(`${"  ".repeat(line.level)} = ${line.content}`);
      }
      if (line.kind === "rule") {
        console.log(`${"  ".repeat(line.level)} -`);
      }
    }
  }

  private _writeToBuffer(line: BufferLine): void {
    this._buffer.push(line);
  }

  private _enumerateApiItems(
    apiItem: ApiItem,
    url: string,
    level: number,
  ): void {
    let summaryString = `(${apiItem.kind}) [${apiItem.displayName}]`;
    this._writeToBuffer({ kind: "content", level, content: summaryString });

    if (apiItem instanceof ApiClass) {
      const documentedClass = this._enumerateApiClass(apiItem);
      this._writeToBuffer({
        kind: "content",
        level: level + 1,
        content: `name: ${documentedClass.name}`,
      });
      this._writeToBuffer({
        kind: "content",
        level: level + 1,
        content: `excerpt: ${documentedClass.excerpt}`,
      });
      this._writeToBuffer({
        kind: "content",
        level: level + 1,
        content: `isAbstract: ${documentedClass.isAbstract}`,
      });
      this._writeToBuffer({
        kind: "content",
        level: level + 1,
        content: `isExported: ${documentedClass.isExported}`,
      });
      this._writeToBuffer({
        kind: "content",
        level: level + 1,
        content: `extendsType: ${documentedClass.extendsType}`,
      });
      this._writeToBuffer({
        kind: "content",
        level: level + 1,
        content: `implementsTypes: ${documentedClass.implementsTypes}`,
      });
      this._writeToBuffer({
        kind: "content",
        level: level + 1,
        content: `fileUrlPath: ${documentedClass.fileUrlPath}`,
      });
      this._writeToBuffer({
        kind: "content",
        level: level + 1,
        content: `typeParameters: ${documentedClass.typeParameters}`,
      });
    }

    if (apiItem instanceof ApiConstructor) {
      const documentedConstructor = this._enumerateApiConstructor(apiItem);
      this._writeToBuffer({
        kind: "content",
        level: level + 1,
        content: `name: ${documentedConstructor.name}`,
      });
      this._writeToBuffer({
        kind: "content",
        level: level + 1,
        content: `excerpt: ${documentedConstructor.excerpt}`,
      });
      this._writeToBuffer({
        kind: "content",
        level: level + 1,
        content: `fileUrlPath: ${documentedConstructor.fileUrlPath}`,
      });
      for (const param of documentedConstructor.typeParameters) {
        this._writeToBuffer({
          kind: "content",
          level: level + 1,
          content: `param: ${param.name} | type: ${param.type} | isOptional: ${param.isOptional}`,
        });
      }
    }

    if (apiItem instanceof ApiProperty) {
    }

    if (apiItem instanceof ApiMethod) {
    }

    for (const member of apiItem.members) {
      const memberUrl =
        member.displayName === ""
          ? `${url}/(emptyName)`
          : `${url}/${member.displayName}`;

      this._enumerateApiItems(member, memberUrl, level + 1);
    }
  }

  private _enumerateApiClass(apiClass: ApiClass): DocumentedClass {
    const name = apiClass.displayName;
    const excerpt = apiClass.excerpt.text;
    const isAbstract = apiClass.isAbstract;
    const isExported = apiClass.isExported;
    const extendsType = apiClass.extendsType?.excerpt.text;
    const implementsTypes = apiClass.implementsTypes.map((x) => x.excerpt.text);
    const fileUrlPath = apiClass.fileUrlPath;
    const typeParameters = apiClass.typeParameters.map((x) => x.name);

    return new DocumentedClass(
      name,
      excerpt,
      isAbstract,
      isExported,
      extendsType,
      implementsTypes,
      fileUrlPath,
      typeParameters,
    );
  }

  private _enumerateApiConstructor(
    apiConstructor: ApiConstructor,
  ): DocumentedConstructor {
    const name = apiConstructor.displayName;
    const excerpt = apiConstructor.excerpt.text;
    const fileUrlPath = apiConstructor.fileUrlPath;
    const typeParameters = apiConstructor.parameters.map(
      (x) =>
        new DocumentedParameter(
          x.name,
          x.parameterTypeExcerpt.text,
          x.isOptional,
        ),
    );

    return new DocumentedConstructor(
      name,
      excerpt,
      fileUrlPath,
      typeParameters,
    );
  }

  private _enumerateApiProperty(apiProperty: ApiProperty): void {}
}

class DocumentedClass {
  constructor(
    public name: string,
    public excerpt: string,
    public isAbstract: boolean,
    public isExported: boolean,
    public extendsType: string | undefined,
    public implementsTypes: string[],
    public fileUrlPath: string | undefined,
    public typeParameters: string[],
  ) {}
}

class DocumentedConstructor {
  constructor(
    public name: string,
    public excerpt: string,
    public fileUrlPath: string | undefined,
    public typeParameters: DocumentedParameter[],
  ) {}
}

class DocumentedParameter {
  constructor(
    public name: string,
    public type: string,
    public isOptional: boolean,
  ) {}
}

export { DocumenterDebug };
