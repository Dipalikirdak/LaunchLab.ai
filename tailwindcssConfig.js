tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            heading: ['Space Grotesk', 'sans-serif'],
          },
          animation: {
            'fade-in': 'fadeIn 0.3s ease-in forwards',
            'slide-in': 'slideIn 0.4s ease-out forwards',
            'slide-down': 'slideDown 0.4s ease-out forwards',
          },
          keyframes: {
            fadeIn: {
              '0%': { opacity: 0, transform: 'translateY(10px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
            slideIn: {
              '0%': { opacity: 0, transform: 'translateX(20px)' },
              '100%': { opacity: 1, transform: 'translateX(0)' },
            },
            slideDown: {
              '0%': { opacity: 0, transform: 'translateY(-10px)', maxHeight: '0' },
              '100%': { opacity: 1, transform: 'translateY(0)', maxHeight: '500px' },
            }
          }
        }
      }
    }