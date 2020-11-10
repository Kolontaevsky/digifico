interface PublicationData {
  fieldId: number;
  value: string;
}

export interface Publication {
  id: number;
  code: string;
  data: Array<PublicationData>;
}

export interface PublicationsList {
  pagingInfo: {};
  result: Array<Publication>;
}

export interface PublicationMetadata {
  id: number;
  name: string;
  type: string;
  fieldId: number;
  fieldCode: string;
  placeholderTxt: string;
  isReadOnly: boolean;
  isHidden: boolean;
  priority: number;
  isMandatory: boolean;
}
