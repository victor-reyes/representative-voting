const petitions = [
  { id: 1, topic: "Free Ice Cream for Everyone!", isDone: false },
  { id: 2, topic: "Higher Wages for Teachers", isDone: true },
  { id: 3, topic: "More Nuclear Power Plants", isDone: true },
];

export default function Petitions() {
  return (
    <main>
      <h1>Petitions!</h1>
      <ul className="flex flex-col gap-2">
        {petitions.map((petition) => (
          <li key={petition.id} className="flex gap-4">
            <h2>{petition.topic}</h2>
            <p>{petition.isDone ? "Done" : "Ongoing"} </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
