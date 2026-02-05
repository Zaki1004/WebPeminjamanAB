import FormLogin from "@/features/login/components/form-login";
import Link from "next/link";

const Login = () => {
  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="w-full max-w-md border-2 border-black p-10 rounded-lg">
          <h1 className="text-lg text-red-500 font-bold mb-4 text-center">
            Login Sistem Inventaris AB DIGI
          </h1>
          <FormLogin />
          {/* <div className="bg-red-200 rounded-lg">
            <Link href="/admin/dashboard">Admin</Link>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Login;
