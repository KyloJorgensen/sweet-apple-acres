const Footer: React.FC = () => {
  return (
    <footer className="w-full mx-auto flex flex-row justify-between bg-red-700 px-8 py-12 mt-20 text-white">
      <div className="container mx-auto flex flex-row  flex-wrap justify-between">
      <a
        href="https://github.com/KyloJorgensen"
        target="_blank"
        rel="noopener noreferrer"
      >
        Built by Kylo Jorgensen
      </a>
      <a
        href="https://github.com/KyloJorgensen/sweet-apple-acres"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub Repository
      </a>
      </div>
    </footer>
  );
};

export default Footer;
