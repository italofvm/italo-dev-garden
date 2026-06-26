/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBg: '#0A0A0C',
        darkCard: '#121215',
        darkBorder: '#1F1F23',
        lightBg: '#FAF9F6',
        lightCard: '#FFFFFF',
        lightBorder: '#E5E5E0',
        accent: '#6366F1',
        accentHover: '#4F46E5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            // Spacing melhorado
            'p': {
              marginTop: '1rem',
              marginBottom: '1rem',
              lineHeight: '1.6',
            },
            // Headings com separator estilo GitHub
            'h1': {
              fontSize: '2rem',
              fontWeight: '600',
              marginTop: '2rem',
              marginBottom: '1rem',
              paddingBottom: '0.5rem',
              borderBottomWidth: '1px',
              borderBottomColor: theme('colors.darkBorder'),
            },
            'h2': {
              fontSize: '1.5rem',
              fontWeight: '600',
              marginTop: '1.5rem',
              marginBottom: '1rem',
              paddingBottom: '0.3rem',
              borderBottomWidth: '1px',
              borderBottomColor: theme('colors.darkBorder'),
            },
            'h3': {
              fontSize: '1.25rem',
              fontWeight: '600',
              marginTop: '1.25rem',
              marginBottom: '0.75rem',
            },
            'h4': {
              fontSize: '1rem',
              fontWeight: '600',
              marginTop: '1rem',
              marginBottom: '0.5rem',
            },
            // Listas com espaçamento
            'ul, ol': {
              marginTop: '1rem',
              marginBottom: '1rem',
              paddingLeft: '2rem',
            },
            'li': {
              marginTop: '0.25rem',
              marginBottom: '0.25rem',
              lineHeight: '1.5',
            },
            // Blockquotes estilo GitHub
            'blockquote': {
              marginTop: '1rem',
              marginBottom: '1rem',
              paddingLeft: '1rem',
              borderLeftWidth: '4px',
              borderLeftColor: theme('colors.accent'),
              fontStyle: 'italic',
              color: theme('colors.neutral.400'),
            },
            // CODE BLOCKS - estilo GitHub
            'pre': {
              backgroundColor: '#0d1117',
              color: '#c9d1d9',
              borderRadius: '0.5rem',
              padding: '1rem',
              marginTop: '1rem',
              marginBottom: '1rem',
              border: `1px solid ${theme('colors.darkBorder')}`,
              overflow: 'auto',
              lineHeight: '1.45',
              // CRUCIAL: quebra de linha!
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              wordBreak: 'break-all',
            },
            'code': {
              fontFamily: theme('fontFamily.mono').join(', '),
              fontSize: '0.85em',
              fontWeight: '500',
            },
            // Code inline (sem highlight)
            'code:not(pre code)': {
              backgroundColor: '#161b22',
              color: '#79c0ff',
              padding: '0.25em 0.5em',
              borderRadius: '0.375rem',
              fontSize: '0.85em',
              border: `1px solid ${theme('colors.darkBorder')}`,
              fontWeight: '500',
            },
            // Links com acento
            'a': {
              color: theme('colors.accent'),
              textDecoration: 'none',
              borderBottomWidth: '1px',
              borderBottomColor: 'transparent',
              transition: 'all 0.2s',
              '&:hover': {
                textDecoration: 'underline',
                color: theme('colors.accentHover'),
              },
            },
            // Imagens responsivas
            'img': {
              borderRadius: '0.5rem',
              maxWidth: '100%',
              height: 'auto',
              marginTop: '1rem',
              marginBottom: '1rem',
              border: `1px solid ${theme('colors.darkBorder')}`,
            },
            // Table styling
            'table': {
              marginTop: '1rem',
              marginBottom: '1rem',
              borderCollapse: 'collapse',
              width: '100%',
            },
            'th, td': {
              padding: '0.75rem',
              borderBottomWidth: '1px',
              borderBottomColor: theme('colors.darkBorder'),
              textAlign: 'left',
            },
            'thead': {
              backgroundColor: '#161b22',
              fontWeight: '600',
            },
            'tbody tr:nth-child(even)': {
              backgroundColor: '#0d1117',
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': '#c9d1d9',
            '--tw-prose-headings': '#ffffff',
            '--tw-prose-links': theme('colors.accent'),
            '--tw-prose-bold': '#ffffff',
            '--tw-prose-code': '#79c0ff',
            '--tw-prose-pre-bg': '#0d1117',
            '--tw-prose-pre-code': '#c9d1d9',
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
