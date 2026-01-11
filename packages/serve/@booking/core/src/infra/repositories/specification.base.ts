import { ISpecificationBase, QueryAndNode, QueryTypeNode } from "../../types";

export abstract class SpecificationBase implements ISpecificationBase {
  abstract toAst: () => QueryTypeNode;

  withAnd(other: SpecificationBase): ISpecificationBase {
    return new CompositeSpecification(this, other);
  }
}

class CompositeSpecification implements ISpecificationBase {
  constructor(
    private readonly left: ISpecificationBase,
    private readonly right: ISpecificationBase,
  ) {}

  toAst(): QueryAndNode {
    return {
      type: "AND",
      nodes: [this.left.toAst(), this.right.toAst()],
    };
  }
}
