import { ReactNode } from "react";

type Props = { title: string; addFormDrawer: ReactNode; children: ReactNode };

export function ListSectionWithAddFormDrawer({
  title,
  addFormDrawer,
  children,
}: Props) {
  return (
    <>
      <div className="flex justify-between items-center py-2">
        <div>{title}:</div>
        {addFormDrawer}
      </div>
      <ul className="space-y-2">{children}</ul>
    </>
  );
}
