
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			typography: (theme) => ({
				pinkish: {
					css: {
						'--tw-prose-body': theme('colors.pink.700'),
						'--tw-prose-headings': theme('colors.rose.500'),
						'--tw-prose-lead': theme('colors.pink.600'),
						'--tw-prose-links': theme('colors.rose.500'),
						'--tw-prose-bold': theme('colors.rose.600'),
						'--tw-prose-counters': theme('colors.pink.500'),
						'--tw-prose-bullets': theme('colors.pink.300'),
						'--tw-prose-hr': theme('colors.pink.200'),
						'--tw-prose-quotes': theme('colors.pink.500'),
						'--tw-prose-quote-borders': theme('colors.pink.300'),
						'--tw-prose-captions': theme('colors.pink.400'),
						'--tw-prose-code': theme('colors.pink.600'),
						'--tw-prose-pre-code': theme('colors.rose.100'),
						'--tw-prose-pre-bg': theme('colors.pink.50'),
						'--tw-prose-th-borders': theme('colors.pink.300'),
						'--tw-prose-td-borders': theme('colors.pink.100'),
					},
				},
			}),
			fontFamily: {
				'playfair': ['Playfair Display', 'serif'],
				'inter': ['Inter', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Herstyle color palette
				blush: {
					50: '#fef7f7',
					100: '#fdeef0',
					200: '#fad5da',
					300: '#f7b3be',
					400: '#f28ba1',
					500: '#ea6485',
					600: '#d4416a',
					700: '#b1325b',
					800: '#942c52',
					900: '#7e2a4c',
				},
				cream: {
					50: '#fefdfb',
					100: '#fefbf6',
					200: '#fcf5e9',
					300: '#f9ecdb',
					400: '#f4ddca',
					500: '#edc9b7',
					600: '#d9a98a',
					700: '#c38b6d',
					800: '#a16b4a',
					900: '#7a4f35',
				},
				sage: {
					50: '#f6f7f6',
					100: '#e4e7e4',
					200: '#c8cfc8',
					300: '#a5b3a5',
					400: '#7e9580',
					500: '#5e7961',
					600: '#4a604d',
					700: '#3e4f40',
					800: '#344035',
					900: '#2d372e',
				},
				dustyrose: {
					50: '#fdf2f3',
					100: '#fce7e8',
					200: '#f9d4d7',
					300: '#f4b4b8',
					400: '#ec8891',
					500: '#e0606b',
					600: '#cd4147',
					700: '#ab3238',
					800: '#8f2d32',
					900: '#792a2f',
				},
				gold: {
					50: '#fefbeb',
					100: '#fef3c7',
					200: '#fde68a',
					300: '#fcd34d',
					400: '#fbbf24',
					500: '#f59e0b',
					600: '#d97706',
					700: '#b45309',
					800: '#92400e',
					900: '#78350f',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'2xl': '1rem',
				'3xl': '1.5rem',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'gentle-bounce': {
					'0%, 100%': {
						transform: 'translateY(-2px)'
					},
					'50%': {
						transform: 'translateY(0)'
					}
				},
				'slide-in-right': {
					'0%': {
						opacity: '0',
						transform: 'translateX(50px) scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0) scale(1)'
					}
				},
				'slide-in-left': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-50px) scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0) scale(1)'
					}
				},
				'fade-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'text-reveal': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px) rotateX(90deg)'
					},
					'50%': {
						opacity: '0.5',
						transform: 'translateY(10px) rotateX(45deg)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0) rotateX(0deg)'
					}
				},
				'gradient-shift': {
					'0%': {
						backgroundPosition: '0% 50%'
					},
					'50%': {
						backgroundPosition: '100% 50%'
					},
					'100%': {
						backgroundPosition: '0% 50%'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-up': 'slide-up 0.4s ease-out',
				'gentle-bounce': 'gentle-bounce 2s infinite',
				'slide-in-right': 'slide-in-right 1.2s ease-out 0.3s forwards',
				'slide-in-left': 'slide-in-left 1s ease-out forwards',
				'fade-up': 'fade-up 1s ease-out 0.6s forwards',
				'text-reveal': 'text-reveal 1s ease-out forwards',
				'gradient-shift': 'gradient-shift 3s ease infinite'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			}
		}
	},
	plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
} satisfies Config;
