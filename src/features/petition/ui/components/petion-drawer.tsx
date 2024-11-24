import { Button, DrawerClose, FormDrawer, Input } from "@/components";
import Form from "next/form";
import { createPetitionAction } from "../../actions";

export function PetitionDrawer() {
  return (
    <FormDrawer
      buttonTitle="Add Petition"
      title="Register new petition"
      description="You can add a new petition that will be sent to the representatives to debate and vote on. There should be at least two choices."
    >
      <CreatePetitionForm />
    </FormDrawer>
  );
}

function CreatePetitionForm() {
  return (
    <Form action={createPetitionAction} className="flex flex-col gap-2">
      <Input type="text" name="title" placeholder="Title" required />
      <Input
        type="text"
        name="description"
        placeholder="Description"
        required
      />
      <Input
        type="text"
        name="choices"
        placeholder="Add petitions choices separating by comma"
        required
      />
      <Button type="submit">Save</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </Form>
  );
}
