import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: ({ user }) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: false });
    },
    onError: (err) => {
      console.log(err);
      toast.error(
        "There was an error logging in. Please check your credentials.",
      );
    },
  });

  return { login, isPending };
}
