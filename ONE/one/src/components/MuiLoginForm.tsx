import { DevTool } from "@hookform/devtools";
import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

let renderCount = 0;

type TFormValues = {
  email: string;
  password: string;
};

const MuiLoginForm = () => {
  console.log("MuiLoginForm re-render");

  renderCount++;

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<TFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: TFormValues) => {
    console.log("Form Submitted = ", data);
  };
  return (
    <div>
      <h1>Login {renderCount}</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2} width={400}>
          <TextField
            label="Email"
            type="email"
            {...register("email", {
              required: "Email is required!",
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required!",
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Stack>
      </form>

      <DevTool control={control} />
    </div>
  );
};

export default MuiLoginForm;
