export function createRepository() {
  const petitions = [
    {
      id: 1,
      topic: "Free Ice Cream for Everyone!",
      description:
        "A proposal to provide free ice cream to all citizens as a gesture to boost public morale and happiness.",
      isDone: false,
    },
    {
      id: 2,
      topic: "Higher Wages for Teachers",
      description:
        "A petition advocating for increased salaries for teachers to recognize their vital role in educating future generations.",
      isDone: true,
    },
    {
      id: 3,
      topic: "More Nuclear Power Plants",
      description:
        "A call to build additional nuclear power plants to meet energy demands and reduce reliance on fossil fuels.",
      isDone: true,
    },
  ];

  return {
    async getAll() {
      return petitions;
    },

    async create(topic: string, description: string) {
      const petition = {
        id: petitions.length + 1,
        topic,
        description,
        isDone: false,
      };
      petitions.push(petition);
    },
  };
}

export type Repository = ReturnType<typeof createRepository>;
