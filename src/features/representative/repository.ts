export function createRepository() {
  const representatives = [
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Jane", lastName: "Smith" },
    { id: 3, firstName: "Alice", lastName: "Johnson" },
  ];

  return {
    async getAll() {
      return representatives;
    },
  };
}

export type Repository = ReturnType<typeof createRepository>;
