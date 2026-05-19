import { Loader } from "~/shared/ui/Loader/Loader";

import { RegistrationCompleteView } from "./_views/RegistrationCompleteView";
import { useAppHooks } from "~/shared/hooks/app.hooks";

export default function RegistrationComplete() {
  const { isLoading } = useAppHooks();

  return (
    <>
      {isLoading ? <Loader /> : null}

      <RegistrationCompleteView translation="registrationComplete" />
    </>
  );
}
