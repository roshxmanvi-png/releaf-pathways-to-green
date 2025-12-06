import { Button } from "@/components/ui/button";

const SignupSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md glass rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-display font-bold mb-4">Welcome to Releaf</h2>
        <p className="text-lg mb-6">You have successfully signed up in Releaf.</p>
        <div className="flex items-center justify-center gap-4">
          <Button asChild className="bg-primary text-white">
            <a href="/">Go to Home</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupSuccess;
