document.addEventListener('DOMContentLoaded', function() {
      // Theme toggle functionality
      const themeToggle = document.getElementById('themeToggle');
      const sunIcon = document.getElementById('sunIcon');
      const moonIcon = document.getElementById('moonIcon');
      const body = document.body;
      
      // Check for saved theme or prefer dark mode
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
      } else {
        document.documentElement.classList.remove('dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
      }
      
      themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        
        if (document.documentElement.classList.contains('dark')) {
          sunIcon.classList.remove('hidden');
          moonIcon.classList.add('hidden');
          localStorage.setItem('theme', 'dark');
        } else {
          sunIcon.classList.add('hidden');
          moonIcon.classList.remove('hidden');
          localStorage.setItem('theme', 'light');
        }
        
        // Add animation to the button
        themeToggle.classList.add('animate-rotate');
        setTimeout(() => {
          themeToggle.classList.remove('animate-rotate');
        }, 600);
      });
      
      // Section toggle functionality
      const sectionButtons = document.querySelectorAll('.section-btn');
      const previewContainer = document.getElementById('previewContainer');
      const emptyPreview = document.getElementById('emptyPreview');
      
      // Section templates
      const sectionTemplates = {
        hero: `
          <div class="preview-section glass rounded-xl p-6 mb-6 animate-fade-in">
            <div class="max-w-2xl mx-auto text-center">
              <span class="bg-purple-500/10 text-purple-600 dark:text-purple-400 px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">✨ New Launch</span>
              <h1 class="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Transform Your Ideas Into Reality</h1>
              <p class="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">An all-in-one solution for startups to validate ideas, acquire customers, and scale efficiently.</p>
              <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <button class="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-6 sm:py-3 sm:px-8 rounded-lg transition">Get Started</button>
                <button class="glass font-medium py-2.5 px-6 sm:py-3 sm:px-8 rounded-lg transition">View Demo</button>
              </div>
            </div>
          </div>
        `,
        features: `
          <div class="preview-section glass rounded-xl p-6 mb-6 animate-fade-in">
            <div class="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <h2 class="font-heading text-2xl sm:text-3xl font-bold mb-3">Powerful Features</h2>
              <p class="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Everything you need to launch and grow your startup</p>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div class="glass rounded-xl p-4 sm:p-5">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3 sm:mb-4">
                  <span class="text-lg sm:text-xl">🚀</span>
                </div>
                <h3 class="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Fast Integration</h3>
                <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Get up and running in minutes with our simple API.</p>
              </div>
              <div class="glass rounded-xl p-4 sm:p-5">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3 sm:mb-4">
                  <span class="text-lg sm:text-xl">📊</span>
                </div>
                <h3 class="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Analytics Dashboard</h3>
                <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Track metrics that matter with beautiful visualizations.</p>
              </div>
              <div class="glass rounded-xl p-4 sm:p-5">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-teal-500/10 flex items-center justify-center mb-3 sm:mb-4">
                  <span class="text-lg sm:text-xl">🔒</span>
                </div>
                <h3 class="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Secure by Default</h3>
                <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Enterprise-grade security for your peace of mind.</p>
              </div>
            </div>
          </div>
        `,
        testimonials: `
          <div class="preview-section glass rounded-xl p-6 mb-6 animate-fade-in">
            <div class="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <h2 class="font-heading text-2xl sm:text-3xl font-bold mb-3">Trusted by Innovators</h2>
              <p class="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Join thousands of satisfied customers</p>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div class="glass rounded-xl p-4 sm:p-6">
                <div class="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                    <span class="font-medium text-sm sm:text-base">JD</span>
                  </div>
                  <div>
                    <h4 class="font-semibold text-base sm:text-lg">Jane Doe</h4>
                    <p class="text-xs sm:text-sm text-gray-500">CTO, TechStart Inc.</p>
                  </div>
                </div>
                <p class="text-gray-600 dark:text-gray-300 text-sm sm:text-base">This platform has transformed how we approach product launches. We've seen a 40% increase in conversion rates since implementing their solution.</p>
              </div>
              <div class="glass rounded-xl p-4 sm:p-6">
                <div class="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                    <span class="font-medium text-sm sm:text-base">JS</span>
                  </div>
                  <div>
                    <h4 class="font-semibold text-base sm:text-lg">John Smith</h4>
                    <p class="text-xs sm:text-sm text-gray-500">Founder, StartupHub</p>
                  </div>
                </div>
                <p class="text-gray-600 dark:text-gray-300 text-sm sm:text-base">The analytics and customer insights we've gained have been invaluable. It's like having an entire growth team in one tool.</p>
              </div>
            </div>
          </div>
        `,
        pricing: `
          <div class="preview-section glass rounded-xl p-6 mb-6 animate-fade-in">
            <div class="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <h2 class="font-heading text-2xl sm:text-3xl font-bold mb-3">Simple, Transparent Pricing</h2>
              <p class="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Choose the plan that works for you</p>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div class="glass rounded-xl p-4 sm:p-6">
                <h3 class="font-semibold text-lg sm:text-xl mb-1">Starter</h3>
                <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-5">Perfect for small projects</p>
                <div class="mb-3 sm:mb-5">
                  <span class="text-2xl sm:text-3xl font-bold">$19</span>
                  <span class="text-gray-600 dark:text-gray-400">/month</span>
                </div>
                <ul class="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <li class="flex items-center gap-2 text-xs sm:text-sm">
                    <svg class="w-3 h-3 sm:w-4 sm:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span>Up to 1,000 visitors</span>
                  </li>
                  <li class="flex items-center gap-2 text-xs sm:text-sm">
                    <svg class="w-3 h-3 sm:w-4 sm:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span>Basic analytics</span>
                  </li>
                  <li class="flex items-center gap-2 text-xs sm:text-sm">
                    <svg class="w-3 h-3 sm:w-4 sm:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span>Email support</span>
                  </li>
                </ul>
                <button class="glass w-full py-2 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base">Get Started</button>
              </div>
              
              <div class="glass border-2 border-purple-500/30 rounded-xl p-4 sm:p-6 relative">
                <div class="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold py-1 px-2 rounded-bl-lg rounded-tr-lg">POPULAR</div>
                <h3 class="font-semibold text-lg sm:text-xl mb-1">Growth</h3>
                <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-5">For growing businesses</p>
                <div class="mb-3 sm:mb-5">
                  <span class="text-2xl sm:text-3xl font-bold">$49</span>
                  <span class="text-gray-600 dark:text-gray-400">/month</span>
                </div>
                <ul class="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <li class="flex items-center gap-2 text-xs sm:text-sm">
                    <svg class="w-3 h-3 sm:w-4 sm:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span>Up to 10,000 visitors</span>
                  </li>
                  <li class="flex items-center gap-2 text-xs sm:text-sm">
                    <svg class="w-3 h-3 sm:w-4 sm:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span>Advanced analytics</span>
                  </li>
                  <li class="flex items-center gap-2 text-xs sm:text-sm">
                    <svg class="w-3 h-3 sm:w-4 sm:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span>Priority support</span>
                  </li>
                  <li class="flex items-center gap-2 text-xs sm:text-sm">
                    <svg class="w-3 h-3 sm:w-4 sm:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span>A/B testing</span>
                  </li>
                </ul>
                <button class="bg-purple-600 hover:bg-purple-700 text-white w-full py-2 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base">Get Started</button>
              </div>
              
              <div class="glass rounded-xl p-4 sm:p-6">
                <h3 class="font-semibold text-lg sm:text-xl mb-1">Enterprise</h3>
                <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-5">For large organizations</p>
                <div class="mb-3 sm:mb-5">
                  <span class="text-2xl sm:text-3xl font-bold">$99</span>
                  <span class="text-gray-600 dark:text-gray-400">/month</span>
                </div>
                <ul class="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <li class="flex items-center gap-2 text-xs sm:text-sm">
                    <svg class="w-3 h-3 sm:w-4 sm:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span>Unlimited visitors</span>
                  </li>
                  <li class="flex items-center gap-2 text-xs sm:text-sm">
                    <svg class="w-3 h-3 sm:w-4 sm:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span>Custom analytics</span>
                  </li>
                  <li class="flex items-center gap-2 text-xs sm:text-sm">
                    <svg class="w-3 h-3 sm:w-4 sm:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span>24/7 dedicated support</span>
                  </li>
                  <li class="flex items-center gap-2 text-xs sm:text-sm">
                    <svg class="w-3 h-3 sm:w-4 sm:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span>Custom integrations</span>
                  </li>
                </ul>
                <button class="glass w-full py-2 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base">Contact Sales</button>
              </div>
            </div>
          </div>
        `,
        howItWorks: `
          <div class="preview-section glass rounded-xl p-6 mb-6 animate-fade-in">
            <div class="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <h2 class="font-heading text-2xl sm:text-3xl font-bold mb-3">How It Works</h2>
              <p class="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Simple steps to get started with our platform</p>
            </div>
            
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
              <div class="glass rounded-xl p-4 sm:p-5 text-center">
                <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span class="text-xl sm:text-2xl">1️⃣</span>
                </div>
                <h3 class="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Sign Up</h3>
                <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Create your account in seconds</p>
              </div>
              <div class="glass rounded-xl p-4 sm:p-5 text-center">
                <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span class="text-xl sm:text-2xl">2️⃣</span>
                </div>
                <h3 class="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Customize</h3>
                <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Set up your launch page</p>
              </div>
              <div class="glass rounded-xl p-4 sm:p-5 text-center">
                <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-teal-500/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span class="text-xl sm:text-2xl">3️⃣</span>
                </div>
                <h3 class="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Integrate</h3>
                <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Connect your tools</p>
              </div>
              <div class="glass rounded-xl p-4 sm:p-5 text-center">
                <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span class="text-xl sm:text-2xl">4️⃣</span>
                </div>
                <h3 class="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Launch</h3>
                <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Go live and grow</p>
              </div>
            </div>
          </div>
        `,
        demo: `
          <div class="preview-section glass rounded-xl p-6 mb-6 animate-fade-in">
            <div class="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
              <h2 class="font-heading text-2xl sm:text-3xl font-bold mb-3">Product Demo</h2>
              <p class="text-gray-600 dark:text-gray-400 text-sm sm:text-base">See our platform in action</p>
            </div>
            
            <div class="glass rounded-xl p-4 sm:p-6 aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <div class="text-center">
                <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg class="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <h3 class="font-semibold text-base sm:text-lg">Interactive Demo</h3>
                <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1">Click to play our product demo video</p>
              </div>
            </div>
          </div>
        `,
        faq: `
          <div class="preview-section glass rounded-xl p-6 mb-6 animate-fade-in">
            <div class="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <h2 class="font-heading text-2xl sm:text-3xl font-bold mb-3">Frequently Asked Questions</h2>
              <p class="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Find answers to common questions</p>
            </div>
            
            <div class="space-y-3 sm:space-y-4 max-w-3xl mx-auto">
              <div class="glass rounded-xl p-4 sm:p-5">
                <h3 class="font-semibold text-base sm:text-lg flex items-center gap-2 sm:gap-3">
                  <span class="text-purple-500">•</span> How long does setup take?
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mt-2 ml-5 text-xs sm:text-sm">Most customers are up and running in under 15 minutes. Our intuitive interface guides you through each step of the process.</p>
              </div>
              <div class="glass rounded-xl p-4 sm:p-5">
                <h3 class="font-semibold text-base sm:text-lg flex items-center gap-2 sm:gap-3">
                  <span class="text-purple-500">•</span> Do you offer custom plans?
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mt-2 ml-5 text-xs sm:text-sm">Yes, we offer custom enterprise plans for businesses with specific needs. Contact our sales team to discuss your requirements.</p>
              </div>
              <div class="glass rounded-xl p-4 sm:p-5">
                <h3 class="font-semibold text-base sm:text-lg flex items-center gap-2 sm:gap-3">
                  <span class="text-purple-500">•</span> Can I integrate with other tools?
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mt-2 ml-5 text-xs sm:text-sm">Absolutely. We offer native integrations with popular tools like Slack, Mailchimp, and Zapier, with more added every month.</p>
              </div>
            </div>
          </div>
        `,
        team: `
          <div class="preview-section glass rounded-xl p-6 mb-6 animate-fade-in">
            <div class="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <h2 class="font-heading text-2xl sm:text-3xl font-bold mb-3">Meet Our Team</h2>
              <p class="text-gray-600 dark:text-gray-400 text-sm sm:text-base">The passionate people behind our product</p>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div class="glass rounded-xl p-4 sm:p-5 text-center">
                <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-200 dark:bg-gray-800 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <span class="font-medium text-base sm:text-xl">AS</span>
                </div>
                <h3 class="font-semibold text-base sm:text-lg">Alex Smith</h3>
                <p class="text-purple-500 text-xs sm:text-sm">CEO & Founder</p>
                <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">10+ years in product development</p>
              </div>
              <div class="glass rounded-xl p-4 sm:p-5 text-center">
                <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-200 dark:bg-gray-800 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <span class="font-medium text-base sm:text-xl">MJ</span>
                </div>
                <h3 class="font-semibold text-base sm:text-lg">Maria Johnson</h3>
                <p class="text-purple-500 text-xs sm:text-sm">CTO</p>
                <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">Former engineering lead at TechCo</p>
              </div>
              <div class="glass rounded-xl p-4 sm:p-5 text-center">
                <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-200 dark:bg-gray-800 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <span class="font-medium text-base sm:text-xl">DP</span>
                </div>
                <h3 class="font-semibold text-base sm:text-lg">David Patel</h3>
                <p class="text-purple-500 text-xs sm:text-sm">Head of Growth</p>
                <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">Scaled 3 startups to acquisition</p>
              </div>
            </div>
          </div>
        `,
        metrics: `
          <div class="preview-section glass rounded-xl p-6 mb-6 animate-fade-in">
            <div class="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <h2 class="font-heading text-2xl sm:text-3xl font-bold mb-3">Impact Metrics</h2>
              <p class="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Results our customers have achieved</p>
            </div>
            
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
              <div class="glass rounded-xl p-3 sm:p-5">
                <div class="text-2xl sm:text-3xl font-bold text-purple-500">87%</div>
                <p class="text-xs sm:text-sm mt-1">Conversion Increase</p>
              </div>
              <div class="glass rounded-xl p-3 sm:p-5">
                <div class="text-2xl sm:text-3xl font-bold text-blue-500">3.2x</div>
                <p class="text-xs sm:text-sm mt-1">Faster Growth</p>
              </div>
              <div class="glass rounded-xl p-3 sm:p-5">
                <div class="text-2xl sm:text-3xl font-bold text-teal-500">42%</div>
                <p class="text-xs sm:text-sm mt-1">Cost Reduction</p>
              </div>
              <div class="glass rounded-xl p-3 sm:p-5">
                <div class="text-2xl sm:text-3xl font-bold text-pink-500">98%</div>
                <p class="text-xs sm:text-sm mt-1">Customer Satisfaction</p>
              </div>
            </div>
          </div>
        `,
        newsletter: `
          <div class="preview-section glass rounded-xl p-6 mb-6 animate-fade-in">
            <div class="glass rounded-xl p-4 sm:p-6 max-w-2xl mx-auto">
              <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
                <div class="flex-1">
                  <h2 class="font-heading text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Stay Updated</h2>
                  <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Subscribe to our newsletter for product updates and industry insights.</p>
                </div>
                <div class="flex-1 w-full">
                  <div class="flex flex-col sm:flex-row gap-2">
                    <input type="email" placeholder="Your email address" class="glass flex-1 py-2 px-3 sm:py-2.5 sm:px-4 rounded-lg border border-gray-200 dark:border-gray-800 text-xs sm:text-sm">
                    <button class="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 sm:py-2.5 sm:px-6 rounded-lg transition text-xs sm:text-sm">Subscribe</button>
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 sm:mt-2">We respect your privacy. Unsubscribe at any time.</p>
                </div>
              </div>
            </div>
          </div>
        `,
        integrations: `
          <div class="preview-section glass rounded-xl p-6 mb-6 animate-fade-in">
            <div class="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <h2 class="font-heading text-2xl sm:text-3xl font-bold mb-3">Seamless Integrations</h2>
              <p class="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Connect with your favorite tools</p>
            </div>
            
            <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4">
              <div class="glass rounded-xl p-2 sm:p-4 flex items-center justify-center">
                <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
              </div>
              <div class="glass rounded-xl p-2 sm:p-4 flex items-center justify-center">
                <div class="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900 rounded-lg"></div>
              </div>
              <div class="glass rounded-xl p-2 sm:p-4 flex items-center justify-center">
                <div class="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 dark:bg-green-900 rounded-lg"></div>
              </div>
              <div class="glass rounded-xl p-2 sm:p-4 flex items-center justify-center">
                <div class="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg"></div>
              </div>
              <div class="glass rounded-xl p-2 sm:p-4 flex items-center justify-center">
                <div class="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 dark:bg-red-900 rounded-lg"></div>
              </div>
              <div class="glass rounded-xl p-2 sm:p-4 flex items-center justify-center">
                <div class="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 dark:bg-purple-900 rounded-lg"></div>
              </div>
            </div>
          </div>
        `,
        language: `
          <div class="preview-section glass rounded-xl p-6 mb-6 animate-fade-in">
            <div class="text-center max-w-2xl mx-auto mb-4 sm:mb-6">
              <h2 class="font-heading text-2xl sm:text-3xl font-bold mb-3">Global Reach</h2>
              <p class="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Available in multiple languages</p>
            </div>
            
            <div class="glass rounded-xl p-3 sm:p-5 max-w-md mx-auto">
              <div class="flex flex-wrap gap-2 justify-center">
                <button class="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-purple-600 text-white text-xs sm:text-sm">English</button>
                <button class="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg glass text-xs sm:text-sm">Spanish</button>
                <button class="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg glass text-xs sm:text-sm">French</button>
                <button class="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg glass text-xs sm:text-sm">German</button>
                <button class="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg glass text-xs sm:text-sm">Japanese</button>
              </div>
            </div>
          </div>
        `,
        comparison: `
          <div class="preview-section glass rounded-xl p-6 mb-6 animate-fade-in">
            <div class="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <h2 class="font-heading text-2xl sm:text-3xl font-bold mb-3">Feature Comparison</h2>
              <p class="text-gray-600 dark:text-gray-400 text-sm sm:text-base">See how we stack up against the competition</p>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full glass rounded-xl text-xs sm:text-sm">
                <thead>
                  <tr class="border-b border-gray-200 dark:border-gray-800">
                    <th class="text-left p-2 sm:p-4">Feature</th>
                    <th class="p-2 sm:p-4">LaunchLab</th>
                    <th class="p-2 sm:p-4">Competitor A</th>
                    <th class="p-2 sm:p-4">Competitor B</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-800">
                    <td class="p-2 sm:p-4 font-medium">Real-time Analytics</td>
                    <td class="p-2 sm:p-4 text-center text-green-500">✓</td>
                    <td class="p-2 sm:p-4 text-center text-gray-400">-</td>
                    <td class="p-2 sm:p-4 text-center text-gray-400">-</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-800">
                    <td class="p-2 sm:p-4 font-medium">AI Optimization</td>
                    <td class="p-2 sm:p-4 text-center text-green-500">✓</td>
                    <td class="p-2 sm:p-4 text-center text-green-500">✓</td>
                    <td class="p-2 sm:p-4 text-center text-gray-400">-</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-800">
                    <td class="p-2 sm:p-4 font-medium">Multi-language</td>
                    <td class="p-2 sm:p-4 text-center text-green-500">✓</td>
                    <td class="p-2 sm:p-4 text-center text-gray-400">-</td>
                    <td class="p-2 sm:p-4 text-center text-green-500">✓</td>
                  </tr>
                  <tr>
                    <td class="p-2 sm:p-4 font-medium">Free Tier</td>
                    <td class="p-2 sm:p-4 text-center text-green-500">✓</td>
                    <td class="p-2 sm:p-4 text-center text-gray-400">-</td>
                    <td class="p-2 sm:p-4 text-center text-green-500">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        `
      };
      
      // Track active sections
      const activeSections = {
        hero: false,
        features: false,
        testimonials: false,
        pricing: false,
        howItWorks: false,
        demo: false,
        faq: false,
        team: false,
        metrics: false,
        newsletter: false,
        integrations: false,
        language: false,
        comparison: false
      };
      
      // Add event listeners to section buttons
      sectionButtons.forEach(button => {
        button.addEventListener('click', () => {
          const section = button.dataset.section;
          
          // Toggle active state
          activeSections[section] = !activeSections[section];
          button.classList.toggle('active', activeSections[section]);
          
          // Update preview
          updatePreview();
          
          // Hide empty message if any section is active
          if (Object.values(activeSections).some(val => val)) {
            emptyPreview.classList.add('hidden');
          } else {
            emptyPreview.classList.remove('hidden');
          }
        });
      });
      
      // Function to update the preview container
      function updatePreview() {
        previewContainer.innerHTML = '';
        
        // Add sections in predefined order
        const sectionOrder = [
          'hero', 'features', 'howItWorks', 'demo', 
          'metrics', 'testimonials', 'pricing', 'comparison',
          'team', 'integrations', 'faq', 'newsletter', 'language'
        ];
        
        sectionOrder.forEach(section => {
          if (activeSections[section]) {
            previewContainer.innerHTML += sectionTemplates[section];
          }
        });
        
        // If no sections are active, show empty message
        if (!Object.values(activeSections).some(val => val)) {
          previewContainer.appendChild(emptyPreview);
          emptyPreview.classList.remove('hidden');
        }
      }
      
      // Export functionality
      const exportBtn = document.getElementById('exportBtn');
      const exportModal = document.getElementById('exportModal');
      const closeModalBtn = document.getElementById('closeModalBtn');
      const exportOptions = document.querySelectorAll('.export-option');
      const codeContent = document.getElementById('codeContent');
      const copyCodeBtn = document.getElementById('copyCodeBtn');
      const copySuccess = document.getElementById('copySuccess');
      
      // Show export modal
      exportBtn.addEventListener('click', () => {
        if (previewContainer.contains(emptyPreview)) {
          alert('Please add at least one section to your launch page before exporting.');
          return;
        }
        
        exportModal.classList.add('show');
      });
      
      // Close export modal
      closeModalBtn.addEventListener('click', () => {
        exportModal.classList.remove('show');
      });
      
      // Close modal when clicking outside
      exportModal.addEventListener('click', (e) => {
        if (e.target === exportModal) {
          exportModal.classList.remove('show');
        }
      });
      
      // Export options selection
      exportOptions.forEach(option => {
        option.addEventListener('click', () => {
          // Remove active class from all options
          exportOptions.forEach(opt => opt.classList.remove('border-purple-500'));
          
          // Add active class to selected option
          option.classList.add('border-purple-500');
          
          const format = option.getAttribute('data-format');
          const previewHTML = previewContainer.innerHTML;
          
          // Generate code based on selected format
          let generatedCode = '';
          
          switch(format) {
            case 'html':
              generatedCode = previewHTML;
              break;
            case 'html-css':
              generatedCode = `<style>\n/* Add your custom CSS here */\n</style>\n\n${previewHTML}`;
              break;
            case 'react':
              generatedCode = `import React from 'react';\n\nconst LaunchPage = () => (\n  <>\n    ${previewHTML.replace(/\n/g, '\n    ')}\n  </>\n);\n\nexport default LaunchPage;`;
              break;
            case 'tailwind':
              generatedCode = previewHTML;
              break;
          }
          
          // Format the code with syntax highlighting
          codeContent.textContent = generatedCode;
        });
      });
      
      // Copy code to clipboard
      copyCodeBtn.addEventListener('click', () => {
        const textArea = document.createElement('textarea');
        textArea.value = codeContent.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Show success message
        copySuccess.classList.add('show');
        setTimeout(() => {
          copySuccess.classList.remove('show');
        }, 2000);
      });
  });