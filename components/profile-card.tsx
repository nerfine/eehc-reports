"use client"

import { useState } from "react"
import { Globe, Mail, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAdmin } from "@/lib/admin-context"
import { AdminLoginModal } from "@/components/admin-login-modal"

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
  </svg>
)

interface ProfileCardProps {
  name?: string
  handle?: string
  bio?: string
  avatarUrl?: string
  bannerUrl?: string
  className?: string
}

export function ProfileCard({
  name = "Mathis (Nerfine)",
  handle = "@nerfine",
  bio = "Multi-platform support specialist providing exceptional customer service and technical assistance.",
  avatarUrl = "https://cdn.discordapp.com/avatars/286201707346526229/c5f44fc3ac047bcc935520adad42844d.png?size=512",
  bannerUrl = "https://cdn.discordapp.com/banners/286201707346526229/b0a5335d8854424a472d258f5aaad270.png?size=4096",
  className,
}: ProfileCardProps) {
  const { isAdmin, logout } = useAdmin()
  const [loginOpen, setLoginOpen] = useState(false)

  const handleAvatarClick = () => {
    if (!isAdmin) {
      setLoginOpen(true)
    }
  }

  return (
    <>
      <div className={cn("relative w-full max-w-xs rounded-2xl bg-zinc-900 border border-zinc-800 shadow-lg overflow-hidden", className)}>
        <div className="relative h-32 w-full">
          <img src={bannerUrl} alt="Profile banner" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
        </div>

        <div className="absolute left-1/2 top-24 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
          <button
            onClick={handleAvatarClick}
            className={cn(
              "h-24 w-24 rounded-full border-4 border-zinc-900 object-cover shadow-md overflow-hidden transition-all active-scale-sm",
              !isAdmin && "cursor-pointer hover:ring-2 hover:ring-primary/50 hover:ring-offset-2 hover:ring-offset-zinc-900"
            )}
          >
              <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
            </button>
            <div className="absolute inset-0 rounded-full ring-2 ring-white/10 pointer-events-none" />
            {isAdmin && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-zinc-900 flex items-center justify-center pointer-events-none animate-scale-in">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
            )}
          </div>
        </div>

        <div className="px-5 pt-14 pb-5 text-center">
          <h3 className="text-lg font-bold text-white">{name}</h3>
          <p className="mt-0.5 text-sm text-zinc-400">{handle}</p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">{bio}</p>

          {isAdmin && (
            <button
              onClick={logout}
              className="mt-4 text-xs text-zinc-500 hover:text-red-400 transition-colors active-scale-sm"
            >
              Sign out
            </button>
          )}

          <div className="mt-5 flex justify-center gap-5">
            <a href="https://nerfine.xyz/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors" aria-label="Website">
              <Globe className="h-5 w-5" />
            </a>
            <a href="https://discord.com/users/286201707346526229" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors" aria-label="Discord">
              <DiscordIcon className="h-5 w-5" />
            </a>
            <a href="mailto:hello@nerfine.xyz" className="text-zinc-400 hover:text-white transition-colors" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <AdminLoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}
