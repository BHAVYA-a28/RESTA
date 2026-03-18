"use client";
import React from 'react';
import { Mail, Phone, ExternalLink, Code2, Globe, Palette, Layout, Utensils } from 'lucide-react';

const FreelancerShowcase = () => {
  return (
    <section className="bg-section-bg py-20 px-4 sm:px-6 lg:px-8 border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm h-px bg-primary w-12 inline-block mx-2 mb-2"></span>
          <h2 className="text-3xl md:text-4xl font-bold font-headings text-gray-900 mt-2 tracking-tight">Website Created By</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto italic font-body">"I build simple and effective websites for small businesses to help them grow online."</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Info Card */}
          <div className="bg-white p-10 rounded-3xl shadow-xl shadow-orange-50/50 border border-orange-50">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-20 w-20 bg-primary/10 flex items-center justify-center rounded-2xl">
                <Code2 className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-headings text-gray-900 leading-none">Bhavya Jain</h3>
                <p className="text-primary font-semibold text-sm mt-2">Full Stack Web Developer</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center space-x-2">
                  <span className="h-1 w-1 bg-primary rounded-full"></span>
                  <span>Skills</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['React.js', 'Next.js', 'Node.js', 'MongoDB', 'Express.js', 'Tailwind CSS'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-secondary text-primary font-semibold text-xs rounded-full uppercase tracking-wider">{skill}</span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-4 flex items-center space-x-2">
                   <span className="h-1 w-1 bg-primary rounded-full"></span>
                   <span>Services Offered</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: Globe, label: 'Business Websites' },
                    { icon: Utensils, label: 'Restaurant Websites' },
                    { icon: Palette, label: 'Portfolio Websites' },
                    { icon: Layout, label: 'Website Redign' }
                  ].map((service) => (
                    <div key={service.label} className="flex items-center space-x-3 text-gray-600">
                      <service.icon size={18} className="text-primary/70" />
                      <span className="text-sm font-medium">{service.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a href="mailto:bhavya.jain2804@gmail.com" className="flex items-center justify-center space-x-2 bg-primary text-white px-8 py-3 rounded-xl hover:bg-orange-600 hover:scale-105 transition-all font-bold shadow-lg shadow-orange-200">
                <Mail size={20} />
                <span>Hire Me</span>
              </a>
              <a href="https://wa.me/919602398321" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 border-2 border-primary text-primary px-8 py-3 rounded-xl font-bold hover:bg-primary/5 transition-all">
                <Phone size={20} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Social and Highlight */}
          <div className="space-y-8 lg:pl-8">
            <h3 className="text-4xl font-bold font-headings text-gray-900 leading-tight">Ready to take your business online?</h3>
            <p className="text-gray-600 leading-loose text-lg font-body">
              I specialize in creating custom digital experiences that aren't just beautiful—they also drive results. Whether you're a local restaurant looking for a website that attracts hungry customers, or a business seeking to refresh its brand identity, I'm here to help you succeed.
            </p>
            
            <div className="flex items-center space-x-4 p-4 bg-accent/10 border-l-4 border-accent rounded-r-lg">
              <div className="bg-accent/20 p-2 rounded-full">
                <div className="h-3 w-3 bg-accent animate-pulse rounded-full"></div>
              </div>
              <span className="text-accent font-bold uppercase tracking-widest text-xs">Available for freelance work</span>
            </div>

            <div className="flex items-center space-x-6 text-gray-400">
               <a href="https://www.linkedin.com/in/bhavya-jain-553975250/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center space-x-2 font-semibold"><span>LinkedIn</span> <ExternalLink size={14} /></a>
               <span className="text-gray-200">|</span>
               <a href="https://robo-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center space-x-2 font-semibold"><span>Portfolio</span> <ExternalLink size={14} /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreelancerShowcase;
