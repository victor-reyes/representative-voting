import Form from "next/form";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Input,
} from "@/components";
import { createRepresentativeAction } from "../../actions";

export function RepresentativeDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Add Representative</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm p-4">
          <DrawerHeader>
            <DrawerTitle>Register new representative</DrawerTitle>
            <DrawerDescription>The email should be unique</DrawerDescription>
          </DrawerHeader>
          <CreateRepresentativeForm />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function CreateRepresentativeForm() {
  return (
    <Form action={createRepresentativeAction} className="flex flex-col gap-2">
      <Input type="text" name="firstName" placeholder="First Name" required />
      <Input type="text" name="lastName" placeholder="Last Name" required />
      <Input type="email" name="email" placeholder="Email" required />
      <Button type="submit">Save</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </Form>
  );
}
