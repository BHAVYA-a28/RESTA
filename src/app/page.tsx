import Hero from '@/components/Hero';
import FreelancerShowcase from '@/components/FreelancerShowcase';
import { ChefHat, Heart, Coffee, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      {/* Short Intro Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-50/50 rounded-full -ml-32 -mt-32 -z-10 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative space-y-6">
               <div className="h-12 w-12 bg-primary/10 flex items-center justify-center rounded-2xl mb-8">
                  <ChefHat className="h-6 w-6 text-primary" />
               </div>
               <h2 className="text-4xl md:text-5xl font-bold font-headings text-gray-900 leading-tight tracking-tight">Crafting Memories <br className="hidden md:block" />Through Gastronomy</h2>
               <p className="text-lg text-gray-600 font-body leading-relaxed italic border-l-4 border-primary pl-8 py-2 bg-orange-50/10 rounded-r-2xl">
                 "Our passion for food goes beyond the kitchen. We believe that every meal is an opportunity to create a lasting memory. At Tasty Bites, we blend tradition with innovation to bring you flavors you'll never forget."
               </p>
               <div className="pt-6">
                 <Link href="/contact" className="text-primary font-bold inline-flex items-center space-x-2 border-b-2 border-primary/20 pb-2 hover:border-primary transition-all">
                   <span>Learn more about our story</span>
                   <ArrowRight size={18} />
                 </Link>
               </div>
            </div>

            <div className="lg:w-1/2 grid grid-cols-2 gap-6 relative">
               <div className="space-y-6">
                  <div className="bg-white p-8 rounded-[40px] shadow-2xl shadow-gray-200/50 hover:translate-y-[-10px] transition-transform border border-gray-50 flex flex-col items-center">
                    <Heart className="h-12 w-12 text-pink-500 mb-6 drop-shadow-sm" fill="currentColor" fillOpacity={0.2} />
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Passion</h4>
                    <p className="text-sm text-gray-500 text-center font-medium">Every dish is infused with our love for cooking.</p>
                  </div>
                  <div className="bg-white p-8 rounded-[40px] shadow-2xl shadow-gray-200/50 translate-x-10 hover:translate-y-[-10px] transition-transform border border-gray-50 flex flex-col items-center">
                    <Coffee className="h-12 w-12 text-amber-600 mb-6 drop-shadow-sm" />
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Warmth</h4>
                    <p className="text-sm text-gray-500 text-center font-medium">Enjoy our cozy ambiance and friendly service.</p>
                  </div>
               </div>
               <div className="pt-12">
                  <div className="bg-primary/5 p-12 rounded-[60px] border border-primary/10 h-full flex flex-col items-center justify-center">
                     <span className="text-8xl font-bold font-headings text-primary/15 absolute -z-10">B</span>
                     <p className="text-4xl font-bold font-headings text-gray-900 text-center uppercase tracking-widest leading-none mb-4">Unique Flavor</p>
                     <p className="text-sm text-gray-600 text-center uppercase tracking-[0.2em] font-bold mt-2">Tasty Bites Experience</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories / Stats */}
      <section className="py-20 bg-section-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: 'Fresh Ingredients', sub: 'Farm-to-table promise', val: '100%' },
                { label: 'Happy Customers', sub: 'Across the city', val: '15k+' },
                { label: 'Secret Recipes', sub: 'Handcrafted by chefs', val: '120+' },
                { label: 'Years Experience', sub: 'In the culinary arts', val: '12+' },
              ].map((item, idx) => (
                <div key={idx} className="text-center group p-10 bg-white rounded-[40px] border border-gray-100 hover:border-primary/20 transition-all hover:shadow-2xl hover:shadow-orange-100 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[80px] -z-10 group-hover:scale-110 transition-transform"></div>
                   <h3 className="text-4xl font-bold font-headings text-gray-900 mb-2">{item.val}</h3>
                   <p className="text-primary font-bold uppercase tracking-wider text-xs mb-3">{item.label}</p>
                   <p className="text-sm text-gray-400 font-medium">{item.sub}</p>
                </div>
              ))}
           </div>
        </div>
      </section>


      <FreelancerShowcase />
    </div>
  );
}
