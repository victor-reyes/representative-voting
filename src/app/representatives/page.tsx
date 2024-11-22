const representatives: { id: number; firstName: string; lastName: string }[] = [
  { id: 1, firstName: "John", lastName: "Doe" },
  { id: 2, firstName: "Jane", lastName: "Smith" },
  { id: 3, firstName: "Alice", lastName: "Johnson" },
];

export default function Representatives() {
  return (
    <main>
      <div>Represenatives!</div>
      <ul>
        {representatives.map((representative) => (
          <li key={representative.id}>
            <h2>
              {representative.firstName} {representative.lastName}
            </h2>
          </li>
        ))}
      </ul>
    </main>
  );
}
