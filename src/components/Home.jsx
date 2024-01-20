import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react';
import img1 from '../assets/btc.png';
import {motion} from 'framer-motion';

const Home = () => {
  return (
    <Box bgColor={'blackAlpha.900'} h={'80vh'} w={'full'}>
<motion.div
style={{height:'80vh',}}
animate={{translateY:"20px"}}
transition={{
  duration:'1',
  repeat:"infinity",
  repeatType:'reverse'

}}>

    <Image w={'full'} height={'full'} objectFit={'contain'} src={img1} 
    filter={'grayscale(1)'}/>

    </motion.div>

    <Text fontSize={'6xl'} textAlign={'center'} fontWeight={'thin'} color={'whiteAlpha.700'}
    mt={['-20','-10']}>
XCrypto
    </Text>

    </Box>
  )
}

export default Home