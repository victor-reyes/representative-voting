import { Button } from "./ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "./ui/drawer";

type Props = {
  buttonTitle: string;
  title: string;
  description: string;
  children: JSX.Element;
};

export function FormDrawer({
  buttonTitle,
  title,
  description,
  children,
}: Props) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>{buttonTitle}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm p-4">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
