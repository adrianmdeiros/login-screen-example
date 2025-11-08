import AuthTabs from "./components/AuthTabs";

export default async function LoginPage() {
  return (
    <div className="h-screen w-full items-center justify-center flex p-2">
      <AuthTabs />
    </div>
  );
}
