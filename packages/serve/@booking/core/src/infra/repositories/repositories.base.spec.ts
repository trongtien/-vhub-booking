import { BaseRepository } from "./repositories.base";

interface IEntityTestRepoBase {
  id: string;
  name: string;
}

describe("Repository base", () => {
  const tableName = "table-test";
  class TestRepository extends BaseRepository<IEntityTestRepoBase> {
    protected readonly tableName: string = tableName;
  }

  function registerKnexMock() {
    const qb = {
      where: jest.fn().mockReturnThis(),
      first: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const knex = jest.fn(() => qb) as any;

    return { knex, qb };
  }

  describe("BaseRepository.findById", () => {
    it("Should return when entity not found", async () => {
      const { qb, knex } = registerKnexMock();
      const repo = new TestRepository(knex);

      qb.first.mockResolvedValue({ id: "1", name: "Test" });

      const result = await repo.findById("1");

      expect(knex).toHaveBeenCalledWith(tableName);
      expect(qb.where).toHaveBeenCalledWith({ id: "1" });
      expect(qb.first).toHaveBeenCalled();
      expect(result).toEqual({ id: "1", name: "Test" });
    });

    it("Should return null when not found", async () => {
      const { qb, knex } = registerKnexMock();
      const repo = new TestRepository(knex);

      qb.first.mockResolvedValue(undefined);

      const result = await repo.findById("404");
      expect(result).toBeNull();
    });

    it("map error when knex throws", async () => {
      const { qb, knex } = registerKnexMock();
      const repo = new TestRepository(knex);

      qb.first.mockRejectedValue(new Error("db error"));

      await expect(repo.findById("1")).rejects.toBeDefined();
    });
  });
});
