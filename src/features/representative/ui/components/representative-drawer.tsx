import Form from "next/form";
import { Button, DrawerClose, FormDrawer, Input } from "@/components";
import { createRepresentativeAction } from "../../actions";

export function RepresentativeDrawer() {
  return (
    <FormDrawer
      buttonTitle="Add Representative"
      title="Register new representative"
      description="The email should be unique"
    >
      <CreateRepresentativeForm />
    </FormDrawer>
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
