import LoginForm from "@/components/LoginForm"

export default function UserLoginPage() {
  return (
    <LoginForm
      selectedRole="user"
      registerHref="/auth/user/register"
      registerLabel="Create an investor account"
    />
  )
}
