export function createRepository() {
  const representatives = [
    { id: 1, firstName: "John", lastName: "Doe", email: "doe@rep.com" },
    { id: 2, firstName: "Jane", lastName: "Smith", email: "smith@rep.com" },
    { id: 3, firstName: "Alice", lastName: "Johnson", email: "john@rep.com" },
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
        email,
      });
    },
  };
}

export type Repository = ReturnType<typeof createRepository>;
