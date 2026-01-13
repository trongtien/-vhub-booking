import type { Knex } from "@booking/serve-knex-cli";

export type QueryOperator = "=" | "!=" | ">" | "<" | "LIKE";

export type QueryTypeNode =
  | QuerySelect
  | QueryAndNode
  | QueryCompareNode
  | QueryJoinNode;

export interface QuerySelect {
  type: "SELECT";
  fields: readonly string[];
}

export interface QueryAndNode {
  type: "AND";
  nodes: QueryTypeNode[];
}

export interface QueryCompareNode {
  type: "COMPARE";
  field: string;
  operator: QueryOperator;
  value: string | number | boolean;
}

export interface QueryJoinNode {
  type: "JOIN";
  table: string;
  on: readonly [string, string];
  kind: "left" | "inner" | "right";
}

export interface ISpecificationBase {
  toAst: () => QueryTypeNode;
}

export interface IRegisterKnexAdapter {
  qb: Knex.QueryBuilder;
  node: QueryTypeNode;
}
