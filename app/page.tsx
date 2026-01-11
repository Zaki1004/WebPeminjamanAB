import FormLogin from "@/features/login/components/form-login";

const Login = () => {
  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="w-full max-w-md border-2 border-black p-10 rounded-lg">
          <h1 className="text-lg text-red-500 font-bold mb-4 text-center">
            Login Sistem Inventaris AB DIGI
          </h1>
          <FormLogin />
        </div>
      </div>
    </>
  );
};

export default Login;
