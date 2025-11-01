import Header from "@/components/header"
import Footer from "@/components/footer"
import AuthForm from "@/components/auth-form"

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background">
      
      <Header />
      <div className="flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your Rammys Closet account</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-8">
            
            <AuthForm type="login" />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
