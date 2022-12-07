export enum Op {
  Eq = "Eq",
  Gt = "Gt",
  GtEq = "GtEq",
  Lt = "Lt",
  LtEq = "LtEq",
  Ct = "Ct",
}

export interface ReqFilter {
  prop: string;
  operation: Op;
  value: any;
}
