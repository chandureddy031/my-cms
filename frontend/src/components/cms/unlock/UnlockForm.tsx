import { Button } from "@/components/ui";
import { unlock } from "@/lib/admin/actions";
import { CMS_INPUT_CLASS } from "../shared/CmsField";
import { CmsNotice } from "../shared/CmsNotice";

interface UnlockFormProps {
  error?: string;
}

/** Editor sign-in with the admin key. */
export function UnlockForm({ error }: UnlockFormProps) {
  return (
    <div className="mx-auto mt-16 max-w-md">
      <div className="glass rounded-[2rem] p-10 shadow-lift">
        <h1 className="font-display text-3xl font-bold">Editor sign-in</h1>
        <p className="mt-2 text-sm text-gray-600">Enter the admin key to manage the website.</p>
        <div className="mt-6"><CmsNotice error={error} /></div>
        <form action={unlock} className="space-y-4">
          <input name="key" type="password" required autoFocus placeholder="Admin key" aria-label="Admin key" className={CMS_INPUT_CLASS} />
          <Button className="w-full">Unlock</Button>
        </form>
      </div>
    </div>
  );
}
