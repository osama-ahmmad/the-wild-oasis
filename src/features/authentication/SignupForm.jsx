import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

function SignupForm() {
  const { signup, isPending } = useSignup();

  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: reset,
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "Please provide your full name",
          })}
          disabled={isPending}
        />
      </FormRow>

      <FormRow label="Email address" error={errors.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "Please provide your email",
            pattern: /\S+@\S+\.\S+/,
            message: "Please provide a valid email address",
          })}
          disabled={isPending}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors.password?.message}>
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "Please provide your password",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
          disabled={isPending}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "Please repeat your password",
            validate: (value) =>
              value === getValues().password || "Passwords do not match",
          })}
          disabled={isPending}
        />
      </FormRow>

      <FormRow>
        <Button
          variant="secondary"
          type="reset"
          disabled={isPending}
          onClick={reset}>
          Cancel
        </Button>
        <Button disabled={isPending}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
