const features = [
  {
    title: 'Smart Application Tracking',
    desc: 'Keep all your job applications organized in one place with real-time status updates.',
    icon: '📋',
  },
  {
    title: 'Advanced Analytics',
    desc: 'Visual dashboard with statistics, success rate & insights to improve your strategy.',
    icon: '📊',
  },
  {
    title: 'Powerful Search & Filter',
    desc: 'Quickly find applications by company, status, date or keywords.',
    icon: '🔍',
  },
  {
    title: 'Secure & Private',
    desc: 'Your data is protected with industry-standard security and privacy.',
    icon: '🔒',
  },
]

const Features = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Everything You Need
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Powerful tools to manage your job hunt like a professional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-card border border-border p-8 rounded-3xl hover:shadow-md transition-all group"
            >
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
