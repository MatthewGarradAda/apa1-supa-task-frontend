import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Fake Store
          </div>
          
          <Link href="/admin">
            <Button variant="ghost" size="sm">
              Admin Portal
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  )
}
