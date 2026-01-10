
import { Button, Container, Flex } from '@mantine/core';
import { NotFoundBackground } from './components/NotFoundBackground';
import classes from './styles/NotFound.module.css';

export default function NotFound() {
  return (
    <Container className="py-20">
      <div className="relative">
        <NotFoundBackground className={`${classes.image} absolute opacity-75`}/>
        <div className="relative pt-30 sm:pt-55">
          <h1 className="text-3xl sm:text-5xl text-center font-bold">Nothing to see here</h1>
          <p className="max-w-xl m-auto mt-6 mb-9 text-lg text-[#828282] text-center">
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </p>
          <Flex justify="center">
            <Button
              component="a"
              href="/"
              size="md"
            >Take me back to home page</Button>
          </Flex>
        </div>
      </div>
    </Container>
  )
}
