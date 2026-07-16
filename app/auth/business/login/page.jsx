import LoginForm from "@/components/LoginForm"

export default function BusinessLoginPage() {
  return (
    <LoginForm
      selectedRole="business"
      registerHref="/auth/business/register"
      registerLabel="Register your business"
    />
  )
}
