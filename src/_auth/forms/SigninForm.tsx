import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { SignInValidation } from "@/lib/validation";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SigninForm = () => {
  // Toasts are kind of like notifications that appear in the form of a small rectangle.
  // They can carry notifications, warnings, errors, etc...
  // Here, we are importing it from the ui folder
  const { toast } = useToast();

  /*
    The useUserContext hook is being used for the user authentication process.

    Here's what it will return: 

        const value = {
          user,
          setUser,
          isLoading,
          isAuthenticated,
          setIsAuthenticated,
          checkAuthUser,
        };

        From that, we extract checkAuthUser, and isLoading. But we rename the later to isUserLoading.
  */
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  // We use this hook to navigate around
  const navigate = useNavigate();

  // This hook is used for signing the user i
  const { mutateAsync: signInAccount } = useSignInAccount();

  // We are using Zod for form validataion. For eg., It will tell the user that their username must not be too short, their email should be valid, etc...

  // 1. Define your form.
  /*
    z.infer<typeof SignInValidation - In this line, we are telling Zod to use the SignInValidation schema
    
    resolver: zodResolver(SignInValidation) - Here, we are telling Zod to implement the validation rules that we have written in the original schema.
  */
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInValidation>) {
    // We start the sign In process with the values written in the email and password by the user
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({
        title:
          "Sign in failed. The returned value of the session is empty. Location of the thrown error: src/_auth/forms/SignupForm.tsx",
      });
    }

    // If the log in has processed successfully, then the signInAccount function will that to checkAuthUser. And if the user indeed has logged in, we will recieve something in isLoggedIn
    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      // If that is indeed the case, we reset the form, and navigate the user to the home page
      form.reset();

      navigate("/");
    } else {
      // Or else we tell the user to try again
      return toast({ title: "Sign up failed. Please Try again " });
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        {/* Renders the logo */}
        <img src="/assets/images/logo.svg" alt="logo" />

        {/* Renders the title */}
        <h2 className="h3-bold md:h2-bold pt-5 ">Log in to your account</h2>

        {/* Renders the subtitle */}
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! Please enter your details
        </p>

        {/* Renders the entire form */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          {/* Renders the Email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>

                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Renders the Password field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>

                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Button for logging in */}
          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading
              </div>
            ) : (
              "Sign in"
            )}
          </Button>
          
          {/* Button linking to the sign up page if the user doesn't have an account */}
          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account?
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semi-bold ml-1"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
