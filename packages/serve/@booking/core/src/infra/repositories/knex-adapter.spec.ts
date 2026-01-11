import knex from "knex";
import console from "node:console";
import { KnexAdapter } from "./knex-adapter";
import { QueryCompareNode, QueryJoinNode, QuerySelect } from "../../types";

describe("KnexAdapter", () => {
  const db = knex({ client: "pg" });
  const qb = db("customer");
  const specNodeSelect: QuerySelect = {
    type: "SELECT",
    fields: ["id", "title"],
  };

  const specNodeCompare: QueryCompareNode = {
    type: "COMPARE",
    field: "id",
    operator: "!=",
    value: "1111111111111111111111111111",
  };

  const specNodeJoin: QueryJoinNode = {
    type: "JOIN",
    kind: "inner",
    on: ["user.province_code", "province.code"],
    table: "user",
  };

  it("Should generator to select ast", () => {
    new KnexAdapter({ qb, node: specNodeSelect }).build();
    const sql = qb.toSQL().sql;
    console.assert("=>> Sql select ast", sql);
    expect(sql).toContain(`select "id", "title"`);
  });

  it("Should generator to select compare", () => {
    new KnexAdapter({ qb, node: specNodeCompare }).build();
    const sql = qb.toSQL().sql;
    console.assert("=>> Sql compare ast", sql);
    expect(sql).toContain(`where "id" != ?`);
  });
});
