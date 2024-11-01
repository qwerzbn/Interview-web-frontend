import { useEffect, useState } from "react";
import { addSignInUsingPost } from "@/api/userController";

const useAddUserSignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const doFetch = async () => {
    setLoading(true);
    try {
      const res = await addSignInUsingPost();
    } catch (e) {}
    setLoading(false);
  };
  useEffect(() => {
    doFetch();
  }, []);
  return {
    loading,
  };
};
export default useAddUserSignIn;
