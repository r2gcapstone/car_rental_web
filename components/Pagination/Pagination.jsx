import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/react';

const buttonStyle = {
  background: 'white',
  padding: '0.5rem',
  border: '1px solid black',
  cursor: 'pointer',
};

const Pagination = ({
  jumpPerPage,
  previousPage,
  nextPage,
  numbers,
  totalPage,
  currentPage,
}) => (
  <>
    <Flex alignItems='center' mt='1rem'>
      <Box style={{ ...buttonStyle }} onClick={previousPage}>
        Previous
      </Box>
      {numbers.map((el) => {
        const isEqualCurrentPage = el === currentPage;

        return (
          <Box
            key={el}
            onClick={() => jumpPerPage(el)}
            background={isEqualCurrentPage ? 'blue.dark' : 'white'}
            color={isEqualCurrentPage ? 'white' : 'black'}
            padding='0.5rem'
            paddingX='1rem'
            border={`1px solid ${isEqualCurrentPage ? 'blue.dark' : 'black'}`}
            cursor='pointer'
            _hover={{
              background: '#27374D',
              color: '#fff',
            }}
          >
            {el}
          </Box>
        );
      })}
      <Box style={{ ...buttonStyle }} onClick={nextPage}>
        Next
      </Box>
    </Flex>
    <Text mt='1rem'>
      Page {currentPage} of {totalPage}
    </Text>
  </>
);

export default Pagination;
