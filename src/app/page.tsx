import SecretCard from '../components/secret';

export default function Home() {
  const secrets = [
    {
      content: 'This is the first secret.',
      author: 'Author 1',
    },
    {
      content: 'This is the second secret.',
      author: 'Author 2',
    },
    {
      content: 'This is the third secret.',
      author: 'Author 3',
    },
    {
      content: 'This is the fourth secret.',
      author: 'Author 4',
    },
    // Add more secrets here
  ];

  return (
    <main className='flex min-h-screen flex-col justify-between font-[family-name:var(--font-geist-sans)]'>
      <div className='flex flex-wrap justify-center'>
        {secrets.map((secret, index) => (
          <SecretCard
            key={index}
            content={secret.content}
            author={secret.author}
          />
        ))}
      </div>
    </main>
  );
}
