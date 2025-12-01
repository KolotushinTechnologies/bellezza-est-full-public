export function ContactCardSkeleton() {
  return (
    <div className="group p-8 rounded-3xl bg-card border border-border/50 text-center animate-pulse">
      <div className="inline-flex p-4 rounded-2xl bg-muted/50 mb-4">
        <div className="w-6 h-6 bg-muted rounded" />
      </div>
      <div className="h-5 bg-muted rounded w-20 mx-auto mb-2" />
      <div className="h-4 bg-muted/70 rounded w-32 mx-auto" />
    </div>
  )
}

export function ContactCTASkeleton() {
  return (
    <div className="text-center p-12 rounded-3xl bg-muted/30 border border-border/30 animate-pulse">
      <div className="h-8 bg-muted rounded w-48 mx-auto mb-4" />
      <div className="h-5 bg-muted/70 rounded w-64 mx-auto mb-6" />
      <div className="h-12 bg-muted rounded w-32 mx-auto" />
    </div>
  )
}

export function FooterContactSkeleton() {
  return (
    <div className="space-y-3 text-sm animate-pulse">
      <div className="h-4 bg-muted/50 rounded w-24" />
      <div className="h-4 bg-muted/50 rounded w-32" />
      <div className="h-4 bg-muted/50 rounded w-40" />
    </div>
  )
}
