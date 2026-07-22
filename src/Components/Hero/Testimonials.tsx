const testimonials = [
  {
    name: 'Rahim Khan',
    role: 'Software Engineer at Brain Station 23',
    content:
      'CareerTrack Lite helped me track 87 applications and land my dream job in just 2 months.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Nusrat Jahan',
    role: 'Frontend Developer',
    content:
      'The dashboard and analytics are incredibly helpful. I can see my progress clearly.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Sabbir Ahmed',
    role: 'Recent Graduate',
    content:
      'Organizing applications has never been easier. Highly recommended for job seekers!',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
]

const Testimonials = () => {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
            What Our Users Say
          </h2>
          <p className="text-xl text-muted">
            Real stories from real job seekers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="bg-card border border-border p-8 rounded-3xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-muted leading-relaxed italic">
                “{testimonial.content}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
