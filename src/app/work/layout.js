export const metadata = {
  title: 'My Work',
  icons: {
    icon: '/logo2.png', // This sets the favicon for this route
  },
}

export default function WorkLayout({ children }) {
  return (
    <section>
      {children}
    </section>
  );
}