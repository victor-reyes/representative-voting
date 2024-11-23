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

    async create(firstName: string, lastName: string, email: string) {
      representatives.push({
        id: representatives.length + 1,
        firstName,
        lastName,
      });
    },
  };
}

export type Repository = ReturnType<typeof createRepository>;
