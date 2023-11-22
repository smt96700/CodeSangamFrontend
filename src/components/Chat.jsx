import { TabPanel, TabPanels, VStack, Text } from "@chakra-ui/react"
import { useContext, useEffect, useRef } from "react";
import { FriendContext, MessageContext } from "./Friends";
import ChatBox from "./ChatBox";

const Chat= ({userid})=>{
    console.log("insideChat", userid);
    const {friendList, setFriendList}= useContext(FriendContext);
    const {messages}= useContext(MessageContext);
    const bottomDiv= useRef(null);
    useEffect(()=>{
        bottomDiv.current?.scrollIntoView();
    })
    return friendList.length >0 ? (
        <VStack h="100%" justify= "end">
            <TabPanels overflowY="scroll">
              {friendList.map(friend => (
                 <VStack
                 flexDir= "column-reverse"
                 as= {TabPanel}
                 key= {`chat: ${friend.username}`}
                 w="100%"
                 >
                    <div ref= {bottomDiv}/>
                    {messages.filter(
                        msg => msg.to === friend.userid || msg.from === friend.userid
                    )
                    .map((message, idx) => (
                        <Text 
                         m= {
                            message.to === friend.userid
                            ? "1rem 0 0 auto !important"
                            : "1rem auto 0 0 !important"
                         }
                        key = {`msg: ${friend.username}.${idx}`} fontSize="lg"
                          bg= {message.to === friend.userid ? "blue.200" : "green.200"}
                          color= "gray.800"
                          borderRadius= "gray.800"
                          p= "0.5rem 1rem"
                          maxW= "50%"
                        >
                            {message.content}
                        </Text>
                    ))}
                 </VStack>
              ))}   
            
            </TabPanels>
            <ChatBox userid= {userid}/>
        </VStack>
    ):
    ( 
    <VStack justify= "center"  pt= "5rem" w="100%" textAlign="center" fontSize="large">
        <TabPanels>
            <Text>No Friends :( Click to add Friends</Text>
        </TabPanels>
       
    </VStack>
   
    );
}
export default Chat;