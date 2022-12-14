import Container from './container'

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-6 flex flex-col lg:flex-row justify-end items-center">
          <p>
            Jordan Nielson {'\u00A9'} {new Date().getFullYear()}
          </p>
          <a
            href="https://twitter.com/jnielson94"
            className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
          >
            Twitter
          </a>
          <a
            href={`https://github.com/jnielson94/jnielson.com`}
            className="mx-3 font-bold hover:underline"
          >
            View on GitHub
          </a>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
