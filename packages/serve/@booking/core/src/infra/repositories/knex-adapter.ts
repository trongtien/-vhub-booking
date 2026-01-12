import { Knex } from "knex";
import type {
  IRegisterKnexAdapter,
  QueryAndNode,
  QueryCompareNode,
  QueryJoinNode,
  QuerySelect,
  QueryTypeNode,
} from "../../types";

export class KnexAdapter {
  private adapter: IRegisterKnexAdapter;

  constructor(configAdapter: IRegisterKnexAdapter) {
    this.adapter = configAdapter;
  }

  build() {
    const { node } = this.adapter;
    switch (node.type) {
      case "SELECT":
        this.toAstSelect();
        return;

      case "AND":
        this.toAstSelect();
        return;

      case "COMPARE":
        this.toAstCompare();
        return;

      case "JOIN":
        this.toAstJoin();
        return;
    }
  }

  private toAstSelect() {
    const { fields } = this.adapter.node as QuerySelect;
    return this.adapter.qb.select(fields);
  }

  private toAstAnd() {
    const { nodes } = this.adapter.node as QueryAndNode;
    return nodes?.forEach((n) =>
      new KnexAdapter({ qb: this.adapter.qb, node: n }).build(),
    );
  }

  private toAstCompare() {
    const node = this.adapter.node as QueryCompareNode;
    return this.adapter.qb.where(node.field, node.operator, node.value);
  }

  private toAstJoin() {
    const qb = this.adapter.qb;
    const node = this.adapter.node as QueryJoinNode;
    const tableLeft = node.on[0];
    const tableRight = node.on[1];

    if (node.kind === "inner") {
      return qb.join(node.table, tableLeft, tableRight);
    }

    if (node.kind === "left") {
      return qb.leftJoin(node.table, tableLeft, tableRight);
    }

    if (node.kind === "right") {
      return qb.rightJoin(node.table, tableLeft, tableRight);
    }

    return;
  }
}
