"use client"
import React, { useState } from 'react';
import { 
  Activity, 
  Shield, 
  Zap, 
  Globe, 
  Bell, 
  BarChart3, 
  Clock, 
  Check, 
  Star, 
  Menu, 
  X,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router=useRouter();
  const features = [
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "Monitor your websites and APIs every 30 seconds from multiple global locations"
    },
    {
      icon: Bell,
      title: "Instant Alerts",
      description: "Get notified immediately via email, SMS, Slack, or webhook when issues occur"
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Comprehensive uptime statistics, response times, and performance insights"
    },
    {
      icon: Globe,
      title: "Global Monitoring",
      description: "Monitor from 15+ worldwide locations to ensure global accessibility"
    },
    {
      icon: Shield,
      title: "SSL Certificate Monitoring",
      description: "Track SSL certificate expiration and get alerts before they expire"
    },
    {
      icon: Zap,
      title: "Status Pages",
      description: "Beautiful public status pages to keep your customers informed"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$9",
      period: "/month",
      description: "Perfect for small websites and projects",
      features: [
        "5 monitors",
        "1-minute checks",
        "Email alerts",
        "Basic status page",
        "30-day data retention"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "Ideal for growing businesses",
      features: [
        "25 monitors",
        "30-second checks",
        "Multi-channel alerts",
        "Custom status pages",
        "1-year data retention",
        "API access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For large organizations",
      features: [
        "Unlimited monitors",
        "10-second checks",
        "Priority support",
        "White-label status pages",
        "Unlimited data retention",
        "Advanced integrations"
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, TechStart",
      content: "This monitoring service has been crucial for our uptime. The alerts are instant and the dashboard is incredibly intuitive.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "DevOps Engineer, ScaleUp",
      content: "Finally, a monitoring solution that doesn't break the bank but delivers enterprise-level features. Highly recommended!",
      rating: 5
    },
    {
      name: "Emily Johnson",
      role: "Founder, WebStudio",
      content: "The status pages are beautiful and keep our clients informed. The global monitoring gives us confidence in our service.",
      rating: 5
    }
  ];

  return (<>
    {localStorage.getItem("token") && router.push("/dashboard")}
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-white">UpMonitor</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-blue-400 transition-colors">Features</a>
              <button onClick={()=>{router.push('/signup')}} className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25">
                Start Free Trial
              </button>
              <button onClick={()=>{router.push('/signin')}} className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25">
                SignIn
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800/95 backdrop-blur-sm border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-300 hover:text-blue-400 transition-colors">Features</a>
              <a href="#pricing" className="block px-3 py-2 text-gray-300 hover:text-blue-400 transition-colors">Pricing</a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-300 hover:text-blue-400 transition-colors">Reviews</a>
              <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-blue-400 transition-colors">Contact</a>
              <button className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/25">
                Start Free Trial
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Never Miss a
              <span className="text-blue-400"> Downtime</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Monitor your websites, APIs, and servers with real-time alerts and beautiful status pages. 
              Get 99.9% uptime visibility with our global monitoring network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-500 transition-all duration-200 hover:scale-105 shadow-lg shadow-blue-600/25">
                Start 14-Day Free Trial
              </button>
              <button className="border border-gray-600 text-gray-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 hover:border-gray-500 transition-colors">
                View Demo
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-4">No credit card required • Setup in 2 minutes</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">99.9%</div>
              <div className="text-gray-400">Uptime SLA</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">15+</div>
              <div className="text-gray-400">Global Locations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">30s</div>
              <div className="text-gray-400">Check Frequency</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">10k+</div>
              <div className="text-gray-400">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need for Complete Monitoring
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our comprehensive monitoring suite ensures your digital infrastructure stays healthy and performant.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <feature.icon className="h-8 w-8 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white ml-3">{feature.title}</h3>
                </div>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose the perfect plan for your monitoring needs. All plans include our core features.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`relative bg-gray-900 rounded-xl border-2 p-8 ${
                plan.popular 
                  ? 'border-blue-500 shadow-lg shadow-blue-500/20 scale-105' 
                  : 'border-gray-700 hover:border-gray-600'
              } transition-all duration-200`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                  <p className="text-gray-400">{plan.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-400 mr-3" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  plan.popular 
                    ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/25' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}>
                  Start Free Trial
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trusted by Thousands of Developers
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See what our customers have to say about their monitoring experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800 p-8 rounded-xl border border-gray-700">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Never Miss Another Downtime?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who trust our monitoring service to keep their applications running smoothly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              Start Free Trial
              <ArrowRight className="inline ml-2 h-5 w-5" />
            </button>
            <button className="border border-blue-300 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center mb-4">
                <Activity className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">UpMonitor</span>
              </div>
              <p className="text-gray-400 mb-4">
                The most reliable website monitoring service with instant alerts and beautiful status pages.
              </p>
              <div className="flex space-x-4">
                <Clock className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                <Globe className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                <Shield className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">API</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 UpMonitor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  </>);
}

export default App;