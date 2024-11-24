import { Button, Explanation } from "@/components";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Explanation explanation="This page is under construction. Check back later or go to the following pages.">
        <Button asChild>
          <Link href="/representatives">Representatives</Link>
        </Button>

        <Button asChild>
          <Link href="/petitions">Petitions</Link>
        </Button>
      </Explanation>
    </main>
  );
}
