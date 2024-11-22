import {
  Button,
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components";

export function RepresentativeDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Add Representative</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm p-4">
          Add a new representative
        </div>
      </DrawerContent>
    </Drawer>
  );
}
