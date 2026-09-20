import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Signup successful! Please check your email to confirm your account.",
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signup, isPending };
}
