import { Shield, User, Microscope, Heart } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Безопасность",
    description: "Сертифицированные препараты и строгое соблюдение протоколов",
  },
  {
    icon: User,
    title: "Индивидуальный подход",
    description: "Персональная программа ухода для каждого клиента",
  },
  {
    icon: Microscope,
    title: "Научный подход",
    description: "Методики pro age на основе доказательной медицины",
  },
  {
    icon: Heart,
    title: "Уютный кабинет",
    description: "Комфортная атмосфера для расслабления и заботы о себе",
  },
]

export function WhySection() {
  return (
    <section className="py-24 md:py-32 relative">
      {/* X-ray decorative element */}
      <div className="absolute left-0 top-0 w-1/4 h-full opacity-[0.02] pointer-events-none">
        <div className="w-full h-full xray-lines" />
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mb-4">Почему Bellezza?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Профессионализм, научный подход и искренняя забота о каждом клиенте
            </p>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-card border border-border/50 hover:border-border transition-all duration-500 hover:shadow-xl hover:shadow-foreground/5"
              >
                {/* Icon */}
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-muted/50 group-hover:bg-muted transition-colors">
                  <feature.icon className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-medium mb-2 group-hover:text-foreground transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>

                {/* Hover decorative line */}
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
