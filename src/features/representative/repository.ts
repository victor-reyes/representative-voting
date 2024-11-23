export function createRepository() {
  return {
    async getAll() {
      return [
        { id: 1, firstName: "John", lastName: "Doe" },
        { id: 2, firstName: "Jane", lastName: "Smith" },
        { id: 3, firstName: "Alice", lastName: "Johnson" },
      ];
    },
  };
}

export type Repository = ReturnType<typeof createRepository>;
