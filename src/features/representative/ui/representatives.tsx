import { instance } from "../instance";
import { RepresentativeDrawer, RepresentativeItem } from "./components";

export async function Representatives() {
  const representatives = await instance.service.getAll();

  return (
    <>
      <div className="flex justify-between items-center py-2">
        <div>Represenatives</div>
        <RepresentativeDrawer />
      </div>
      <ul className="space-y-2">
        {representatives.map((representative) => (
          <RepresentativeItem
            key={representative.id}
            representative={representative}
          />
        ))}
      </ul>
    </>
  );
}
