import * as React from "react";
import { useSelector } from "react-redux";

function useRedirect({ navigation }) {
  const isSignedIn = useSelector((state) => state.user.isSignedIn);

  React.useEffect(() => {
    if (!isSignedIn) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
  }, [isSignedIn]);
}

export default useRedirect;
