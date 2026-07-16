import LoginForm from "@/components/LoginForm"

export default function AdminLoginPage() {
  // No register link for admin — self-registration is not allowed
  return <LoginForm selectedRole="admin" />
}
