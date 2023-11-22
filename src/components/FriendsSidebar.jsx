import {Button} from '@chakra-ui/button';
import { HStack, VStack, Heading, Divider } from '@chakra-ui/layout';
import {ChatIcon} from '@chakra-ui/icons'
import { Tab, TabList, Circle, Text, useDisclosure } from '@chakra-ui/react';
import { useContext } from 'react';
import { FriendContext } from './Friends';
import AddFriendModal from './AddFriendModal';

const FriendsSidebar= ()=>{
    const {friendList}= useContext(FriendContext)
    const {isOpen, onClose, onOpen}= useDisclosure();
    return (
        <>
        <VStack py='1.4rem'>
            <HStack justify= 'space-evenly' w='100%'>
                <Heading size='md'>Add Friend</Heading>
                <Button onClick={onOpen}>
                    <ChatIcon />
                </Button>
            </HStack>
             <Divider />
             <VStack as={TabList}>
                {/* <HStack as={Tab}>
                    <Circle bg='red.500' w='20px' h='20px' />
                    <Text>John Smith</Text>
                </HStack>
                <HStack as={Tab}>
                    <Circle bg='green.500' w='20px' h='20px' />
                    <Text>Daniel Brown</Text>
                </HStack> */}
                {friendList.map((friend)=>{
                    return(
                    <HStack as={Tab} key={`friend: ${friend.userid}`}>
                        <Circle bg={friend.connected ? 'green.500' : 'red.500'} w='20px' h='20px' />
                        <Text>{friend.username}</Text>
                    </HStack>
                    );
                })}
             </VStack>
        </VStack>
        {/* sibling of sidebar */}
        <AddFriendModal isOpen={isOpen} onClose={onClose}/>
        </>
    );
}

export default FriendsSidebar;